import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router";
import MainContext from "../MainContext";

export default function ProtectedRoute({ path, children }) {
  const { isLoggedIn } = useContext(MainContext);
  const { setLocationToRedirect } = useContext(MainContext);
  const locationAddress = window.location.pathname;
  useEffect(() => {
    setLocationToRedirect(locationAddress);
  }, []);

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
