import React from "react";

export default function LoadingIcon() {
  return (
    <div>
      <center>
        <div className="spinner-border mt-5 text-primary" role="status"></div>
        <p className="mt-2 text-white">Loading...</p>
      </center>
    </div>
  );
}
