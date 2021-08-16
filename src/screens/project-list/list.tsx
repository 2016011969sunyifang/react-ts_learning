import { Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { User } from "screens/project-list/search-panel";

export interface Project {
  id: number;
  personId: number;
  name: string;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          dataIndex: "personId",
          render: (value, project) => (
            <span>
              {users.find((el) => el.id === project.personId)?.name || "none"}
            </span>
          ),
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render: (value) => (
            <span>{value ? dayjs(value).format("YYYY-MM-DD") : "无"}</span>
          ),
        },
      ]}
      {...props}
    />
  );
};
