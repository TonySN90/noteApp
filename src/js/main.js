"use strict";

import "./../scss/main.scss";
import * as view from "./view.js";

const openInputFieldBtn = document.querySelector(".button__open");
const storeBtn = document.querySelector(".button__store");

const state = {};

openInputFieldBtn.addEventListener("click", view.displayInputField);
storeBtn.addEventListener("click", view.closeInputField);
