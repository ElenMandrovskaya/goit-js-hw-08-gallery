import galleryItems from "./gallery-items.js"

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  img: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('.lightbox__overlay'),
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
  refs.img.src = selectedImg;
 };

function closeModal(event) {
  refs.lightbox.classList.remove('is-open');
  refs.img.src = '';
 }
function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function changeLightboxImage(event) {
  const pressRight = event.code === 'ArrowRight';
  const pressLeft = event.code === 'ArrowLeft';
  let currentImage = refs.img.src; 

  galleryItems.forEach((item, index, images) => {
    let indexImg = index

    if (pressRight && refs.img.src === item.original) {
      indexImg += 1
      currentImage =  images[indexImg].original
    }

    if (pressLeft && refs.img.src === item.original) {
      indexImg -= 1
      currentImage =  images[indexImg].original
    }
  });
  if (refs.img.src !== currentImage) {
    refs.img.src = currentImage;
  }
}




refs.galleryList.insertAdjacentHTML("beforeend", string); // Рендерит разметку
refs.galleryList.addEventListener('click', onClickImg); // открывает модалку при клике на img
refs.closeBtn.addEventListener('click', closeModal); // заккрывает модалку при клике на closeBtn
refs.overlay.addEventListener('click', closeModal); // заккрывает модалку при клике на overlay
  window.addEventListener('keydown', closeModalByEsc); // заккрывает модалку при нажатии на ESC
  window.addEventListener('keydown', changeLightboxImage); // перелистывание изображений клавишами 