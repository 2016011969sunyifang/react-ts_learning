import { User } from "screens/project-list/search-panel";

export interface AuthForm {
  username: string;
  password: string;
}
const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";

const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const login = (data: AuthForm) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};
export const register = (data: AuthForm) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};
export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};
