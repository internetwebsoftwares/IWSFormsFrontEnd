import React, { Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import MainContext from "./MainContext";
import ProtectedRoute from "./components/ProtectedRoute";
import FlashMessage from "./components/FlashMessage";
import Menu from "./components/Menu";
import LoadingIcon from "./components/LoadingIcon";
import AtaShaikhProfile from "./components/AtaShaikhProfile";
const MainArea = React.lazy(() => import("./components/MainArea"));
const Signup = React.lazy(() => import("./components/Signup"));
const Login = React.lazy(() => import("./components/Login"));
const YourForms = React.lazy(() => import("./components/YourForms"));
const FormManage = React.lazy(() => import("./components/FormManage"));
const AboutUs = React.lazy(() => import("./components/AboutUs"));
const Terms = React.lazy(() => import("./components/Terms"));
const ViewForm = React.lazy(() => import("./components/ViewForm"));
const Page404 = React.lazy(() => import("./components/Page404"));
const AccountSecurity = React.lazy(() =>
  import("./components/AccountSecurity")
);
const AdminPanel = React.lazy(() => import("./components/AdminPanel"));
const ViewAnswers = React.lazy(() => import("./components/ViewAnswers"));
const ViewAnswer = React.lazy(() => import("./components/ViewAnswer"));
const ViewReports = React.lazy(() => import("./components/ViewReports"));
const Notifications = React.lazy(() => import("./components/Notifications"));
const Vote = React.lazy(() => import("./components/Vote"));
const VoteResults = React.lazy(() => import("./components/VoteResults"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("iwsform-token"))
  );

  const [flashMessages, setFlashMessages] = useState([]);
  const [flashMessageColor, setFlashMessageColor] = useState("success");

  const [totalNotifications, setTotalNotifications] = useState(
    localStorage.getItem("iwsform-user")
      ? JSON.parse(localStorage.getItem("iwsform-user")).totalNotifications
      : 0
  );

  const [locationToRedirect, setLocationToRedirect] = useState("/");

  function addFlashMessage(msg, color) {
    setFlashMessages((prev) => prev.concat(msg));
    setFlashMessageColor(color);
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        addFlashMessage,
        totalNotifications,
        setTotalNotifications,
        locationToRedirect,
        setLocationToRedirect,
        setIsMenuOpen,
      }}
    >
      <BrowserRouter>
        {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
        <Header />
        <FlashMessage color={flashMessageColor} messages={flashMessages} />
        <Suspense fallback={<LoadingIcon />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/ata-shaikh-profile">
              <AtaShaikhProfile />
            </Route>
            <ProtectedRoute path="/create-form">
              <MainArea />
            </ProtectedRoute>
            <ProtectedRoute path="/create-poll">
              <Vote />
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
            <ProtectedRoute path="/notifications">
              <Notifications />
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
            <ProtectedRoute path="/all/reports">
              <ViewReports />
            </ProtectedRoute>
            <ProtectedRoute path="/:id/vote/results">
              <VoteResults />
            </ProtectedRoute>
            <Route component={Page404} />
          </Switch>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
