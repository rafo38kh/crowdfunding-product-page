const modalCloseBtn = document.querySelector(".js-modal-close");
const continueBtn = document.querySelectorAll(".js-continue");
const bookmark = document.querySelector(".js-bookmark");
const modal = document.querySelector(".modal__wrapper");
const radioBtn = document.querySelectorAll(".js-radio");
const select = document.querySelectorAll(".js-select");
const pledge = document.querySelectorAll(".js-pledge");
const burger = document.querySelector(".js-burger");
const back = document.querySelector(".js-back");
const nav = document.querySelector(".js-nav");
const borderGreen = document.querySelectorAll(".border");
const input = document.querySelectorAll(".js-input");

const modalOpenBtn = [back, ...select];

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
}

function closeModal() {
  modal.classList.remove("modal__active");
  radioBtn.forEach((radio) => (radio.checked = false));
  borderGreen.forEach((box) => box.classList.remove("box__active"));
  pledge.forEach((el) => el.classList.remove("pledge__active"));
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
  const close = e.target.parentElement.parentElement.nextElementSibling;
  const box = e.target.parentElement.parentElement.parentElement;

  borderGreen.forEach((box) => box.classList.remove("box__active"));

  if (box.classList.contains("border")) {
    box.classList.add("box__active");
  }

  pledge.forEach((el) => el.classList.remove("pledge__active"));

  if (!close.classList.contains("pledge__active")) {
    close.classList.add("pledge__active");
  }
}

function checkInput() {}

burger.addEventListener("click", navigation);
bookmark.addEventListener("click", bookmarkBtn);
modalOpenBtn.forEach((btn) => btn.addEventListener("click", openModal));
modalCloseBtn.addEventListener("click", closeModal);
radioBtn.forEach((radio) => radio.addEventListener("click", pledgeActive));
