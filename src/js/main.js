"use strict";

import "./../scss/main.scss";
import * as view from "./view.js";
import * as utils from "./utils.js";
import * as config from "./config.js";
import { v4 as uuidv4 } from "uuid";

const openBtn = document.querySelector(".button__open");
const storeBtn = document.querySelector(".button__store");
const deleteBtn = document.querySelector(".button__delete");
const backBtn = document.querySelector(".button__back");

const state = {
  active: false,
  checked: false,
  currentNote: "",
};

let notesList = [];

const checkInput = function () {
  const inputValues = view.getInput();
  const { inputTitle, inputContent } = inputValues;

  if (inputTitle === "") {
    view.displayAlert("title");
  } else if (inputContent === "") {
    view.displayAlert("content");
  } else {
    state.checked = true;
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
  checkInput(inputTitle, inputContent);

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
  view.getInput();
  const inputData = checkInput();

  if (state.checked) {
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
    state.checked = false;
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

// To Do

// inputArea border problem
