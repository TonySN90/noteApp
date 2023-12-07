"use strict";

import "./../scss/main.scss";
import * as view from "./view.js";
import * as utils from "./utils.js";
import * as config from "./config.js";
import { v4 as uuidv4 } from "uuid";

const openBtn = document.querySelector(".button--open");
const storeBtn = document.querySelector(".button--store");
const deleteBtn = document.querySelector(".button--delete");
const backBtn = document.querySelector(".button--back");

const state = {
  active: false,
  valid: false,
  currentNote: "",
};

let notesList = [];

const processInputValues = function (inputValues) {
  const { inputTitle, inputContent } = inputValues;

  // The string is empty or consists only of spaces.
  const pattern = /^\s*$/;

  if (pattern.test(inputTitle)) {
    view.displayAlert("title");
  } else if (pattern.test(inputContent)) {
    view.displayAlert("content");
  } else {
    state.valid = true;
  }

  return inputValues;
};

const setCardActive = function (card) {
  const wrapper = card.querySelector(".card__wrapper");
  view.changeBackgroundColor(wrapper);
};

const unsetCardActive = function () {
  view.changeBackgroundColor();
};

const createNote = function (inputData) {
  const { inputTitle, inputContent, inputColor } = inputData;
  processInputValues(inputTitle, inputContent);

  let newNoteId = Math.trunc(Math.random() * 1000) + 1;
  if (state.active) newNoteId = state.currentNote.id;

  return {
    title: inputTitle,
    content: inputContent,
    color: inputColor,
    timeStamp: utils.createDate(),
    id: uuidv4(),
  };
};

const pushNoteToList = function (note) {
  notesList.push(note);
};

const displayNotesList = function () {
  view.clearDOM();
  notesList.forEach((note) => {
    view.buildHtmlMarkup(note);
  });
};

const findNote = function (noteElID) {
  return notesList.find((note) => note.id == noteElID);
};

const deleteLIstEntry = function () {
  const indexToDelete = notesList.findIndex(
    (note) => note.id === state.currentNote.id
  );
  if (indexToDelete !== -1) {
    notesList.splice(indexToDelete, 1);
  }
};

const safeToLocalStorage = function () {
  localStorage.setItem(config.STORAGE_KEY, JSON.stringify(notesList));
};

const getListFromStorage = function () {
  const storageList = JSON.parse(localStorage.getItem(config.STORAGE_KEY));
  if (storageList) notesList = storageList;
};

const init = function () {
  getListFromStorage();
  view.handleInfo(notesList.length !== 0);
  displayNotesList();
};

init();

// Eventlistener ------------------------------------

openBtn.addEventListener("click", () => {
  view.displayInputField();
  view.handleDeleteBtn(deleteBtn, false);
  view.clearInputs();
});

storeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const inputValues = view.getInput();
  const inputData = processInputValues(inputValues);

  if (state.valid) {
    const note = createNote(inputData);

    if (state.active) {
      deleteLIstEntry();
      view.deleteElement(state.currentNote);

      pushNoteToList(note);
      view.buildHtmlMarkup(note);
      state.active = false;
    } else {
      pushNoteToList(note);
      view.buildHtmlMarkup(note);
    }

    view.closeInputField();
    state.valid = false;
    view.handleInfo(notesList.length !== 0);
    safeToLocalStorage();
  }
});

deleteBtn.addEventListener("click", () => {
  state.active = false;
  deleteLIstEntry();
  view.deleteElement(state.currentNote);
  view.closeInputField();
  view.handleDeleteBtn(deleteBtn, state);
  view.handleInfo(notesList.length !== 0);
  safeToLocalStorage();
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
  safeToLocalStorage();
});
