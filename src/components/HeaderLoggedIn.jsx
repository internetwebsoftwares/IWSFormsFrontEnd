import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../MainContext";

export default function HeaderLoggedIn() {
  let { totalNotifications, setIsMenuOpen } = useContext(MainContext);
  let username = JSON.parse(
    localStorage.getItem("iwsform-user")
  ).username.split(" ");

  const shortUsername = `${username[0][0]}`;

  return (
    <div className="d-flex align-items-center">
      <div className="mr-3">
        <Link to="/notifications">
          <i
            style={{
              fontSize: "1.3rem",
              textShadow: "0 2px 2px #333",
              cursor: "pointer",
            }}
            className="fa fa-bell text-light"
          ></i>
          {totalNotifications !== 0 && (
            <span className="badge badge-danger">{totalNotifications}</span>
          )}
        </Link>
      </div>
      <div
        style={{ textDecoration: "none" }}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        title="Account and settings"
        className="text-white bg-danger shadow account-btn"
      >
        {shortUsername}
      </div>
    </div>
  );
}
