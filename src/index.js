import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

// Axios.defaults.baseURL = "https://iws-forms.herokuapp.com";
Axios.defaults.baseURL ="https://calm-pear-dalmatian-kit.cyclic.app";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
