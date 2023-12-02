"use strict";

const inputField = document.querySelector("#inputField");

export const displayInputField = function () {
  inputField.style.width = "80%";
};

export const closeInputField = function () {
  inputField.style.width = "0%";
};
