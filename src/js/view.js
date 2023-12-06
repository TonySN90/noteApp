"use strict";

const cards = document.querySelector("#cards");
const container = document.querySelectorAll(".card__container");
const wrapper = document.querySelectorAll(".card__wrapper");

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
  container.forEach((card) => card.remove());
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
  titleEl.innerHTML = note.title;
  contentEl.innerHTML = note.content;
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

// export const deleteElement = function () {
//   const wrapper = document.querySelectorAll(".card__wrapper");
//   wrapper.forEach((el) => {
//     if (el.classList.contains("active")) {
//       el.parentElement.remove();
//     }
//   });
// };

export const deleteElement = function () {
  const wrapper = document.querySelector(".card__wrapper.active");
  if (wrapper) {
    wrapper.parentElement.remove();
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
  wrapper.forEach((notes) => notes.classList.remove("active"));
  if (note) note.classList.add("active");
};

export const fillInputs = function (note) {
  inputTitle.value = note.title;
  inputContent.value = note.content;
  inputColor.value = note.color;
};
