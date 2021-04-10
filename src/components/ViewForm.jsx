import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import CheckboxComponent from "./CheckboxComponent";
import Page from "./Page";
import RadioComponent from "./RadioComponent";
import MainContext from "../MainContext";
import LoadingIcon from "./LoadingIcon";

function ViewForm() {
  const id = document.location.pathname.split("/")[2];
  const [form, setForm] = useState({ formName: "..." });
  const { addFlashMessage } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isReporting, setIsReporting] = useState(false);
  const [isReportAlertOpen, setIsReportAlertOpen] = useState(false);
  const [reportBtnActive, setReportBtnActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const myId = JSON.parse(localStorage.getItem("iwsform-user"))._id;
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const reportBtn = useRef();

  useEffect(() => {
    async function loadForm() {
      try {
        const response = await axios.get(`/form/${id}/`);
        setForm(response.data);
        setAlreadySubmitted(
          Boolean(response.data.alreadySubmitted.includes(myId))
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadForm();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    let answers = [];
    let arrayOfElements = Array.from(
      document.querySelectorAll(".answers-input")
    );

    try {
      for (let j = 0; j < arrayOfElements.length; j++) {
        let answersInput = arrayOfElements[j].children[0].children;
        if (answersInput.length > 1) {
          let checkedBoxAnswer = [];
          for (let i = 0; i < answersInput.length; i++) {
            if (
              answersInput[i].children[0].children[0].checked &&
              answersInput[i].className === "form-check form-checbox"
            ) {
              checkedBoxAnswer.push(
                answersInput[i].children[0].children[0].value
              );
              answers.push(checkedBoxAnswer);
            }
            if (
              answersInput[i].children[0].children[0].checked &&
              answersInput[i].className === "form-check form-radio"
            ) {
              answers.push(answersInput[i].children[0].children[0].value);
            }
          }
        } else {
          answers.push(answersInput[0].value);
        }
      }
      answers = [...new Set(answers)];
      const response = await axios.post(
        `/form/${id}/answer`,
        {
          answersByUser: answers,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        }
      );
      setIsSubmitting(false);
      if (response.data === "Form is no longer accepting responses.") {
        addFlashMessage(response.data, "danger");
        return;
      }
      setAlreadySubmitted(true);
      addFlashMessage(response.data, "success");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleReport(e) {
    e.preventDefault();
    setIsReporting(true);
    try {
      const response = await axios.post(
        `/report/${id}/add`,
        {},
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        }
      );
      setIsReportAlertOpen(false);
      setIsReporting(false);
      addFlashMessage("Reported successfully.", "success");
      reportBtn.current.style.display = "none";
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <LoadingIcon />;
  }
  if (isReporting) {
    return <p className="text-center mt-5">Reporting a file please wait...</p>;
  }
  if (isSubmitting) {
    return (
      <p className="text-center mt-5">
        Submitting answers please do not go back...
      </p>
    );
  }
  if (alreadySubmitted) {
    return (
      <div className="container bg-white p-5 shadow-sm mt-5">
        <h2>
          <b>{form.institutionName}</b>
        </h2>
        <h4 className="text-dark">{form.formName}</h4>
        <hr />
        <p>You have submitted this form.</p>
      </div>
    );
  }
  if (isReporting) {
    return <div className="text-center mt-5">Reporting please wait..</div>;
  }

  if (!form.isAcceptingResponses) {
    return (
      <div className="container bg-white mt-5 p-5 shadow-sm">
        <h3>{form.formName}</h3>
        <h5>{form.institutionName}</h5>
        <p className="text-muted">
          This form has stopped taking responses. please contact the owner
        </p>
      </div>
    );
  }

  return (
    <>
      {isReportAlertOpen && (
        <div className="report-alert bg-white p-4 max-400 shadow rounded">
          <h4>
            Report <b>Terms</b>
          </h4>
          <p className="text-muted">
            If we find anything wrong in this form we will surely delete the
            form. but if we find that you report this for no reason we will
            definately delete your account permanently.
          </p>
          <input
            onChange={(e) =>
              e.target.checked
                ? setReportBtnActive(false)
                : setReportBtnActive(true)
            }
            type="checkbox"
            id="terms"
          />{" "}
          <label htmlFor="terms">Yes i agree the terms.</label>
          <hr />
          <button
            onClick={() => setIsReportAlertOpen(false)}
            className="btn btn-secondary btn-sm mr-2 shadow-sm"
          >
            Cancel
          </button>
          <form onSubmit={handleReport} className="d-inline">
            <button
              disabled={reportBtnActive}
              className="btn btn-primary btn-sm shadow-sm"
            >
              Report
            </button>
          </form>
        </div>
      )}
      <Page title={form.formName}>
        <div className="container mt-3 bg-white p-5 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <b>{form.institutionName}</b>
              </h2>
              <h4 className="text-dark">{form.formName}</h4>
            </div>
            {form.reportedBy.includes(
              JSON.parse(localStorage.getItem("iwsform-user"))._id
            ) ? (
              <p className="text-danger">
                <small>You have reported this form</small>
              </p>
            ) : (
              ""
            )}
          </div>

          <hr />

          {form.questions.map((question, index) => {
            return (
              <div
                className="bg-light p-2 mb-4 rounded shadow-sm"
                key={question._id}
              >
                <div className="d-flex align-items-center">
                  <p className="mr-2">
                    <b>{index + 1})</b>
                  </p>
                  <p>
                    <b>{question.question}</b>
                  </p>
                </div>
                <div className="answers-input">
                  {question.inputMethod === "" && (
                    <div>
                      <input
                        type="text"
                        className="answers form-control mb-3"
                      />
                    </div>
                  )}
                  {question.inputMethod === "input" && (
                    <div>
                      <input
                        type="text"
                        className="answers form-control mb-3"
                      />
                    </div>
                  )}
                  {question.inputMethod === "textarea" && (
                    <div>
                      <textarea
                        rows="4"
                        className="answers form-control mb-3"
                      ></textarea>
                    </div>
                  )}
                  {question.inputMethod === "radio" && (
                    <div>
                      <RadioComponent question={question} />
                    </div>
                  )}
                  {question.inputMethod === "checkbox" && (
                    <CheckboxComponent question={question} />
                  )}
                </div>
              </div>
            );
          })}

          {!form.alreadySubmitted.includes(myId) && (
            <div>
              <hr />
              <form onSubmit={handleSubmit}>
                <button type="submit" className="btn btn-success shadow-sm">
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="container mt-3 text-center text-muted">
          <hr />
          This content niether created nor endorsed by IWS Forms
          <br />
          <br />
          <a
            href="#"
            ref={reportBtn}
            onClick={() => setIsReportAlertOpen(true)}
            className=""
          >
            Report this form
          </a>
        </div>
      </Page>
    </>
  );
}

export default ViewForm;
