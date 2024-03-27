import { openModal } from "./modal";

const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const imagePopup = document.querySelector('.popup_type_image');
const openImagePopup = document.querySelector('.popup__content_content_image');

// Функция создания карточки
function createCard(element, deleteCard, likeCard, openImage) {

  const cardElement =  cardTemplate.querySelector('.places__item').cloneNode('true');

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() { 
    deleteCard(cardElement)
  });

  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardElement.querySelector('.card__image').addEventListener('click', function() { 
    openImage(cardElement)
  });

  return cardElement;
};

//Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
};

// Функция установки лайка карточки
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Функция открытия изображения во весь экран
function openImage(cardElement) {
  openModal(imagePopup);
  openImagePopup.querySelector('.popup__image').src = cardElement.querySelector('.card__image').src;
  openImagePopup.querySelector('.popup__caption').textContent = cardElement.querySelector('.card__title').textContent;
}

export { content, cardsContainer, cardTemplate, imagePopup, createCard, deleteCard, likeCard, openImage }