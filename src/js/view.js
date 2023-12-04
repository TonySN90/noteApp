"use strict";

const inputField = document.querySelector("#inputField");
const cards = document.querySelector("#cards");

// Export Data
export let inputTitle = "";
export let inputContent = "";

export const getInput = function () {
  inputTitle = document.querySelector("#input__title").value;
  inputContent = document.querySelector("#input__content").value;
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

  const contentAreaEl = document.createElement("div");
  contentAreaEl.setAttribute("class", "card__wrapper-contentarea");

  const titleEl = document.createElement("h2");
  titleEl.setAttribute("class", "card__contentarea-title");
  titleEl.innerHTML = note.title;

  const contentEl = document.createElement("div");
  contentEl.setAttribute("class", "card__contentarea-content");
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

    if (titleElement) {
      titleElement.innerHTML = changedNote.title;
    }

    if (contentElement) {
      contentElement.innerHTML = changedNote.content;
    }

    if (timestampElement) {
      timestampElement.innerHTML = changedNote.timeStamp;
    }
  }
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
  card.classList.add("active");
};

export const fillInputs = function (note) {
  console.log();
  document.querySelector("#input__title").value = note.title;
  document.querySelector("#input__content").value = note.content;
};
