import React from "react";

export default function ConfirmAlert({
  message,
  isDeleting,
  setIsConfirmAlertOpen,
  handleDelete,
}) {
  return (
    <div className="shadow-lg bg-white p-3 confirm-alert">
      <h4>Alert!!!</h4>
      <p>{message}</p>
      <div className="d-flex">
        <button
          onClick={() => setIsConfirmAlertOpen(false)}
          className="btn shadow mr-2 btn-secondary btn-sm"
        >
          Cancel
        </button>
        <form onSubmit={handleDelete}>
          <button
            disabled={isDeleting}
            className="btn shadow btn-danger btn-sm"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </form>
      </div>
    </div>
  );
}
