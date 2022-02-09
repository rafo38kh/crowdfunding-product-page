const burger = document.querySelector(".js-burger");
const back = document.querySelector(".js-back");
const bookmark = document.querySelector(".js-bookmark");
const select = document.querySelectorAll(".js-select");
const modalClose = document.querySelector(".js-modal-close");
const continueBtn = document.querySelectorAll(".js-continue");
const nav = document.querySelector(".js-nav");
const modal = document.querySelector(".modal__wrapper");
const modalBtn = [back, ...select];

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

function bookmarkBtn() {
  if (!bookmark.classList.contains("bookmarked")) {
    bookmark.classList.add("bookmarked");
    bookmark.lastElementChild.textContent = "Bookmarked";
  } else {
    bookmark.classList.remove("bookmarked");
    bookmark.lastElementChild.textContent = "Bookmark";
  }
}

burger.addEventListener("click", navigation);
modalBtn.forEach((btn) => btn.addEventListener("click", openModal));
bookmark.addEventListener("click", bookmarkBtn);
