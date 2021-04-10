import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Page from "./Page";

function Home(props) {
  const [formLink, setFormLink] = useState("");
  function openLink(e) {
    e.preventDefault();
    props.history.push(`/form/${formLink}`);
  }
  return (
    <Page title="Welcome to IWS Forms">
      <div className="container d-flex justify-content-center my-5">
        <div className="max-800">
          <h1 className="text-center">
            Welcome, to <b>IWS Forms</b>
          </h1>
          <h3 className="mt-0 text-center text-muted">
            The next generation plartform to create forms for{" "}
            <span className="text-dark">
              exams, quizes and all other activities.
            </span>{" "}
          </h3>
          <center>
            <form
              style={{ width: "100%" }}
              className="d-flex align-items-center  mt-5 form-group"
              onSubmit={openLink}
            >
              <input
                autoFocus
                required
                onChange={(e) => setFormLink(e.target.value.split("/")[4])}
                placeholder="Paste the link of the form"
                type="url"
                className="form-control mr-2"
              />
              <button type="submit" className="btn-primary btn shadow-sm">
                Go
              </button>
            </form>

            <p>
              <b>Or</b>
            </p>
            <Link to="/create-form" className="btn btn-primary shadow btn-lg">
              Create a form
            </Link>
          </center>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(Home);
