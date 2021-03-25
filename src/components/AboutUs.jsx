import React from "react";
import Page from "./Page";

export default function AboutUs() {
  return (
    <Page title="About us">
      <div className="container d-flex justify-content-center mt-5">
        <div className="max-800">
          <h3>About us</h3>
          <hr />
          <h5 style={{ lineHeight: "2rem" }} className="text-muted">
            This web application is a light weight alternative of google forms.
            This is easy to use yet very powerfull app to create robust forms
            for every use. The app is created by{" "}
            <span className="text-dark">IWS (Internet web softwares). </span>
            This app can be use for creating form for school uses like Quizes,
            Exams, Admission etc, This tool is usefull for bussiness and
            everywhere where the traditional paper form was used.
          </h5>
        </div>
      </div>
    </Page>
  );
}
