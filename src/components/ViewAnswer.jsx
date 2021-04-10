import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MainContext from "../MainContext";
import LoadingIcon from "./LoadingIcon";
import Page from "./Page";
function ViewAnswer() {
  const id = window.location.pathname.split("/")[1];
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [answer, setAnswer] = useState();
  const [totalMarks, setTotalMarks] = useState(parseInt(0));
  const [remark, setRemark] = useState("");
  const { addFlashMessage } = useContext(MainContext);

  useEffect(() => {
    async function loadAnswer() {
      try {
        const response = await axios.get(`/answer/${id}/answer`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        });

        setAnswer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadAnswer();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsChecking(true);
    try {
      if (!totalMarks) {
        setTotalMarks(0);
      }
      await axios.put(
        `/answer/${id}/check`,
        {
          totalMarks,
          remark,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        }
      );

      setIsChecking(false);
      addFlashMessage("Answer checked", "success");
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <LoadingIcon />;
  }
  if (isChecking) {
    return (
      <div className="text-center mt-5">
        Checking answer please do not close the window....
      </div>
    );
  }
  return (
    <Page title={`${answer.formName} answered by ${answer.postedByUsername}`}>
      <div className="container mt-5 bg-white p-4 shadow-sm">
        {answer.isChecked && answer.remark !== "fail" ? (
          <p className="text-success">
            <b>{answer.remark}</b>
          </p>
        ) : (
          <p className="text-success">
            <b>{answer.remark}</b>
          </p>
        )}
        <div className="d-flex justify-content-end p-0">
          <form
            className="d-flex align-items-center max-400 justify-content-end"
            onSubmit={handleSubmit}
          >
            {answer.isThisExaminationForm && !answer.isChecked ? (
              <>
                <div className="form-group mr-2">
                  <label>
                    <small>
                      Give score to student out of {answer.outOfMarks}:
                    </small>
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e) => setTotalMarks(parseInt(e.target.value))}
                    placeholder="Marks scored"
                    className="form-control"
                  />
                </div>
                <div className="form-group mr-2">
                  <label>
                    <small>Give remark:</small>
                  </label>
                  <select
                    onChange={(e) => setRemark(e.target.value)}
                    className="form-control"
                  >
                    <option value="pass">Pass</option>
                    <option value="distinction">Distinction</option>
                    <option value="fail">Fail</option>
                  </select>
                </div>
              </>
            ) : (
              ""
            )}
            {!answer.isChecked && (
              <button type="submit" className="btn btn-success shadow-sm mt-3">
                Check
              </button>
            )}

            {answer.isChecked && (
              <div className="answer-sheet-marks">
                <p>{answer.score}</p>
                <div></div>
                <p>{answer.outOfMarks}</p>
              </div>
            )}
          </form>
        </div>
        <hr />
        <h3>
          <b className="text-primary">{answer.postedByUsername}'s</b> answer
          sheet of <b>{answer.formName}</b>
        </h3>
        <p>
          <b>Marks:</b> {answer.outOfMarks}
        </p>
        <p className="text-muted">
          <b className="text-dark">Submitted on: </b>
          {new Date().toDateString(answer.createdAt)}
        </p>
        <hr />

        <p className="small text-muted">
          <b className="text-dark">Tip: </b>{" "}
          {answer.isThisExaminationForm
            ? `Check the checkbox aside of
          question's to remember that this is the correct answer it will be easy
          for you to count the score.`
            : `Check the checkbox aside of
          question's to remember that you have checked this answer this will make your work easy.`}
        </p>

        <div className="">
          {answer.answers.map((answer, index) => {
            return (
              <div key={index} className="p-4 rounded">
                <input className="form-check-input" type="checkbox" />

                <p>
                  <b>Q.{index + 1}) </b>
                  {answer.question}
                </p>
                <p>
                  <b>Ans: </b>
                  {Array.isArray(answer.answer)
                    ? answer.answer.join(", ")
                    : answer.answer}
                </p>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </Page>
  );
}

export default ViewAnswer;
