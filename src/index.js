import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./Project/App";
import Store from "./Project/Store";
import { Provider } from "react-redux";


ReactDOM.render(
  <>
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>
  ,
  document.getElementById("root")
)


