"use strict";

const cardsEl = document.querySelector("#cards");
const containerEl = document.querySelectorAll(".card__container");
const wrapperEl = document.querySelectorAll(".card__wrapper");

const inputField = document.querySelector("#inputField");
const inputTitle = document.querySelector("#input__title");
const inputContent = document.querySelector("#input__content");
const inputColor = document.querySelector("#input__color");

const alert = document.querySelector(".alert");
const infoText = document.querySelector(".info__text");

export const getInput = function () {
  return {
    inputTitle: document.querySelector("#input__title").value,
    inputContent: document.querySelector("#input__content").value,
    inputColor: document.querySelector("#input__color").value,
  };
};

export const clearInputs = function () {
  inputTitle.value = "";
  inputContent.value = "";
};

export const clearDOM = function () {
  containerEl.forEach((card) => card.remove());
};

export const handleInfo = function (empty) {
  if (empty) infoText.classList.add("hidden");
  if (!empty) infoText.classList.remove("hidden");
};

export const displayAlert = function (text) {
  alert.innerHTML =
    text === "title"
      ? "Gib einen gültigen Titel ein!"
      : "Gib eine gültige Notiz ein!";

  alert.style.opacity = "1";
  setTimeout(() => {
    alert.style.opacity = "0";
  }, 2500);
};

const createDiv = function () {
  return document.createElement("div");
};

const escapeHtml = function (unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const buildHtmlMarkup = function (note) {
  const containerEl = createDiv();
  const wrapperEl = createDiv();
  const colorStripEl = createDiv();
  const contentAreaEl = createDiv();
  const contentEl = createDiv();
  const titleEl = document.createElement("h2");
  const timeStampEl = createDiv();

  containerEl.classList.add("card__container");
  wrapperEl.classList.add("card__wrapper");
  colorStripEl.classList.add("card__wrapper-colorstrip");
  contentAreaEl.classList.add("card__wrapper-contentarea");
  titleEl.classList.add("card__contentarea-title", "truncation");
  contentEl.classList.add("card__contentarea-content", "truncation");
  timeStampEl.classList.add("card__contentarea-timestamp");

  containerEl.dataset.id = note.id;
  colorStripEl.style.backgroundColor = note.color;
  titleEl.innerHTML = escapeHtml(note.title);
  contentEl.innerHTML = escapeHtml(note.content);
  timeStampEl.innerHTML = note.timeStamp;

  containerEl.insertAdjacentElement("afterbegin", wrapperEl);
  wrapperEl.insertAdjacentElement("afterbegin", colorStripEl);
  wrapperEl.insertAdjacentElement("beforeend", contentAreaEl);
  contentAreaEl.insertAdjacentElement("beforeend", titleEl);
  contentAreaEl.insertAdjacentElement("beforeend", contentEl);
  contentAreaEl.insertAdjacentElement("beforeend", timeStampEl);

  cardsEl.insertAdjacentElement("afterbegin", containerEl);
};

export const handleDeleteBtn = function (btn, active) {
  btn.style.display = active ? "block" : "none";
};

export const deleteElement = function () {
  const wrapperEl = document.querySelector(".card__wrapper.active");
  if (wrapperEl) {
    wrapperEl.parentElement.remove();
  }
};

export const displayInputField = function () {
  inputField.style.width = "80%";
  inputField.style.borderLeft = "5px solid #eb4d4b";
};

export const closeInputField = function () {
  inputField.style.width = "0%";
  setTimeout(() => {
    inputField.style.border = "none";
  }, 400);
};

export const changeBackgroundColor = function (note) {
  wrapperEl.forEach((notes) => notes.classList.remove("active"));
  if (note) note.classList.add("active");
};

export const fillInputs = function (note) {
  inputTitle.value = note.title;
  inputContent.value = note.content;
  inputColor.value = note.color;
};
