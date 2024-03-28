const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(element, deleteCard, likeCard, openImage) {

  const cardElement =  cardTemplate.querySelector('.places__item').cloneNode('true');

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').alt = element.name;
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


export { content, cardsContainer, createCard, deleteCard, likeCard }