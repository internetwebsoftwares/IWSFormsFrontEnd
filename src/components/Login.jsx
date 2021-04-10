import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import MainContext from "../MainContext";
import Page from "./Page";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { setIsLoggedIn, addFlashMessage, locationToRedirect } = useContext(
    MainContext
  );
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoggingIn(true);
    const response = await Axios.post("/login", {
      email,
      password,
    });
    if (!response.data.user) {
      setIsLoggingIn(false);
      addFlashMessage(response.data, "danger");
      return;
    }
    setIsLoggingIn(false);
    localStorage.setItem("iwsform-user", JSON.stringify(response.data.user));
    localStorage.setItem("iwsform-token", JSON.stringify(response.data.token));
    setIsLoggedIn(true);
    console.log(locationToRedirect);
    props.history.push(locationToRedirect);
  }
  return (
    <Page title="Login">
      <div className="container d-flex justify-content-center my-5">
        <div className="max-400">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="eg:johndoe@example.com"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="password"
                className="form-control"
              />
            </div>
            <button
              disabled={isLoggingIn}
              type="submit"
              className="btn shadow btn-success btn-block"
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-3 mb-0 text-center">
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </p>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(Login);
