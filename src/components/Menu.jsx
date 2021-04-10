import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import MainContext from "../MainContext";

function Menu(props) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isAdmin = JSON.parse(localStorage.getItem("iwsform-user")).isAdmin;
  const { setIsLoggedIn, setIsMenuOpen } = useContext(MainContext);
  async function handleLogout(e) {
    e.preventDefault();
    setIsLoggingOut(true);
    try {
      await axios.post(
        "/user/logout",
        {},
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        }
      );
      setIsLoggingOut(false);

      props.setIsMenuOpen(false);
      localStorage.removeItem("iwsform-user");
      localStorage.removeItem("iwsform-token");
      setIsLoggedIn(false);
      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoggingOut) {
    return (
      <div className="logout-page">
        <div>
          <center>
            <div
              className="spinner-border mt-5 text-primary"
              role="status"
            ></div>
            <p className="mt-2 text-white">Logging out please wait...</p>
          </center>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-4 d-flex flex-column pb-2 rounded app-menu shadow-lg">
        <Link
          onClick={() => props.setIsMenuOpen(false)}
          className="text-light text-decoration-none"
          to="/create-form"
        >
          Create forms
        </Link>
        <Link
          onClick={() => props.setIsMenuOpen(false)}
          className="text-light text-decoration-none"
          to="/create-poll"
        >
          Create vote / poll
        </Link>
        <Link
          onClick={() => props.setIsMenuOpen(false)}
          className="text-light text-decoration-none"
          to="/your-forms"
        >
          Manage your forms
        </Link>

        {isAdmin && (
          <Link
            onClick={() => props.setIsMenuOpen(false)}
            className="text-light text-decoration-none"
            to="/admin-dashboard"
          >
            Admin dashboard
          </Link>
        )}

        <Link
          onClick={() => props.setIsMenuOpen(false)}
          className="text-light text-decoration-none"
          to="/account-security"
        >
          Account & Security
        </Link>

        <form className="text-light" onSubmit={handleLogout}>
          <button
            className="btn btn-sm btn-block btn-dark rounded-0 logout-btn text-left pl-3"
            type="submit"
          >
            Logout
          </button>
        </form>
      </div>
      <div onClick={() => setIsMenuOpen(false)} className="menu-backdrop"></div>
    </>
  );
}

export default withRouter(Menu);
