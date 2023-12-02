"use strict";

const inputField = document.querySelector("#inputField");
const cards = document.querySelector("#cards");

export const buildHtmlMarkup = function () {
  const container = document.createElement("div");
  container.setAttribute("class", "card__container");

  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "card__wrapper");

  const colorStrip = document.createElement("div");
  colorStrip.setAttribute("class", "card__wrapper-colorstrip");

  const contentArea = document.createElement("div");
  contentArea.setAttribute("class", "card__wrapper-contentarea");

  const title = document.createElement("h2");
  title.setAttribute("class", "card__contentarea-title");
  title.innerHTML = "Das ist eine Test-Titel, erstellt aus JS!";

  const content = document.createElement("div");
  content.setAttribute("class", "card__contentarea-content");
  content.innerHTML = "Das ist ein Test-Inhalt, erstellt aus JS!";

  const timeStamp = document.createElement("div");
  timeStamp.setAttribute("class", "card__contentarea-timestamp");
  timeStamp.innerHTML = "SA: 03.12.2023 - 00:10";

  container.insertAdjacentElement("afterbegin", wrapper);
  wrapper.insertAdjacentElement("afterbegin", colorStrip);
  wrapper.insertAdjacentElement("beforeend", contentArea);
  contentArea.insertAdjacentElement("beforeend", title);
  contentArea.insertAdjacentElement("beforeend", content);
  contentArea.insertAdjacentElement("beforeend", timeStamp);

  cards.insertAdjacentElement("afterbegin", container);
};

export const displayInputField = function () {
  inputField.style.width = "80%";
};

export const closeInputField = function () {
  inputField.style.width = "0%";
};
