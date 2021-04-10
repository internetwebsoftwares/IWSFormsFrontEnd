import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="mt-5 p-3 text-center">
      <hr />
      <p className="mb-2 text-muted">
        An{" "}
        <span className="text-dark">
          <Link to="/ata-shaikh-profile">Ata Shaikh</Link>
        </span>{" "}
        production <span className="text-dark">IWS Forms</span> &copy;{" "}
        {new Date().getFullYear() !== 2021 && "2021 - "}
        {new Date().getFullYear()}. All rights reserved
      </p>
      <div>
        <Link to="/about-us">About us</Link> | <Link to="/terms">Terms</Link> |{" "}
        <Link to="/faqs">FAQs</Link>
      </div>
    </div>
  );
}
