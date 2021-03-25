import React from "react";

export default function FlashMessage({ messages, color }) {
  return (
    <div className="floating-alerts">
      {messages.map((message, index) => {
        return (
          <div
            className={`alert alert-${color} text-center floating-alert shadow`}
            key={index}
          >
            {message}
          </div>
        );
      })}
    </div>
  );
}
