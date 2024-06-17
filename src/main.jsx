import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "./index.css";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
