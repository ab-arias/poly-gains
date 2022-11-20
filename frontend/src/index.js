import React from "react";
import ReactDOM from "react-dom";
import MyApp from "./App";
import "./style.css";

window.$BACKEND_URI = "https://poly-gains.azurewebsites.net/";
// window.$BACKEND_URI = "http://localhost:4000/";

ReactDOM.render(<MyApp />, document.getElementById("root"));
