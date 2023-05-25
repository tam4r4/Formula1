import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/styles.css";

var root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App title="Title from index" content="Content from index" number={10} />);