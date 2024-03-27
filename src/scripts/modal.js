import { editProfilePopup, nameInput, jobInput, setDefaultValues } from './index';

// Функция открытия модального окна
function openModal(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {popup.classList.add('popup_is-opened')}, 0);
}

// Функция закрытия модального окна
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {popup.classList.remove('popup_is-animated')}, 600);
}

// Функция закрытия модального окна при нажатии на Escape
function closeModalByEsc(evt, popup) {
  if (evt.key === 'Escape') {
    closeModal(popup);
    if (popup == editProfilePopup) {
      setDefaultValues(nameInput, jobInput);
    }
  }
}

// Функция закрытия модального окна при нажатии на overlay
function closeModalByClickOverlay(evt, popup) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(popup);
    if (popup == editProfilePopup) {
      setDefaultValues(nameInput, jobInput);
    }
  }
}

export { openModal, closeModal, closeModalByEsc, closeModalByClickOverlay }