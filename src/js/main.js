"use strict";

import "./../scss/main.scss";
import * as view from "./view.js";

const openBtn = document.querySelector(".button__open");
const storeBtn = document.querySelector(".button__store");

const state = {
  active: false,
  checked: false,
  currentNote: "",
};

const notesList = [
  {
    title: "Test Titel",
    content: "Test Inhalt",
    timeStamp: "gestern",
    id: 101,
  },
  {
    title: "Test Titel2",
    content: "Test Inhalt2",
    timeStamp: "heute",
    id: 102,
  },
];

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
  const wrapper = card.querySelector(".card__wrapper");
  view.changeBackgroundColor(wrapper);
  view.displayInputField();
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
  notesList.push(note);
};

const displayNotesList = function () {
  notesList.forEach((note) => {
    view.buildHtmlMarkup(note);
  });
};

const findNote = function (noteElID) {
  return notesList.find((note) => note.id == noteElID);
};

const createNewEntry = function (e) {
  const note = createNote();
  pushNoteToList(note);

  view.buildHtmlMarkup(note);
  view.closeInputField();
  view.clearInputs();

  state.checked = false;
};

const changeCurrentEntry = function (changedNote) {
  notesList.forEach((note) => {
    if (note.id == state.currentNote.id) {
      note.title = changedNote.title;
      note.content = changedNote.content;
      note.timeStamp = changedNote.timeStamp;
      console.log(changedNote);
    }
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

  if (state.checked && state.active) {
    const note = createNote();
    changeCurrentEntry(note);
    view.updateDOM(note);

    view.closeInputField();
    view.clearInputs();
    state.active = false;
  } else if (state.checked) {
    createNewEntry(e);
  }
});

document.querySelector("#cards").addEventListener("click", (e) => {
  const noteEl = e.target.closest(".card__container");
  if (!noteEl) return;

  setCardActive(noteEl);

  const noteElID = noteEl.dataset.id;
  state.currentNote = findNote(noteElID);
  view.fillInputs(state.currentNote);

  state.active = true;
});
