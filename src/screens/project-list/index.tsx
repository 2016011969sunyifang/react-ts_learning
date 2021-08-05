/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState, useEffect} from "react"
import { cleanObject, useMount,useDebounce } from '../../utils';
import * as qs from 'qs'
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);
export const ProjectListScreen = ()=>{
    const [param, setParam] = useState({
        name: "",
        personId: "",
      });
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

      const debouncedParam = useDebounce(param,500)

    // 获取文章列表
    useEffect(() => {
      //转换参数
      fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      });
    }, [debouncedParam]);
    //获取用户列表
    useMount(() => {
      fetch(`${apiUrl}/users`).then(async (response) => {
        if (response.ok) {
            setUsers(await response.json());
        }
      });
    });

    return <div>
        <SearchPanel users={users} param={param} setParam = {setParam}/>
        <List  users={users} list={list}/>
    </div>
}