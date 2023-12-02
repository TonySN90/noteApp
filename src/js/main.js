"use strict";

import "./../scss/main.scss";
import * as view from "./view.js";

const openBtn = document.querySelector(".button__open");
const storeBtn = document.querySelector(".button__store");

const state = {};

openBtn.addEventListener("click", view.displayInputField);
storeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  view.buildHtmlMarkup();
  view.closeInputField();
});
