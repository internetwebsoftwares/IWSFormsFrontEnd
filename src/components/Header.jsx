import React, { useContext, useState } from "react";
import MainContext from "../MainContext";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";
import logo from "../iws-logo-white.svg";
import Menu from "./Menu";

export default function Header() {
  const { isLoggedIn } = useContext(MainContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header className="app-header shadow-lg bg-primary p-3 d-flex justify-content-between align-items-center">
        <a
          href="/"
          className="text-white"
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          <h3 className="bold text-light">
            <img
              style={{
                width: "2rem",
              }}
              src={logo}
              alt=""
            />{" "}
            <span className="logo-title">Forms</span>
          </h3>
        </a>
        {isLoggedIn ? (
          <HeaderLoggedIn setIsMenuOpen={setIsMenuOpen} />
        ) : (
          <HeaderLoggedOut />
        )}
      </header>
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
}
