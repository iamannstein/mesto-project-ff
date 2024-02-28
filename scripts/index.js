const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const deleteButton = cardTemplate.querySelector('.card__delete-button')

initialCards.forEach((el) => {
  createCard(el, deleteCard);
});

function deleteCard(e) {
  e.target.parentElement.remove();
} 

function createCard(element, deleteCard) {

  const cardElement =  cardTemplate.querySelector('.places__item').cloneNode('true');

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  cardsContainer.append(cardElement);

  return cardElement;

}