"use strict";

import "./../scss/main.scss";
import * as view from "./view.js";

const openBtn = document.querySelector(".button__open");
const storeBtn = document.querySelector(".button__store");

const state = {
  clicked: false,
  checked: false,
  notesList: [
    {
      title: "Test Titel",
      content: "Test Inhalt",
      timeStamp: "gestern",
      id: Math.trunc(Math.random() * 100) + 1,
    },
    {
      title: "Test Titel2",
      content: "Test Inhalt2",
      timeStamp: "heute",
      id: Math.trunc(Math.random() * 100) + 1,
    },
  ],
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

const displayNotesList = function () {
  state.notesList.forEach((note) => {
    view.buildHtmlMarkup(note);
  });
};

const init = function () {
  displayNotesList();
};

init();

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
  }
});

document.querySelector("#cards").addEventListener("click", (e) => {
  const card = e.target.closest(".card__wrapper");
  if (!card) return;
  setCardActive(card);
});
