import { galleryItems } from './gallery-items.js';

const imagesContainer = document.querySelector('.gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);
imagesContainer.insertAdjacentHTML('beforeend', galleryMarkup);

imagesContainer.addEventListener('click', clickByGalleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
    `;
  }).join('');
}

let instance;
const visible = basicLightbox.visible();

function clickByGalleryMarkup(event) {
  event.preventDefault();
  
  const imageEl = event.target;

  if (imageEl.nodeName !== 'IMG') {
    return
  };

  imageEl.src = imageEl.dataset.source;
  const getOriginalImageEl = imageEl.src;
  const descriptionImageEl = imageEl.alt;

  instance = basicLightbox.create(`
    <div class="modal"> <img src = ${getOriginalImageEl} alt =${descriptionImageEl} /> </div>`);

  instance.show();

  if (!visible) {
    window.removeEventListener("keydown", onCloseModal);
  }
  window.addEventListener("keydown", onCloseModal);
}

function onCloseModal(event) {
  if (event.code === 'Escape') {
    window.removeEventListener("keydown", onCloseModal);
    instance.close();
}
}

