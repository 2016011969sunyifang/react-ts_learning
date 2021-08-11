import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
//logo
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const menu = (
    <Menu>
      <Menu.Item>
        <Button onClick={logout}>登出</Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <span>项目</span>
          <span>组员</span>
        </HeaderLeft>
        <HeaderRight>
          {/* 悬停效果 */}
          <Dropdown overlay={menu}>
            <Button type="link" onClick={(e) => e.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <h1>项目列表</h1>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
const Main = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
