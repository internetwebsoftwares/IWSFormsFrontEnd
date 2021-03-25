import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Page from "./Page";

function AdminPanel() {
  const [totalUsers, setTotalUsers] = useState();
  const [totalForms, setTotalForms] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get("/all/data", {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        });
        console.log(response.data);
        setTotalUsers(response.data.totalUsers);
        setTotalForms(response.data.totalForms);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <Page title="Admin dashboard">
      <div className="container shadow-sm bg-white p-3 mt-5">
        <div>
          <h2 className="text-center mb-0">Admin's dashboard</h2>
        </div>
        <hr />

        <h5 className="text-center">Your bussiness growth</h5>
        <div className="row d-flex justify-content-center">
          <div className="bg-light m-2 text-center shadow-sm rounded  col-md-3 p-2">
            <h1 className="text-primary">{totalUsers}</h1>
            <h4>Users</h4>
            <Link to="/all/users">
              <small>View all users</small>
            </Link>
          </div>
          <div className="text-center m-2 bg-light shadow-sm rounded col-md-3 p-2">
            <h1 className="text-info">{totalForms}</h1>
            <h4>Forms</h4>
            <Link to="/all/forms">
              <small>View all forms</small>
            </Link>
          </div>
          <div className="bg-light m-2 text-center shadow-sm rounded  col-md-3 p-2">
            <h1 className="text-danger">100000</h1>
            <h4>Reports</h4>
            <Link to="/all/reports">
              <small>View all reports</small>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default AdminPanel;
