import React from "react";

export default function HeaderLoggedIn({ setIsMenuOpen }) {
  let username = JSON.parse(
    localStorage.getItem("iwsform-user")
  ).username.split(" ");

  const shortUsername = `${username[0][0]}`;

  return (
    <div className="d-flex">
      <div
        style={{ textDecoration: "none" }}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        title="Account and settings"
        className="text-white account-btn"
      >
        {shortUsername}
      </div>
    </div>
  );
}
