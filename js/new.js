import galleryItems from "./gallery-items.js";
const refs = {
  galleryList: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalImg: document.querySelector(".lightbox__image"),
};
let activeIndex = null;
const markup = galleryItems.map(({ preview, original, description }) => {
  return `<li class="gallery__item">
    <a class="gallery__link" href=${original}>
     <img class="gallery__image" src=${preview} data-source=${original} alt=${description}>
    </a>
  </li>`;
});
refs.galleryList.insertAdjacentHTML("beforeend", markup.join(""));
refs.galleryList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.localName !== "img") {
    return;
  }
  markup.forEach((el, ind) => {
    if (el.includes(e.target.src)) {
      activeIndex = ind;
    }
  });
  refs.modal.classList.add("is-open");
  // refs.modalImg.setAttribute('src', e.target.datase.source)
  refs.modalImg.src = e.target.dataset.source;
});
window.addEventListener("keyup", (e) => {
  if (e.key !== "Escape") {
    return;
  }
  refs.modalImg.src = "";
  refs.modal.classList.remove("is-open");
});
refs.modal.addEventListener("click", (e) => {
  if (e.target.localName !== "img") {
    refs.modalImg.src = "";
    refs.modal.classList.remove("is-open");
  }
});
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" && activeIndex < galleryItems.length - 1) {
    activeIndex += 1;
    refs.modalImg.src = galleryItems[activeIndex].original;
    return;
  }
  if (e.key === "ArrowLeft" && activeIndex > 0) {
    activeIndex -= 1;
    refs.modalImg.src = galleryItems[activeIndex].original;
  }
});