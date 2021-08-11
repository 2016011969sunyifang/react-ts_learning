import { clearnObject, useDebounce, useMount } from "utils/index";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { useHttp } from "utils/http";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 500);
  const client = useHttp();

  useEffect(() => {
    client("projects", {
      data: clearnObject(debounceParam),
    }).then(setList);

    // fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(debounceParam))}`).then(async res => {
    //     if(res.ok){
    //         setList(await res.json());
    //     }
    // });
  }, [debounceParam]); // eslint-disable-line react-hooks/exhaustive-deps

  useMount(() => {
    client("users").then(setUsers);

    // fetch(`${apiUrl}/users`).then(async res => {
    //     if(res.ok){
    //         setUsers(await res.json());
    //     }
    // });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
