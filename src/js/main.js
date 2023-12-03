"use strict";

import "./../scss/main.scss";
import * as view from "./view.js";

const openBtn = document.querySelector(".button__open");
const storeBtn = document.querySelector(".button__store");

const state = {
  clicked: false,
  checked: false,
  // currentNote: {
  //   noteTitle: "",
  //   noteContent: "",
  // },
  notesList: [],
};

const checkInput = function () {
  if (view.inputTitle === "") {
    console.log("trage Titel ein");
  } else if (view.inputContent === "") {
    console.log("trage Content ein");
  } else {
    state.checked = true;
  }
};

const setCardActive = function (card) {
  view.changeBackgroundColor(card);
  view.displayInputField();
  // view.fillInputs();
};

const createNote = function () {
  return {
    title: view.inputTitle,
    content: view.inputContent,
    timeStamp: "Heute",
    id: Math.trunc(Math.random() * 100) + 1,
  };
};

const pushNoteToList = function (note) {
  state.notesList.push(note);
};

// Eventlistener --
openBtn.addEventListener("click", view.displayInputField);

storeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  view.getInput();
  checkInput();
  if (state.checked) {
    const note = createNote();

    view.buildHtmlMarkup(note);
    pushNoteToList(note);
    view.closeInputField();
    view.clearInputs();

    state.checked = false;
    console.log(state);
  }
});

document.querySelector("#cards").addEventListener("click", (e) => {
  const card = e.target.closest(".card__wrapper");
  if (!card) return;
  setCardActive(card);
});
