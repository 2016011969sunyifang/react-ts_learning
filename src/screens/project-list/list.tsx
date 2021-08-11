import { Table } from "antd";
import dayjs from "dayjs";
import { User } from "screens/project-list/search-panel";

interface Project {
  id: number;
  personId: number;
  name: string;
  organization: string;
  created: number;
}
interface ListProps {
  list: Project[];
  users: User[];
}
export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          dataIndex: "personId",
          key: "personId",
          render: (value, project) => (
            <span>
              {users.find((el) => el.id === project.personId)?.name || "none"}
            </span>
          ),
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render: (value, project) => (
            <span>
              {project.created
                ? dayjs(project.created).format("YYYY-MM-DD")
                : "无"}
            </span>
          ),
        },
      ]}
    />
  );
};
