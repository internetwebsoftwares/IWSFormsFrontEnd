import React from "react";
import { Link } from "react-router-dom";

export default function HeaderLoggedOut() {
  return (
    <div>
      <Link to="/sign-up" className="shadow btn-sm btn btn-light mr-2">
        Sign up
      </Link>
      <Link to="/login" className="shadow btn-sm btn btn-success">
        login
      </Link>
    </div>
  );
}
