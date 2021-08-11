import qs from "qs";
import * as auth from "context/auth-provider";
import { useAuth } from "context/auth-context";

// #process.env下自定义变量要以REACT_APP开头
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: Object;
  token?: string;
}

export const http = (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  //fetch 对于返回不是2XX的情况不会做错误处理，不同于axios
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    //token失效,登出、刷新页面
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    let data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

/**
Parameters
 * Obtain the parameters of a function type in a tuple
 * 在元组中获取构造函数类型的参数
 * 该类型可以获得函数的参数类型组成的元组类型。
 type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

 Omit
 * Construct a type with the properties of T except for those in type K.
 * 构造一个除类型K之外的T属性的类型
 type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

 Partial
 * Make all properties in T optional
 * 让T中的所有属性都是可选的
type Partial<T> = {
    [P in keyof T]?: T[P];
}

Required
 * Make all properties in T required
 * 使T中的所有属性都是必需的
 type Required<T> = {
    [P in keyof T]-?: T[P];
 }
*/
