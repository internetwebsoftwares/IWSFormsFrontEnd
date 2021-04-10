import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";
import Page from "./Page";

function YourForms() {
  const [pageNo, setPageNo] = useState(1);
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreFormsForm = useRef();

  useEffect(() => {
    setPageNo(1);
    async function fetchAllYourForms() {
      try {
        const response = await axios.get(
          `/form/all/0`,

          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
            },
          }
        );

        if (response.data.length < 10) {
          loadMoreFormsForm.current.classList.add("d-none");
        }

        setForms(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllYourForms();
  }, []);

  async function loadMoreForms(e) {
    e.preventDefault();
    setIsLoadingMore(true);
    try {
      const response = await axios.get(`/form/all/${pageNo}/`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
        },
      });
      console.log(response.data);

      if (response.data.length < 10) {
        loadMoreFormsForm.current.classList.add("d-none");
      }

      setPageNo((prev) => prev + 1);
      setForms((prev) => [...prev, ...response.data]);
      setIsLoadingMore(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page title="Your forms">
      <div className="container mt-5">
        <h3>All your forms</h3>
        <hr />

        {isLoading && <LoadingIcon />}

        <div className="row">
          {forms.map((form) => {
            return (
              <div
                className="bg-white p-2 shadow-sm rounded m-2 col-sm-12 col-md-3"
                key={form._id}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>{form.formName}</span>
                  {form.isPoll && <div className="badge badge-info">Poll</div>}
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
                  {form.isPoll && (
                    <>
                      {" | "}
                      <Link to={`/${form._id}/vote/results`}>
                        <small>See results</small>
                      </Link>
                    </>
                  )}
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

        <div>
          <form ref={loadMoreFormsForm} onSubmit={loadMoreForms}>
            <button
              disabled={isLoadingMore}
              type="submit"
              className={`btn ${
                isLoading ? "d-none" : ""
              } btn-primary shadow-sm my-4 btn-sm`}
            >
              {isLoadingMore ? "Loading..." : "Load more"}
            </button>
          </form>
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
