import React from "react";

export default function RadioComponent({ question }) {
  return (
    <>
      {question.questionOptions.map((option, index) => {
        return (
          <div key={index} className="form-check form-radio">
            <label className="form-check-label">
              <input
                type="radio"
                name={`${question._id}option`}
                value={option}
                className="answers form-check-input"
              />
              <span>{option}</span>
            </label>
          </div>
        );
      })}
    </>
  );
}
