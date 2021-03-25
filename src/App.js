import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import MainArea from "./components/MainArea";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./components/Home";
import MainContext from "./MainContext";
import ProtectedRoute from "./components/ProtectedRoute";
import YourForms from "./components/YourForms";
import FormManage from "./components/FormManage";
import AboutUs from "./components/AboutUs";
import Terms from "./components/Terms";
import ViewForm from "./components/ViewForm";
import FlashMessage from "./components/FlashMessage";
import Page404 from "./components/Page404";
import AccountSecurity from "./components/AccountSecurity";
import AdminPanel from "./components/AdminPanel";
import ViewAnswers from "./components/ViewAnswers";
import ViewAnswer from "./components/ViewAnswer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("iwsform-token"))
  );

  const [flashMessages, setFlashMessages] = useState([]);
  const [flashMessageColor, setFlashMessageColor] = useState("success");

  function addFlashMessage(msg, color) {
    setFlashMessages((prev) => prev.concat(msg));
    setFlashMessageColor(color);
  }

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        addFlashMessage,
      }}
    >
      <BrowserRouter>
        <Header />
        <FlashMessage color={flashMessageColor} messages={flashMessages} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <ProtectedRoute path="/create-form">
            <MainArea />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/about-us">
            <AboutUs />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <ProtectedRoute path="/your-forms">
            <YourForms />
          </ProtectedRoute>
          <ProtectedRoute path="/form/:id/answers">
            <ViewAnswers />
          </ProtectedRoute>
          <ProtectedRoute path="/:id/answer">
            <ViewAnswer />
          </ProtectedRoute>
          <ProtectedRoute path="/form/:id/manage">
            <FormManage />
          </ProtectedRoute>
          <ProtectedRoute path="/form/:id">
            <ViewForm />
          </ProtectedRoute>
          <ProtectedRoute path="/account-security">
            <AccountSecurity />
          </ProtectedRoute>
          <ProtectedRoute path="/admin-dashboard">
            <AdminPanel />
          </ProtectedRoute>
          <Route component={Page404} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
