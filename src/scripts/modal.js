// Функция открытия модального окна
function openModal(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {popup.classList.add('popup_is-opened')}, 0);
  document.addEventListener('keydown', closeModalByEsc); 
}

// Функция закрытия модального окна
function closeModal(popup) {
  setTimeout(() => {popup.classList.remove('popup_is-animated')}, 600);
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc); 
}

// Функция закрытия модального окна при нажатии на Escape
function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

// Функция закрытия модального окна при нажатии на overlay
function closeModalByClickOverlay(evt, popup) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(popup);
  }
}

export { openModal, closeModal, closeModalByEsc, closeModalByClickOverlay }