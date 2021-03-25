import React from "react";
import Page from "./Page";

export default function Terms() {
  return (
    <Page title="Terms & conditions">
      <div className="container d-flex justify-content-center mt-5">
        <div className="max-800">
          <h3>Terms & conditions</h3>
          <hr />
          <h5 style={{ lineHeight: "2rem" }} className="text-muted">
            By using this app you agree our terms and services. your personal
            information's saftey is our first priority. We use your personal
            information such as the country you are living in to track our
            growth as a bussiness in the world. We don't sell any informations
            related to the user's to any third party services or to any
            government officials.
          </h5>
          <br />
          <br />
          <h3>Rules & guidelines</h3>
          <hr />
          <h5 style={{ lineHeight: "2rem" }} className="text-muted">
            We strictly recommend user's not to create form for any harmfull
            purposes otherwise we will ban your account permanently. You can
            report a form if you find something wrong. we will delete the form
            immediately if necessary after manually verifying the case.
          </h5>
        </div>
      </div>
    </Page>
  );
}
