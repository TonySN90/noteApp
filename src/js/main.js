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

const setCardToActive = function (card) {
  const cards = document.querySelectorAll(".card__container");
  cards.forEach((card) => card.classList.remove("active"));
  // cardEl.classList.remove("active");

  console.log(card);
  card.classList.add("active");
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
  view.clearInputs();
  state.validated = false;
});

document.querySelector("#cards").addEventListener("click", (e) => {
  const card = e.target.closest(".card__container");
  if (!card) return;

  setCardToActive(card);

  const cardTitle = card.querySelector(".card__contentarea-title").textContent;
  const cardContent = card.querySelector(
    ".card__contentarea-content"
  ).textContent;

  console.log(cardTitle, cardContent);
});
