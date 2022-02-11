const modalCloseBtn = document.querySelector(".js-modal-close");
const continueBtn = document.querySelectorAll(".js-continue");
const amountNum = document.querySelector(".js-amount");
const backerNum = document.querySelector(".js-backers");
const progressBar = document.querySelector(".js-progress");
const bookmark = document.querySelector(".js-bookmark");
const modal = document.querySelector(".modal__wrapper");
const radioBtn = document.querySelectorAll(".js-radio");
const select = document.querySelectorAll(".js-select");
const pledge = document.querySelectorAll(".js-pledge");
const pledgeText = document.querySelectorAll(".js-pledge-text");
const burger = document.querySelector(".js-burger");
const back = document.querySelector(".js-back");
const nav = document.querySelector(".js-nav");
const borderGreen = document.querySelectorAll(".border");
const inputs = document.querySelectorAll(".js-input");
const smallModal = document.querySelector(".js-small");
const bigModal = document.querySelector(".js-big");
const modalBg = document.querySelector(".js-modal");
const gotItBtn = document.querySelector(".js-gotIt");

const modalOpenBtn = [back, ...select];

let inputAmount = 0;

const getNumber = (text) => +text.textContent.match(/\d/g).join("");

const formatNumber = (amount, num) =>
  `$${Math.trunc(+amount + getNumber(num)).toLocaleString("en")}`;

const calcProgresBarWidth = function (total, target) {
  const percent = (total / target) * 100;
  return percent <= 100 ? percent : 100;
};

function navigation() {
  if (!nav.classList.contains("navigation__active")) {
    nav.classList.add("navigation__active");
    burger.firstElementChild.src = "images/icon-close-menu.svg";
  } else {
    nav.classList.remove("navigation__active");
    burger.firstElementChild.src = "images/icon-hamburger.svg";
  }
}

function openModal() {
  modal.classList.add("modal__active");

  bigModal.classList.add("modal__active");

  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("modal__active");

  radioBtn.forEach((radio) => (radio.checked = false));

  borderGreen.forEach((box) => box.classList.remove("box__active"));

  pledge.forEach((el) => el.classList.remove("pledge__active"));

  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("input__error");
  });

  pledgeText.forEach((txt) => txt.classList.remove("text__error"));

  document.body.style.overflow = "";
}

function bookmarkBtn() {
  if (!bookmark.classList.contains("bookmarked")) {
    bookmark.classList.add("bookmarked");
    bookmark.lastElementChild.textContent = "Bookmarked";
  } else {
    bookmark.classList.remove("bookmarked");
    bookmark.lastElementChild.textContent = "Bookmark";
  }
}

function pledgeActive(e) {
  const close = e.target.parentElement.parentElement;

  borderGreen.forEach((box) => box.classList.remove("box__active"));

  if (close.parentElement.classList.contains("border")) {
    close.parentElement.classList.add("box__active");
  }

  pledge.forEach((el) => el.classList.remove("pledge__active"));

  if (!close.nextElementSibling.classList.contains("pledge__active")) {
    close.nextElementSibling.classList.add("pledge__active");
  }
}

const setErrorState = function (inputs, item, msg) {
  inputs.forEach((input) => input.classList.add("input__error"));
  item.classList.add("text__error");
  item.textContent = msg;
};

const setSuccessState = function (inputs, item) {
  inputs.forEach((input) => input.classList.remove("input__error"));
  item.classList.remove("text__error");
  item.textContent = "Enter your pledge";
};

const validateInputs = function (e) {
  const { value, parentElement, id } = e.target;
  const errorText = parentElement.previousElementSibling;
  const regExp = {
    zero: /^0\d+/g,
    letter: /[a-zA-Z,/<>\?;':""[\]\\{}\|`~!@#\$%\^&\*()_=\+\-]+/g,
  };

  if (value === "0" || regExp.zero.test(value)) {
    setErrorState(inputs, errorText, "Cannot be zero or start with zero");
  } else if (value > 999999) {
    setErrorState(inputs, errorText, "WTF!!! WHO ARE YOU???");
  } else if (value < 0) {
    setErrorState(inputs, errorText, "Cannot be negative");
  } else if (regExp.letter.test(value)) {
    setErrorState(inputs, errorText, "Cannot be a letter or special character");
  } else if (value.split(/[\.]/).length > 2) {
    setErrorState(inputs, errorText, "Can't have two dots");
  } else if (id === "amount-25" && value < 25 && value !== "") {
    setErrorState(inputs, errorText, "Cannot be less than $25");
  } else if (id === "amount-75" && value < 75 && value !== "") {
    setErrorState(inputs, errorText, "Cannot be less than $75");
  } else {
    setSuccessState(inputs, errorText);
    inputAmount = value;
  }
};

const addNumbersAndProgressBar = function () {
  if ([...inputs].some((input) => input.classList.contains("input__error")))
    return;

  amountNum.textContent = formatNumber(inputAmount, amountNum);
  backerNum.textContent = (getNumber(backerNum) + 1).toLocaleString("en");

  bigModal.classList.remove("modal__active");
  smallModal.classList.add("modal__active");

  document.body.style.overflow = "";

  progressBar.style.width = `${calcProgresBarWidth(
    getNumber(amountNum),
    100000
  )}%`;
};

burger.addEventListener("click", navigation);

bookmark.addEventListener("click", bookmarkBtn);

modalOpenBtn.forEach((btn) => btn.addEventListener("click", openModal));

modalCloseBtn.addEventListener("click", closeModal);

radioBtn.forEach((radio) => radio.addEventListener("click", pledgeActive));

inputs.forEach((input) => input.addEventListener("input", validateInputs));

continueBtn.forEach((btn) =>
  btn.addEventListener("click", addNumbersAndProgressBar)
);

gotItBtn.addEventListener("click", () => {
  modalBg.classList.remove("modal__active");
  smallModal.classList.remove("modal__active");
  document.body.style.overflow = "";
  closeModal();
});

window.addEventListener("load", closeModal);
