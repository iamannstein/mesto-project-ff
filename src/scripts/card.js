import { deleteCard, addLikeCard, deleteLikeCard } from "./api";

const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


// Функция создания карточки
function createCard(cardItem, deleteCard, addLikeCard, openImage, userId, deleteLikeCard) {
  const cardElement =  cardTemplate.querySelector('.places__item').cloneNode('true');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteCardButton = cardElement.querySelector('.card__delete-button');
  const likesCount = cardElement.querySelector('.card__likes');
  const cardId = cardItem._id;
  const cardLikes = cardItem.likes;
  let whoLiked = [];

  cardLikes.forEach(like => { 
    const id = like._id
    whoLiked.push(id)
  });

  cardElement.querySelector('.card__image').src = cardItem.link;
  cardElement.querySelector('.card__image').alt = cardItem.name;
  cardElement.querySelector('.card__title').textContent = cardItem.name;

  likesCount.textContent = cardLikes.length;

  if (userId === cardItem.owner._id) {
    deleteCardButton.addEventListener('click', function() { 
      deleteCard(cardId);
      deleteCardFromPage(cardElement)
    });
  } else {
    deleteCardButton.disabled = true;
    deleteCardButton.style.visibility = 'hidden';
  }
  

  const isLiked = cardLikes.some((like) => like._id === userId); 
  if (isLiked) { 
    likeButton.classList.add('card__like-button_is-active')
   }
 
  likeButton.addEventListener('click', function() { 
    if (!whoLiked.includes(userId)) {
      likeButton.classList.add('card__like-button_is-active')
      addLikeCard(cardId)
      .then((cardData) => {
        likesCount.textContent = cardData.likes.length
      })
      whoLiked.push(userId)
    } else {
      likeButton.classList.remove('card__like-button_is-active')
      deleteLikeCard(cardId)
      .then((cardData) => {
        likesCount.textContent = cardData.likes.length
      })
      whoLiked = whoLiked.filter(id => id !== userId);
    }
   });

  cardElement.querySelector('.card__image').addEventListener('click', function() { 
    openImage(cardElement)
  });

  return cardElement;
};

//Функция удаления карточки
function deleteCardFromPage(cardElement) {
  cardElement.remove();
};

export { content, cardsContainer, createCard, deleteCard }
