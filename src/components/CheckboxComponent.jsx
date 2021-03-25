import React from "react";

export default function CheckboxComponent({ question }) {
  return (
    <div>
      {question.questionOptions.map((option, index) => {
        return (
          <div key={index} className="form-check form-checbox">
            <label className="form-check-label">
              <input
                type="checkbox"
                name={`${question._id}option`}
                value={option}
                className="answers form-check-input checkbox"
              />
              <span>{option}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
