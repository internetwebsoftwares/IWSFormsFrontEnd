import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";
import Page from "./Page";

function AdminPanel() {
  const [totalUsers, setTotalUsers] = useState();
  const [totalForms, setTotalForms] = useState();
  const [totalReports, setTotalReports] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [usersOfCountry, setUserOfCountry] = useState();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get("/all/data", {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        });
        setTotalUsers(response.data.totalUsers);
        setTotalForms(response.data.totalForms);
        setTotalReports(response.data.totalReports);
        setCountries(Object.keys(response.data.worldWideUsers));
        setUserOfCountry(response.data.worldWideUsers);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <Page title="Admin dashboard">
      <div className="container pt-3 p-0 mt-5">
        <div>
          <h2 className="text-center mb-0">Admin's dashboard</h2>
        </div>
        <hr />

        <h5 className="text-center text-muted">Your bussiness growth</h5>
        <div className="row d-flex justify-content-center mb-5">
          <div className="bg-white m-2 text-center shadow-sm rounded  col-md-3 p-2">
            <h1 className="text-primary">{totalUsers}</h1>
            <h4>Users</h4>
          </div>
          <div className="text-center m-2 bg-white shadow-sm rounded col-md-3 p-2">
            <h1 className="text-info">{totalForms}</h1>
            <h4>Forms</h4>
          </div>
          <div className="bg-white m-2 text-center shadow-sm rounded  col-md-3 p-2">
            <h1 className="text-danger">{totalReports}</h1>
            <h4>Reports</h4>
            <Link to="/all/reports">
              <small>View all reports</small>
            </Link>
          </div>
        </div>
        <div>
          <hr />

          <h4 className="text-center">Users by Countries</h4>
          <hr className="mb-0" />
          <table className="table table-bordered table-striped">
            <thead className="bg-primary text-white shadow-sm">
              <tr>
                <th>Country</th>
                <th>Users</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country, index) => {
                return (
                  <tr key={index}>
                    <td>{country}</td>
                    <td>{usersOfCountry[country]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

export default AdminPanel;
