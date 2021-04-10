import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";
import Page from "./Page";

function ViewAnswers() {
  const id = window.location.pathname.split("/")[2];
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const loadMoreForm = useRef();
  useEffect(() => {
    async function loadAnswers() {
      setPageNo(1);
      try {
        const response = await axios.get(
          `/form/${id}/${0}/answers`,

          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
            },
          }
        );

        setAnswers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadAnswers();
  }, [id]);

  async function loadMoreAnswers(e) {
    e.preventDefault();
    setIsLoadingMore(true);
    try {
      const response = await axios.get(`/form/${id}/${pageNo}/answers`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
        },
      });

      if (response.data.length < 10) {
        loadMoreForm.current.classList.add("d-none");
      }

      setPageNo((prev) => prev + 1);
      setAnswers((prev) => [...prev, ...response.data]);
      setIsLoadingMore(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <LoadingIcon />;
  }

  if (answers.length < 1) {
    return (
      <div className="container mt-5">No one have answered this form.</div>
    );
  }

  return (
    <Page title="All answers">
      <div className="container mt-5">
        <h3>Answers</h3>
        <hr />
        <div className="row">
          {answers.map((answer, index) => {
            return (
              <div
                key={index}
                className="col-sm-12 col-md-3 m-2 bg-white p-2 roundes shadow-sm"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="m-0">{answer.postedByUsername}</h5>
                  {answer.isChecked ? (
                    <small className="text-success">Checked</small>
                  ) : (
                    <small className="text-danger">Unchecked</small>
                  )}
                </div>
                <Link to={`/${answer._id}/answer`}>
                  <small>Visit answer</small>
                </Link>
                {answer.isThisExaminationForm && answer.isChecked ? (
                  <p className="small mt-1 mb-1">
                    Score: <b>{answer.score}</b>{" "}
                  </p>
                ) : (
                  ""
                )}
                <hr className="m-1" />
                <small className="text-muted">
                  {new Date().toDateString(answer.createdAt)}
                </small>
              </div>
            );
          })}
        </div>
        <form ref={loadMoreForm} onSubmit={loadMoreAnswers}>
          <button
            disabled={isLoadingMore}
            type="submit"
            className="btn btn-primary shadow-sm my-4 btn-sm"
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </form>
      </div>
    </Page>
  );
}

export default ViewAnswers;
