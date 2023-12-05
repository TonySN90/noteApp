"use strict";

const inputField = document.querySelector("#inputField");
const cards = document.querySelector("#cards");
const textArea = document.querySelector("#input__content");

// Export Data
export let inputTitle = "";
export let inputContent = "";
export let inputColor = "";

export const getInput = function () {
  inputTitle = document.querySelector("#input__title").value;
  inputContent = document.querySelector("#input__content").value;
  inputColor = document.querySelector("#input__color").value;
};

export const clearInputs = function () {
  document.querySelector("#input__title").value = "";
  document.querySelector("#input__content").value = "";
};

export const buildHtmlMarkup = function (note) {
  const containerEl = document.createElement("div");
  containerEl.setAttribute("class", "card__container");
  containerEl.dataset.id = note.id;

  const wrapperEl = document.createElement("div");
  wrapperEl.setAttribute("class", "card__wrapper");

  const colorStripEl = document.createElement("div");
  colorStripEl.setAttribute("class", "card__wrapper-colorstrip");
  colorStripEl.style.backgroundColor = note.color;

  const contentAreaEl = document.createElement("div");
  contentAreaEl.setAttribute("class", "card__wrapper-contentarea");

  const titleEl = document.createElement("h2");
  titleEl.classList.add("card__contentarea-title", "truncation");
  titleEl.innerHTML = note.title;

  const contentEl = document.createElement("div");
  contentEl.classList.add("card__contentarea-content", "truncation");
  contentEl.innerHTML = note.content;

  const timeStampEl = document.createElement("div");
  timeStampEl.setAttribute("class", "card__contentarea-timestamp");
  timeStampEl.innerHTML = note.timeStamp;

  containerEl.insertAdjacentElement("afterbegin", wrapperEl);
  wrapperEl.insertAdjacentElement("afterbegin", colorStripEl);
  wrapperEl.insertAdjacentElement("beforeend", contentAreaEl);
  contentAreaEl.insertAdjacentElement("beforeend", titleEl);
  contentAreaEl.insertAdjacentElement("beforeend", contentEl);
  contentAreaEl.insertAdjacentElement("beforeend", timeStampEl);

  cards.insertAdjacentElement("afterbegin", containerEl);
};

export const handleDeleteBtn = function (btn, active) {
  btn.style.display = active ? "block" : "none";
};

export const deleteElement = function () {
  const noteEl = document.querySelectorAll(".card__wrapper");
  noteEl.forEach((el) => {
    if (el.classList.contains("active")) {
      el.parentElement.remove();
    }
  });
};

export const updateDOM = function (changedNote) {
  const activeNote = document.querySelector(".active");

  if (activeNote) {
    const titleElement = activeNote.querySelector(".card__contentarea-title");
    const contentElement = activeNote.querySelector(
      ".card__contentarea-content"
    );
    const timestampElement = activeNote.querySelector(
      ".card__contentarea-timestamp"
    );
    const colorElement = activeNote.querySelector(".card__wrapper-colorstrip");

    if (titleElement) {
      titleElement.innerHTML = changedNote.title;
    }

    if (contentElement) {
      contentElement.innerHTML = changedNote.content;
    }

    if (timestampElement) {
      timestampElement.innerHTML = changedNote.timeStamp;
    }
    if (colorElement) {
      colorElement.style.backgroundColor = changedNote.color;
    }
  }

  activeNote.classList.remove("active");
};

export const displayInputField = function () {
  inputField.style.width = "80%";
};

export const closeInputField = function () {
  inputField.style.width = "0%";
};

export const changeBackgroundColor = function (card) {
  const cards = document.querySelectorAll(".card__wrapper");
  cards.forEach((cards) => cards.classList.remove("active"));

  if (card) card.classList.add("active");
};

export const fillInputs = function (note) {
  console.log();
  document.querySelector("#input__title").value = note.title;
  document.querySelector("#input__content").value = note.content;
};
