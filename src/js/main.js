"use strict";

import "./../scss/main.scss";
import * as view from "./view.js";

const openBtn = document.querySelector(".button__open");
const storeBtn = document.querySelector(".button__store");

const state = {
  clicked: false,
  validated: false,
  currentNote: {
    noteTitle: "",
    noteContent: "",
  },
  allNotes: {},
};

const validateInput = function () {
  if (view.inputTitle === "") {
    console.log("trage Titel ein");
  } else if (view.inputContent === "") {
    console.log("trage Content ein");
  } else {
    state.currentNote.noteTitle = view.inputTitle;
    state.currentNote.noteContent = view.inputContent;
    state.validated = true;
  }
};

// Eventlistener --

openBtn.addEventListener("click", view.displayInputField);

storeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  view.getInput();
  validateInput();
  if (state.validated) {
    view.buildHtmlMarkup(
      state.currentNote.noteTitle,
      state.currentNote.noteContent
    );
    view.closeInputField();
  }
});
