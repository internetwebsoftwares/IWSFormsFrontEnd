import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Page from "./Page";

function YourForms() {
  let pageNo = 0;
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchAllYourForms() {
      try {
        const response = await axios.get(
          `/form/all/${pageNo}`,

          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
            },
          }
        );
        setForms(response.data);
        setIsLoading(false);
        pageNo++;
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllYourForms();
  }, []);

  return (
    <Page title="Your forms">
      <div className="container mt-5">
        <h3>All your forms</h3>
        {isLoading && (
          <center>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </center>
        )}

        <div className="row">
          {forms.map((form) => {
            return (
              <div
                className="bg-white p-2 shadow-sm rounded m-2 col-sm-12 col-md-3"
                key={form._id}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>{form.formName}</span>
                </div>

                <div>
                  <Link to={`/form/${form._id}/answers`}>
                    <small>View answers</small>
                  </Link>
                  {" | "}
                  <Link to={`/form/${form._id}`}>
                    <small>Visit form</small>
                  </Link>
                  {" | "}
                  <Link to={`/form/${form._id}/manage`}>
                    <small>Manage</small>
                  </Link>
                </div>

                <hr className="mb-1" />
                <small className="mt-0 text-muted">
                  {new Date(form.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            );
          })}
        </div>

        {!isLoading && forms.length === 0 && (
          <div className="text-muted">
            You have no forms, <Link to="/create-form">Create a form</Link>.{" "}
          </div>
        )}
      </div>
    </Page>
  );
}

export default YourForms;
