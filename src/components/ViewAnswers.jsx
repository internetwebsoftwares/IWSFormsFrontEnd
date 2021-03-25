import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Page from "./Page";

function ViewAnswers() {
  const id = window.location.pathname.split("/")[2];
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  let pageNo = 0;
  useEffect(() => {
    async function loadAnswers() {
      try {
        const response = await axios.get(
          `/form/${id}/${pageNo}/answers`,

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
  }, [id, pageNo]);
  if (isLoading) {
    return <div className="text-center mt-5">Loading answers...</div>;
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
      </div>
    </Page>
  );
}

export default ViewAnswers;
