import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="text-center container mt-5">
      <h1>
        <b>404!</b>
      </h1>
      <p className="text-muted">
        Form not found <Link to="/">go back home</Link>{" "}
      </p>
    </div>
  );
}
