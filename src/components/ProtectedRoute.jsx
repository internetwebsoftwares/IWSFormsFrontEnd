import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import MainContext from "../MainContext";

export default function ProtectedRoute({ path, children }) {
  const { isLoggedIn } = useContext(MainContext);
  return (
    <div>
      {isLoggedIn ? (
        <Route to={path}>{children}</Route>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}
