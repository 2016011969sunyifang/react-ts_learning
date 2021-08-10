/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState, useEffect} from "react"
import { cleanObject, useMount,useDebounce } from '../../utils';
import * as qs from 'qs'
import { useHttp } from '../../utils/http';
export const ProjectListScreen = ()=>{
  const client = useHttp();
    const [param, setParam] = useState({
        name: "",
        personId: "",
      });
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

      const debouncedParam = useDebounce(param,500)

    // 获取文章列表
    useEffect(() => {
      client('projects',{data:cleanObject(debouncedParam)}).then(setList)
    }, [debouncedParam]);
    //获取用户列表
    useMount(() => {
      client('users',{data:cleanObject(debouncedParam)}).then(setUsers)
    });

    return <div>
        <SearchPanel users={users} param={param} setParam = {setParam}/>
        <List  users={users} list={list}/>
    </div>
}