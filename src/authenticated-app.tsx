import React from "react"
import { useAuth } from "./context/auth-context"
import { ProjectListScreen } from "./screens/project-list"

export const AuthenticatedApp = ()=>{
  const {logout} = useAuth();
  return <div>
    <button onClick={logout}>登出</button>
    <ProjectListScreen/>
  </div>
}

// const PageHeader = style.header`
// height:6rem;
// `
// const Main = styled.main`
// height:calc(100vh-6rem);
// `