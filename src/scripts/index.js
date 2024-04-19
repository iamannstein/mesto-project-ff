import '../styles/index.css';
import { cardsContainer, createCard, deleteCard } from './card';
import { openModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getUserInfo, getCards, updateUserInfo, addNewCard, addLikeCard, deleteLikeCard, updateUserAvatar } from './api';

// Находим попапы
const popups = document.querySelectorAll('.popup')
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_avatar-update');

// Находим кнопки открытия попапов
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const updateAvatarButton = document.querySelector('.profile__avatar-button');

// Находим данные для попапа с картинкой
const openImagePopup = document.querySelector('.popup__content_content_image');
const imageSrc = openImagePopup.querySelector('.popup__image');
const imageDescription = openImagePopup.querySelector('.popup__caption');

// Находим форму "Редактирование профиля" в DOM
const formElement = document.querySelector('form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileImage = profile.querySelector('.profile__image');

// Находим форму "Создание новой карточки" в DOM
const formElementForCard = document.querySelector('form[name="new-place"]');
// Находим поля формы в DOM
const cardNameInput = formElementForCard.querySelector('.popup__input_type_card-name');
const urlInput = formElementForCard.querySelector('.popup__input_type_url');

// Находим форму "Обновление аватара" в DOM
const formElementForAvatar = document.querySelector('form[name="new-avatar"]');
// Находим поле формы в DOM
const urlInputForAvatar = formElementForAvatar.querySelector('.popup__input_type_url');


let userId = null;

Promise.all([getUserInfo(), getCards()])  
  .then(([userData, cardsData]) => {
    userId = userData._id;
    const userName = userData.name;
    const userDescription = userData.about;
    const avatar = userData.avatar;
    profileTitle.textContent = userName;
    profileDescription.textContent = userDescription;
    profileImage.style.backgroundImage = "url("+avatar+")";
    cardsData.forEach(cardItem => {
      const card = createCard(cardItem, deleteCard, addLikeCard, openImage, userId, deleteLikeCard);
      cardsContainer.append(card);
    });
  })
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.status}`);
  })


function addNewCardtoPage (cardItem) {
  cardItem = createCard(cardItem, deleteCard, addLikeCard, openImage, userId, deleteLikeCard);
  cardsContainer.prepend(cardItem)
}

function showLoading(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...'
  } else {
    submitButton.textContent = 'Сохранить'
  }
}

// Добавление слушателя для закрытия попапов
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        closeModal(popup);
      }
    })
})

// Открытие попапов "Редактирование профиля" и "Создание новой карточки"
editProfileButton.addEventListener('click', function() {
  clearValidation(formElement, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
}); 

addCardButton.addEventListener('click', function() {
  clearValidation(formElementForCard, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
  openModal(addCardPopup);
});

updateAvatarButton.addEventListener('click', function() {
  clearValidation(formElementForAvatar, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
  openModal(avatarPopup);
});

// Функция открытия изображения во весь экран
function openImage(cardElement) {
  openModal(imagePopup);
  imageSrc.src = cardElement.querySelector('.card__image').src;
  imageDescription.textContent = cardElement.querySelector('.card__title').textContent;
  imageSrc.alt = cardElement.querySelector('.card__title').textContent;
}

// Обработка событий ввода данных пользователем в формах "Редактирование профиля", "Создание новой карточки"
// и отправки данных
// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();// Отменяем стандартную отправку формы.
    const userData = {
      name: nameInput.value,
      about: jobInput.value};
    const submitButton = editProfilePopup.querySelector('.popup__button');
    showLoading(true, submitButton)
    updateUserInfo(userData)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(editProfilePopup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      showLoading(false, submitButton);
    });
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmitForAddCard(evt) {
  evt.preventDefault();// Отменяем стандартную отправку формы.
  const cardItem = {
    name: cardNameInput.value,
    link: urlInput.value };
  const submitButton = addCardPopup.querySelector('.popup__button');
  showLoading(true, submitButton); 
  addNewCard(cardItem)
  .then((cardData) => { 
    addNewCardtoPage(cardData)
    // Очищаем поля ввода 
    evt.target.reset();
    // Закрываем модальное окно
    closeModal(addCardPopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    showLoading(false, submitButton);
  });
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementForCard.addEventListener('submit', handleFormSubmitForAddCard);

function handleFormSubmitforUpdateAvatar(evt) {
  evt.preventDefault();// Отменяем стандартную отправку формы.
  const avatarUrl = urlInputForAvatar.value;
  const submitButton = avatarPopup.querySelector('.popup__button');
  showLoading(true, submitButton); 
  updateUserAvatar(avatarUrl)
  .then(() => {
    profileImage.style.backgroundImage = "url("+avatarUrl+")";
    // Очищаем поля ввода 
    evt.target.reset();
    // Закрываем модальное окно
    closeModal(avatarPopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    showLoading(false, submitButton);
  });

}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementForAvatar.addEventListener('submit', handleFormSubmitforUpdateAvatar);


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

export { openImage, profile, profileTitle, profileDescription }