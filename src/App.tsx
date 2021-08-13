import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <ErrorBoundary fallbackRender = {FullPageErrorFallBack}></ErrorBoundary> */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
