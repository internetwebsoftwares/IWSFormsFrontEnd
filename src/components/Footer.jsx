import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="mt-5 p-3 text-center">
      <hr />
      <p className="mb-0 text-muted">
        An <span className="text-dark">Ata Shaikh</span> production{" "}
        <span className="text-dark">IWS Forms</span> &copy;{" "}
        {new Date().getFullYear() !== 2021 && "2021 - "}
        {new Date().getFullYear()}. All rights reserved
      </p>
      <div>
        <Link className="small" to="/about-us">
          About us
        </Link>{" "}
        |{" "}
        <Link className="small" to="/terms">
          Terms
        </Link>
      </div>
    </div>
  );
}
