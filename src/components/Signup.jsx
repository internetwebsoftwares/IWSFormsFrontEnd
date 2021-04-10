import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import MainContext from "../MainContext";
import Page from "./Page";
import SelectCountry from "./SelectCountry";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { setIsLoggedIn, addFlashMessage, locationToRedirect } = useContext(
    MainContext
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSigningIn(true);
    const response = await Axios.post("/sign-up", {
      username,
      email,
      country,
      password,
    });
    if (!response.data.user) {
      setIsSigningIn(false);
      addFlashMessage(response.data, "danger");
      return;
    }
    setIsSigningIn(false);
    localStorage.setItem("iwsform-user", JSON.stringify(response.data.user));
    localStorage.setItem("iwsform-token", JSON.stringify(response.data.token));
    setIsLoggedIn(true);
    props.history.push(locationToRedirect);
  }
  return (
    <Page title="Register">
      <div className="container d-flex justify-content-center my-5">
        <div className="max-400">
          <h2 className="text-center">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                autoFocus
                required
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="eg:john doe"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="eg:johndoe@example.com"
                className="form-control"
              />
              <SelectCountry setCountry={setCountry} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                className="form-control"
              />
            </div>
            <button
              disabled={isSigningIn}
              type="submit"
              className="btn shadow btn-success btn-block"
            >
              {isSigningIn ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-3 mb-0 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(Signup);
