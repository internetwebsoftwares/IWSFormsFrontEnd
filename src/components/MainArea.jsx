import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import MainContext from "../MainContext";
import CheckboxComponent from "./CheckboxComponent";
import MyAlert from "./MyAlert";
import Page from "./Page";
import RadioComponent from "./RadioComponent";

function MainArea(props) {
  const [formName, setFormName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isThisExaminationForm, setIsThisExaminationForm] = useState(false);
  const [outOfMarks, setOutOfMarks] = useState(parseInt(0));
  const questionsList = useRef();
  const [questions, setQuestions] = useState([]);
  const { addFlashMessage } = useContext(MainContext);

  async function done(e) {
    e.preventDefault();
    setIsPublishing(true);

    try {
      const response = await axios.post(
        `/new-form`,
        {
          formName,
          institutionName,
          questions,
          outOfMarks,
          isThisExaminationForm,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        }
      );
      if (!response.data.formId) {
        setIsPublishing(false);
        return;
      }
      setIsPublishing(false);
      addFlashMessage("Form created successfully.", "success");
      props.history.push("/your-forms");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page title="Create a brand new form">
      {isAlertOpen && (
        <MyAlert setIsAlertOpen={setIsAlertOpen} setQuestions={setQuestions} />
      )}
      <div className="mt-4 p-2 container d-flex justify-content-end align-items-center">
        <input
          onChange={(e) => setIsThisExaminationForm((prev) => !prev)}
          id="examination-cb"
          type="checkbox"
          className="mr-2"
        />
        <label className="mt-2 mr-2" htmlFor="examination-cb">
          This is an exam form.
        </label>
        <div className="max-200">
          {isThisExaminationForm && (
            <input
              type="text"
              className="form-control form-control-sm"
              onChange={(e) => setOutOfMarks(parseInt(e.target.value))}
              placeholder="Enter total marks"
            />
          )}
        </div>
        <form onSubmit={done}>
          <button
            disabled={isPublishing}
            className="shadow btn btn-sm btn-success ml-2"
          >
            {isPublishing ? "Publishing..." : "Publish Form"}
          </button>
        </form>
      </div>
      <div className="d-flex d-flex bg-white p-4 flex-column shadow-sm mt-2 container">
        <div className="bg-secondary">
          <div>
            <input
              type="text"
              autoFocus
              required
              placeholder="School, bussiness or institution name"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              className="project-name-input"
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Enter Form name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="project-name-input"
            />
          </div>
        </div>
        <div ref={questionsList} className="mt-4">
          {questions.map((question, index) => {
            return (
              <div key={index} className="shadow-sm p-3 bg-light mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <b>
                    {index + 1}) {question.question}
                  </b>

                  <button
                    onClick={() => {
                      let newQuestions = questions.filter((thisQuestion) => {
                        return thisQuestion._id !== question._id;
                      });
                      setQuestions(newQuestions);
                    }}
                    className="btn btn-sm shadow btn-danger"
                  >
                    <i className="fa fa-trash"></i> Delete
                  </button>
                </div>

                {question.inputMethod === "" && (
                  <input className="form-control mt-2" type="text" />
                )}
                {question.inputMethod === "input" && (
                  <input className="form-control mt-2" type="text" />
                )}
                {question.inputMethod === "textarea" && (
                  <textarea className="form-control mt-2"></textarea>
                )}

                {question.inputMethod === "radio" && (
                  <RadioComponent question={question} />
                )}
                {question.inputMethod === "checkbox" && (
                  <CheckboxComponent question={question} />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <button
            onClick={() => setIsAlertOpen(true)}
            className="shadow btn btn-primary"
          >
            Add question
          </button>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(MainArea);
