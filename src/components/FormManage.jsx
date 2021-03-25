import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import ConfirmAlert from "./ConfirmAlert";

function FormManage(props) {
  const id = document.location.pathname.split("/")[2];
  const [isLoading, setIsLoading] = useState(true);
  const [isManaging, setIsManaging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [form, setForm] = useState({
    formName: ".....",
  });
  useEffect(() => {
    async function fetchForm() {
      try {
        const response = await axios.get(`/form/${id}`);

        setIsLoading(false);
        setForm(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchForm();
  }, [id]);

  async function handleAcceptingResponses(e) {
    e.preventDefault();
    setIsManaging(true);
    try {
      const response = await axios.patch(
        `/form/${id}/accepting-responses`,
        {},
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        }
      );
      setIsManaging(false);
      setForm({
        ...form,
        isAcceptingResponses: `${
          response.data === "Form is accepting responses: false" ? false : true
        }`,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDelete(e) {
    e.preventDefault();
    setIsDeleting(true);
    try {
      const response = await axios.delete(`/form/${id}/delete`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
        },
      });
      setIsDeleting(false);
      props.history.push(`/your-forms`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      {isConfirmAlertOpen && (
        <ConfirmAlert
          message="Are you sure you want to delete this form?"
          isDeleting={isDeleting}
          setIsConfirmAlertOpen={setIsConfirmAlertOpen}
          handleDelete={handleDelete}
        />
      )}
      <h3>
        Manage your form: <b>{form.formName}</b>
      </h3>
      {!isLoading && (
        <div className="mt-4 d-flex">
          {isManaging ? (
            "Please wait updating your form..."
          ) : (
            <>
              <form onSubmit={handleAcceptingResponses}>
                <button
                  className={`btn mr-2 btn-outline-${
                    form.isAcceptingResponses ? "danger" : "success"
                  } btn-sm shadow-sm`}
                >
                  {form.isAcceptingResponses ? "Stop " : "Start "} accepting
                  responses
                </button>
              </form>

              <button
                onClick={() => setIsConfirmAlertOpen(true)}
                className="btn btn-danger btn-sm shadow-sm"
              >
                Delete form
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default withRouter(FormManage);
