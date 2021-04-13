import galleryItems from "./gallery-items.js"

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  img: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('.lightbox__overlay'),
}
// ========= добавляет разметку элементов в галлерее ============
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

// ========= Рендерит разметку ============
refs.galleryList.insertAdjacentHTML("beforeend", string); 


// ========= функция для открытия модалки по клику на изображение ========
let selectedImg = null;
function onClickImg(event) {
  event.preventDefault()
   if (!event.target.classList.contains('gallery__image')) {
    return
  }
  refs.lightbox.classList.add('is-open');
  // selectedImg = event.target.dataset.source;
  // refs.img.src = selectedImg;
  refs.img.src = event.target.dataset.source;
 };

 // ========== функция для закрытия модалки ==========
function closeModal(event) {
  refs.lightbox.classList.remove('is-open');
  refs.img.src = '';
  refs.img.alt = '';
}
 
// ========== функция для закрытия модалки клавишей ESC ==========
function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
// ========= функция для пролистывания изображений в модалке =========
let activeIndex = null;
function changeImage(event)
{
  if (event.key === "ArrowRight" && activeIndex < galleryItems.length - 1) {
    activeIndex += 1;
    refs.img.src = galleryItems[activeIndex].original;
    return;
  }
  if (event.key === "ArrowLeft" && activeIndex > 0) {
    activeIndex -= 1;
    refs.img.src = galleryItems[activeIndex].original;
  }}

// ========= функция для пролистывания изображений в модалке (вариант 2) =========
// const images = galleryItems.map((el) => el.original)
// let currentImg = 0
// function changeImage(event) {
//   if (event.code === 'ArrowRight') {
//     if (currentImg === images.length - 1) {
//       return
//     } else {
//       currentImg += 1;
//     }
//     refs.img.src = images[currentImg]
//     refs.img.alt = galleryItems[currentImg].description
//     }
//   if (event.code === 'ArrowLeft') {
//     if (currentImg === 0) {
//       return
//     } else {
//       currentImg -= 1;
//     }
//     refs.img.src = images[currentImg]
//     refs.img.alt = galleryItems[currentImg].description
//   }
// }
// ========= функция для пролистывания изображений в модалке (вариант 3) =========
// function changeImage(event) {
//   const pressRight = event.code === 'ArrowRight';
//   const pressLeft = event.code === 'ArrowLeft';
//   let currentImage = refs.img.src; 

//   galleryItems.forEach((el, index, images) => {
//     const nextImg = images[index + 1];
//     const prevImg = images[index - 1];
//     if (pressRight && nextImg && refs.img.src === el.original) {
//       currentImage = nextImg.original;
//     }

//     if (pressLeft && prevImg && refs.img.src === el.original) {
//       currentImage = prevImg.original;
//     }
//   });
//   if (refs.img.src !== currentImage) {
//     refs.img.src = currentImage;
//   }
// }

refs.galleryList.addEventListener('click', onClickImg); // добавляет слушатель на клик по изображению
refs.closeBtn.addEventListener('click', closeModal); // добавляет слушатель на closeBtn
refs.overlay.addEventListener('click', closeModal); // добавляет слушатель на overlay
window.addEventListener('keydown', closeModalByEsc); // добавляет слушатель на клавишу ESC
window.addEventListener('keydown', changeImage); // добавляет слушатель на < > 