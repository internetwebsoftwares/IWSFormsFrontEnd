import axios from "axios";
import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import MainContext from "../MainContext";
import Page from "./Page";
import SelectCountry from "./SelectCountry";

function AccountSecurity(props) {
  const { addFlashMessage, setIsLoggedIn } = useContext(MainContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("iwsform-user")).username
  );
  const [country, setCountry] = useState(
    JSON.parse(localStorage.getItem("iwsform-user")).country
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");

  //Delete account
  async function deleteAccount(e) {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await axios.delete("/user/delete-account", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
        },
        data: {
          password,
        },
      });
      if (response.data === "Incorrect password") {
        setIsUpdating(false);
        addFlashMessage(response.data, "danger");
        return;
      }
      setIsUpdating(false);
      addFlashMessage(response.data, "success");
      localStorage.removeItem("iwsform-user");
      localStorage.removeItem("iwsform-token");
      setIsLoggedIn(false);
      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  //Change password
  async function changePassword(e) {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await axios.patch(
        "/user/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        }
      );
      if (response.data !== "Password changed successfully.") {
        setIsUpdating(false);
        addFlashMessage(response.data, "danger");
        return;
      }
      setIsUpdating(false);

      addFlashMessage(response.data, "success");
    } catch (error) {
      console.log(error);
    }
  }

  //Update profile
  async function updateProfile(e) {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.patch(
        "/user/edit",
        {
          username,
          country,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        }
      );
      let user = JSON.parse(localStorage.getItem("iwsform-user"));
      let updatedUser = {
        ...user,
        username,
        country,
      };
      localStorage.setItem("iwsform-user", JSON.stringify(updatedUser));
      setIsUpdating(false);
      addFlashMessage("Profile updated successfully.", "success");
    } catch (error) {
      console.log(error);
    }
  }
  if (isUpdating) {
    return <div className="mt-5 text-center">Updating please wait...</div>;
  }
  return (
    <Page title="Account security">
      <div className="container mt-5">
        <h3>Account Security</h3>
        <hr />
        <h5 className="mb-3">Update profile:</h5>
        <div className="bg-white p-4 shadow-sm form-group">
          <form onSubmit={updateProfile}>
            <label htmlFor="username">Enter new username:</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control"
            />
            <SelectCountry country={country} setCountry={setCountry} />
            <button className="mt-2 btn btn-success shadow">Update</button>
          </form>
        </div>
        <br />
        <h5 className="mb-3">Change password</h5>
        <div className="bg-white p-4 shadow-sm form-group">
          <form onSubmit={changePassword}>
            <label htmlFor="c-password">Enter current Password:</label>
            <input
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
              className="form-control mb-2"
            />
            <label htmlFor="n-password">Enter new Password:</label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className="form-control"
            />
            <button type="submit" className="mt-2 btn btn-success shadow">
              Change
            </button>
          </form>
        </div>
        <br />
        <hr />
        <h5 className="mb-3">Delete account</h5>
        <div className="form-group bg-white p-4 shadow-sm">
          <form onSubmit={deleteAccount}>
            <label htmlFor="c-password">Enter Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control mb-2"
            />
            <button type="submit" className="btn btn-danger shadow">
              Delete account
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default withRouter(AccountSecurity);
