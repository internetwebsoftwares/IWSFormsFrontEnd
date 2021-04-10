import React from "react";
import Page from "./Page";

export default function FAQs() {
  return (
    <Page title="FAQs">
      <div className="container max-400 mt-5 p-5 bg-white shadow-sm">
        <h3>Frequently asked questions</h3>
        <hr />
        <p>
          <b>1) Does this website supports file uploads?</b>
        </p>
        <p className="text-muted">
          <b className="text-dark">Ans:</b> <b>No</b> this website does not
          support file uploads, It supports Textbox, Textarea for brief answers,
          Radio buttons & Checkboxes.
        </p>
        <p>
          <b>2) Does this website charge us to create forms?</b>
        </p>
        <p className="text-muted">
          <b className="text-dark">Ans:</b> <b>No</b> right now we do not charge
          for using any of our services.
        </p>
        <p>
          <b>3) Can i create Poll?</b>
        </p>
        <p className="text-muted">
          <b className="text-dark">Ans:</b> Yes you can create Poll / Vote by
          clicking on the <b>"Create Vote / Poll"</b> link from the menu.
        </p>
      </div>
    </Page>
  );
}
