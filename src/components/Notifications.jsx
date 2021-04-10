import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MainContext from "../MainContext";
import LoadingIcon from "./LoadingIcon";
import Page from "./Page";

export default function Notifications() {
  const user = JSON.parse(localStorage.getItem("iwsform-user"));
  const { setTotalNotifications } = useContext(MainContext);
  const updatedUser = {
    ...user,
    totalNotifications: 0,
  };
  localStorage.setItem("iwsform-user", JSON.stringify(updatedUser));

  const [notifications, setNotifications] = useState([]);
  const [isDeletingNotifications, setIsDeletingNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await axios.get(`/user/notifications/notification`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        });
        setNotifications(response.data);
        setTotalNotifications(0);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadNotifications();
  }, []);

  async function deleteAllNotifications(e) {
    e.preventDefault();
    setIsDeletingNotifications(true);
    try {
      await axios.patch(
        `/user/edit`,
        {
          notifications: [],
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("iwsform-token")),
          },
        }
      );
      setNotifications([]);
      setIsDeletingNotifications(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (isDeletingNotifications) {
    return (
      <div className="mt-5 text-center">Deleting all notifications...</div>
    );
  }
  if (isLoading) {
    return <LoadingIcon />;
  }

  if (notifications.length < 1) {
    return (
      <div className="mt-5 text-center">
        <i
          style={{ fontSize: "4rem" }}
          className="text-muted mb-4 fa fa-envelope"
        ></i>
        <h3>Your inbox is empty</h3>
      </div>
    );
  }

  return (
    <Page title="Notifications">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Notifications</h2>
          {notifications.length > 0 && (
            <form onSubmit={deleteAllNotifications}>
              <button type="submit" className="btn btn-danger btn-sm shadow-sm">
                Delete all
              </button>
            </form>
          )}
        </div>
        <hr />
        {notifications
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((notification, index) => {
            return (
              <div key={index} className="p-3 rounded shadow-sm mb-2 bg-white">
                <h4 className="mb-2">{notification.title} </h4>
                <p className="text-muted">{notification.message}</p>
                <p className="mt-2 mb-0">
                  <small className="text-muted">
                    {new Date(notification.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </small>
                </p>
              </div>
            );
          })}
      </div>
    </Page>
  );
}
