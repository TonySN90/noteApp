"use strict";

import "./../scss/main.scss";
import * as view from "./view.js";
import * as utils from "./utils.js";

const openBtn = document.querySelector(".button__open");
const storeBtn = document.querySelector(".button__store");
const deleteBtn = document.querySelector(".button__delete");
const backBtn = document.querySelector(".button__back");

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
    color: "#eb4d4b",
    id: 101,
  },
  {
    title: "Test Titel2",
    content: "Test Inhalt2",
    timeStamp: "heute",
    color: "#ebed79",
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
};

const unsetCardActive = function () {
  view.changeBackgroundColor();
};

const createNote = function () {
  let id = Math.trunc(Math.random() * 1000) + 1;
  if (state.active) id = state.currentNote.id;

  return {
    title: view.inputTitle,
    content: view.inputContent,
    timeStamp: utils.createDate(),
    color: view.inputColor,
    id: id,
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

const changeCurrentEntry = function (changedNote) {
  notesList.forEach((note) => {
    if (note.id == state.currentNote.id) {
      note.title = changedNote.title;
      note.content = changedNote.content;
      note.timeStamp = changedNote.timeStamp;
    }
  });
};

const deleteLIstEntry = function () {
  const indexToDelete = notesList.findIndex(
    (note) => note.id === state.currentNote.id
  );
  if (indexToDelete !== -1) {
    notesList.splice(indexToDelete, 1);
  }
};

const init = function () {
  displayNotesList();
};

init();

// Eventlistener --
openBtn.addEventListener("click", () => {
  view.displayInputField();
  view.handleDeleteBtn(deleteBtn, false);
  view.clearInputs();
});

storeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  view.getInput();
  checkInput();

  if (state.checked) {
    const note = createNote();
    if (state.active) {
      changeCurrentEntry(note);
      view.updateDOM(note);
      state.active = false;
    } else {
      pushNoteToList(note);
      view.buildHtmlMarkup(note);
    }

    view.closeInputField();
    state.checked = false;
  }
});

deleteBtn.addEventListener("click", () => {
  state.active = false;
  deleteLIstEntry();
  view.deleteElement(state.currentNote);
  view.closeInputField();
  view.handleDeleteBtn(deleteBtn, state);
});

backBtn.addEventListener("click", () => {
  state.active = false;
  view.closeInputField();
  unsetCardActive();
});

document.querySelector("#cards").addEventListener("click", (e) => {
  const noteEl = e.target.closest(".card__container");
  if (!noteEl) return;

  state.active = true;
  setCardActive(noteEl);
  view.displayInputField();
  view.handleDeleteBtn(deleteBtn, true);

  const noteElID = noteEl.dataset.id;
  state.currentNote = findNote(noteElID);
  view.fillInputs(state.currentNote);
});
