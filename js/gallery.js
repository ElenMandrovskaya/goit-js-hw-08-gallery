import galleryItems from "./gallery-items.js"

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
}
const galleryItemMarkUp = ({ preview, original, description }) => {
  return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
}
const string = galleryItems.map(galleryItemMarkUp).join('');

let selectedImg = null;

function onClickImg(event) {
  event.preventDefault()
   if (!event.target.classList.contains('gallery__image')) {
    return
  }
  refs.lightbox.classList.add('is-open');
  selectedImg = event.target.dataset.source;
    // console.log(selectedImg)
  refs.lightboxImg.src = selectedImg;
 };

function onClickCloseBtn(event) {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.src = '';
}
function onClickOverlay(event) {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.src = '';
}
function onClickEsc(event) {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.src = '';
}

refs.galleryList.insertAdjacentHTML("beforeend", string); // Рендерит разметку
refs.galleryList.addEventListener('click', onClickImg); 
refs.closeBtn.addEventListener('click', onClickCloseBtn);
refs.lightboxOverlay.addEventListener('click', onClickOverlay);