import React from "react";
import Page from "./Page";

export default function AtaShaikhProfile() {
  return (
    <Page title="Ata Shaikh">
      <div className="container text-center mt-5">
        <img
          className="profile mb-4 mt-5"
          src="./images/profile.jpg"
          alt="profile-pic"
        />
        <h1>
          Hi, i am <b>Ata Shaikh</b>
        </h1>
        <h4 style={{ lineHeight: "2rem" }} className="text-muted">
          Founder and CEO of <b>InternetWebSoftwares(IWS).</b> Full Stack web
          developer and Software Engineer
        </h4>
        <hr />
        <h5>
          <a href="https://internetwebsoftwares.github.io/porfolio/">
            Portfolio
          </a>{" "}
          {" | "}
          <a href="https://www.twitter.com/shaikhata666">Twitter</a> {" | "}
          <a href="https://m.facebook.com/shaikh.ata.3">Facebook</a> {" | "}
          <a href="https://www.instagram.com/ata_sk_official/">Instagram</a>
        </h5>
      </div>
    </Page>
  );
}
