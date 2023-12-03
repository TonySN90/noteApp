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

export const buildHtmlMarkup = function (title, content, timeStamp) {
  const containerEl = document.createElement("div");
  containerEl.setAttribute("class", "card__container");

  const wrapperEl = document.createElement("div");
  wrapperEl.setAttribute("class", "card__wrapper");

  const colorStripEl = document.createElement("div");
  colorStripEl.setAttribute("class", "card__wrapper-colorstrip");

  const contentAreaEl = document.createElement("div");
  contentAreaEl.setAttribute("class", "card__wrapper-contentarea");

  const titleEl = document.createElement("h2");
  titleEl.setAttribute("class", "card__contentarea-title");
  titleEl.innerHTML = title;

  const contentEl = document.createElement("div");
  contentEl.setAttribute("class", "card__contentarea-content");
  contentEl.innerHTML = content;

  const timeStampEl = document.createElement("div");
  timeStampEl.setAttribute("class", "card__contentarea-timestamp");
  timeStampEl.innerHTML = "SA: 03.12.2023 - 00:10";

  containerEl.insertAdjacentElement("afterbegin", wrapperEl);
  wrapperEl.insertAdjacentElement("afterbegin", colorStripEl);
  wrapperEl.insertAdjacentElement("beforeend", contentAreaEl);
  contentAreaEl.insertAdjacentElement("beforeend", titleEl);
  contentAreaEl.insertAdjacentElement("beforeend", contentEl);
  contentAreaEl.insertAdjacentElement("beforeend", timeStampEl);

  cards.insertAdjacentElement("afterbegin", containerEl);
};

export const displayInputField = function () {
  inputField.style.width = "80%";
};

export const closeInputField = function () {
  inputField.style.width = "0%";
};
