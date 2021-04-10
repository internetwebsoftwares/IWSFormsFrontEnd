import React, { useRef, useState } from "react";

export default function VoteAlert({ setQuestions, setIsAlertOpen }) {
  const optionsList = useRef();
  const [question, setQuestion] = useState("");

  function addOptions() {
    let input = document.createElement("input");
    let totalOptions = optionsList.current.childElementCount;
    input.setAttribute("placeholder", `Option ${totalOptions + 1}`);
    input.className = "form-control form-control-sm my-2";
    optionsList.current.appendChild(input);
  }

  function addQuestions() {
    let options = [...optionsList.current.children].map((child) => {
      return child.value;
    });

    setQuestions((prev) => [
      ...prev,
      {
        question,
        inputMethod: "radio",
        questionOptions: options,
        _id: new Date().getTime().toString(),
      },
    ]);

    setIsAlertOpen(false);
  }

  return (
    <div className="bg-white rounded shadow p-4 vote-alert">
      <input
        onChange={(e) => setQuestion(e.target.value)}
        type="text"
        autoFocus
        placeholder="Enter question"
        className="form-control"
      />
      <div ref={optionsList}>
        <input
          type="text"
          className="form-control my-2 form-control-sm"
          placeholder="Option 1"
        />
        <input
          type="text"
          className="form-control my-2 form-control-sm"
          placeholder="Option 2"
        />
      </div>
      <button
        onClick={addOptions}
        className="btn btn-info shadow-sm btn-sm mt-3"
      >
        Add more options
      </button>
      <hr />
      <button
        onClick={() => setIsAlertOpen(false)}
        className="btn btn-secondary mr-2 shadow-sm btn-sm mt-3"
      >
        Cancel
      </button>
      <button
        onClick={addQuestions}
        className="btn btn-primary mr-2 shadow-sm btn-sm mt-3"
      >
        Add question
      </button>
    </div>
  );
}
