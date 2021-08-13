import { clearnObject, useDebounce, useMount } from "utils/index";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";

export interface Project {
  id: number;
  personId: number;
  name: string;
  pin: boolean;
  organization: string;
  created: number;
}

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 500);
  const client = useHttp();
  const { run, isLoading, data: list } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: clearnObject(debounceParam) }));

    //封装了useHttp
    // client('projects', {
    //     data: clearnObject(debounceParam)
    // })
    // .then(setList)
    // .catch(err => {
    //     setList([]);
    //     setError(err);
    // })
    // .finally(() => {
    //     setLoading(false);
    // });

    // 最初
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
      <List loading={isLoading} users={users} dataSource={list || []} />
    </div>
  );
};
