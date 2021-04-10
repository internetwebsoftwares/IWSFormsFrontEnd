import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MainContext from "../MainContext";
import LoadingIcon from "./LoadingIcon";
import Page from "./Page";

function ViewReports() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { addFlashMessage } = useContext(MainContext);

  const [pageNo, setPageNo] = useState(1);
  const loadMoreReportsForm = useRef();

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await axios.get(`/report/all-reports/0`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        });
        setReports(response.data);
        setIsLoading(false);
        if (!response.data[0]._id) {
          addFlashMessage(response.data, "danger");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchReports();
  }, []);

  async function loadMoreReports(e) {
    e.preventDefault();
    setIsLoadingMore(true);
    try {
      const response = await axios.get(`/report/all-reports/${pageNo}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
        },
      });
      if (response.data.length > 0) {
        setReports((prev) => [...prev, response.data]);
      } else {
        loadMoreReportsForm.current.style.display = "none";
      }
      setIsLoadingMore(false);
      setPageNo((prev) => prev++);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    setIsDeleting(true);
    try {
      await axios.delete(`/report/${e.target.className}/delete`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
        },
      });
      setIsDeleting(false);
      addFlashMessage("Form deleted by Admin", "success");
      setReports((prev) =>
        prev.filter((pre) => {
          return pre.reportedOnFormId !== e.target.className;
        })
      );
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return <LoadingIcon />;
  }
  if (isDeleting) {
    return <div className="text-center mt-5">Deleting the form...</div>;
  }

  return (
    <Page title="Reports">
      <div className="container mt-5 bg-white p-5 shadow-sm">
        <h4>
          Reports | <span className="text-muted">Admin Dashboard</span>
        </h4>

        <hr />
        {reports
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((report) => {
            return (
              <div
                key={report._id}
                className="bg-light mb-3 border shadow-sm rounded p-4"
              >
                <h4>
                  Form name:{" "}
                  <Link to={`/form/${report.reportedOnFormId}`}>
                    {report.reportedOnFormName}
                  </Link>
                </h4>
                <small>
                  Form ID: <b>{report.reportedOnFormId}</b>{" "}
                </small>

                <p className="mt-3">
                  By: <b>{report.reportedByUsername}</b> his ID:{" "}
                  <b>{report.reportedById}</b>
                </p>
                <p>
                  Form owner ID: <b>{report.formOwnerId}</b>
                </p>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {new Date(report.createdAt).toDateString()}
                  </small>

                  <form
                    className={report.reportedOnFormId}
                    onSubmit={handleDelete}
                  >
                    <button className="btn btn-sm btn-danger shadow-sm">
                      <i className="fa fa-trash"></i> Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        <form ref={loadMoreReportsForm} onSubmit={loadMoreReports}>
          <button
            disabled={isLoadingMore}
            type="submit"
            className="btn btn-primary shadow"
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </form>
      </div>
    </Page>
  );
}

export default ViewReports;
