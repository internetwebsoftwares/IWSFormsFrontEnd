import React, { useRef, useState } from "react";

export default function MyAlert({ setQuestions, setIsAlertOpen }) {
  const [question, setQuestion] = useState("");
  const [inputMethod, setInputMethod] = useState("");
  const input = useRef();
  const optionList = useRef();
  const innerOptionList = useRef();

  //Add question
  function addQuestion() {
    let questionOptions = [];
    let arrayFromNode = Array.from(document.querySelectorAll(".options-input"));

    for (let i = 0; i < arrayFromNode.length; i++) {
      questionOptions.push(arrayFromNode[i].value);
    }

    setQuestions((prev) => [
      ...prev,
      {
        questionOptions,
        question,
        inputMethod,
        _id: new Date().getTime().toString(),
      },
    ]);
    setIsAlertOpen(false);
  }

  let questionNo = 0;
  //Add options
  function addOptionsList() {
    let alphabets = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    let elem = document.createElement("div");
    elem.innerHTML = `<div class='d-flex align-items-center mb-2'>
    ${alphabets[questionNo]}) 
      <input type='text' placeholder='Enter option' class='options-input ml-1 form-control'>
    </div>`;
    innerOptionList.current.appendChild(elem);
    questionNo++;
  }

  return (
    <div className="my-alert bg-light shadow-lg p-4 rounded mt-3">
      <div>
        <input
          autoFocus
          placeholder="Enter question"
          type="text"
          className="shadow-sm my-alert-input"
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <p>Select input method:</p>
      <select
        onChange={(e) => {
          setInputMethod(e.target.value);
          if (e.target.value === "input") {
            optionList.current.classList.add("d-none");
            input.current.innerHTML =
              "<input required type='text' class='form-control' />";
          }
          if (e.target.value === "textarea") {
            optionList.current.classList.add("d-none");
            input.current.innerHTML =
              "<textarea rows='4' required class='form-control'></textarea>";
          }
          if (e.target.value === "radio" || e.target.value === "checkbox") {
            optionList.current.classList.remove("d-none");
            input.current.innerHTML = "";
          }
        }}
        className="select-tools"
      >
        <option value="input">Input box</option>
        <option value="textarea">Long answer</option>
        <option value="radio">Radio button</option>
        <option value="checkbox">Checkbox</option>
      </select>

      <div ref={optionList} className="d-none my-2">
        <div ref={innerOptionList}></div>
        <button
          onClick={addOptionsList}
          className="btn btn-sm  my-3 shadow-sm btn-outline-info"
        >
          Add options
        </button>
      </div>

      <div ref={input} className="my-2"></div>

      <hr />
      <div className="mt-2">
        <button
          onClick={() => setIsAlertOpen(false)}
          className="btn btn-danger shadow mr-2"
        >
          Cancel
        </button>
        <button onClick={addQuestion} className="btn btn-primary shadow">
          Add
        </button>
      </div>
    </div>
  );
}
