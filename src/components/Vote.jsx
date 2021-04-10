import React, { useContext, useState } from "react";
import Page from "./Page";
import VoteAlert from "./VoteAlert";
import RadioComponent from "./RadioComponent";
import { withRouter } from "react-router";
import axios from "axios";
import MainContext from "../MainContext";

function Vote(props) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const isPoll = true;
  const [institutionName, setInstitutionName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const { addFlashMessage } = useContext(MainContext);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsPublishing(true);

    try {
      const response = await axios.post(
        `/new-form`,
        {
          formName,
          institutionName,
          isPoll,
          questions,
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
    <Page title="Create Vote / Poll">
      {isAlertOpen && (
        <VoteAlert
          setIsAlertOpen={setIsAlertOpen}
          setQuestions={setQuestions}
        />
      )}
      <div className="container  mt-5 p-4 d-flex justify-content-end align-items-center">
        <form onSubmit={handleSubmit}>
          <button
            disabled={isPublishing}
            type="submit"
            className="btn btn-success btn-sm shadow-sm"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
      <div className="container bg-white p-4 shadow-sm">
        <input
          type="text"
          onChange={(e) => setInstitutionName(e.target.value)}
          placeholder="Enter Institute name"
          className="project-name-input"
        />
        <input
          type="text"
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Enter poll name"
          className="project-name-input"
        />

        <div className="mt-4">
          {questions.map((question, index) => {
            return (
              <div
                key={index}
                className="px-4 py-2 mb-3 bg-light shadow-sm rounded"
              >
                <p>
                  <b>
                    {index + 1}) {question.question}
                  </b>
                </p>
                <RadioComponent question={question} />
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setIsAlertOpen(true)}
          className="btn btn-primary shadow-sm mt-4"
        >
          Add question
        </button>
      </div>
    </Page>
  );
}

export default withRouter(Vote);
