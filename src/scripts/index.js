import '../styles/index.css';
import { initialCards } from './cards';
import { cardsContainer, imagePopup, createCard, deleteCard, likeCard, openImage } from './card';
import { openModal, closeModal, closeModalByEsc, closeModalByClickOverlay } from './modal';

// Находим попапы
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
// Находим кнопки открытия попапов
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
// Находим кнопки закрытия попапов
const closeProfilePopup = editProfilePopup.querySelector('.popup__close');
const closeAddCardPopup = addCardPopup.querySelector('.popup__close');
const closeImagePopup = imagePopup.querySelector('.popup__close');

// Находим форму "Редактирование профиля" в DOM
const formElement = document.querySelector('form[name="edit-profile"]');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
//заполняем поля «Имя» и «О себе» значениями, которые отображаются на странице.
const profile = document.querySelector('.profile');
nameInput.value = profile.querySelector('.profile__title').textContent;
jobInput.value = profile.querySelector('.profile__description').textContent;

// Находим форму "Создание новой карточки" в DOM
const formElementforCard = document.querySelector('form[name="new-place"]');
// Находим поля формы в DOM
const cardNameInput = formElementforCard.querySelector('.popup__input_type_card-name');
const urlInput = formElementforCard.querySelector('.popup__input_type_url');

// Создаем и выводим карточки на страницу из массива initialCards
initialCards.forEach((el) => {
  const card = createCard(el, deleteCard, likeCard, openImage);
  cardsContainer.append(card);
});

//Функция очистки полей ввода для формы "Редактирование профиля"
function setDefaultValues(name, description) {
  name.value = profile.querySelector('.profile__title').textContent;
  description.value = profile.querySelector('.profile__description').textContent;
}

// Открытие попапов "Редактирование профиля" и "Создание новой карточки"
editProfileButton.addEventListener('click', function() {
  openModal(editProfilePopup);
}); 

addCardButton.addEventListener('click', function() {
  openModal(addCardPopup);
});

// Закрытие попапов "Редактирование профиля", "Создание новой карточки", попапа с картинкой
// при клике по крестику
closeProfilePopup.addEventListener ('click', function() {
  closeModal(editProfilePopup);
  setDefaultValues(nameInput, jobInput);
});

closeAddCardPopup.addEventListener ('click', function() {
  closeModal(addCardPopup);
});

closeImagePopup.addEventListener ('click', function() {
  closeModal(imagePopup);
});

// Закрытие попапов "Редактирование профиля", "Создание новой карточки", попапа с картинкой
// кликом на оверлей
document.addEventListener('click', function(evt) {
  closeModalByClickOverlay(evt, editProfilePopup);
});

document.addEventListener('click', function(evt) {
  closeModalByClickOverlay(evt, addCardPopup);
});

document.addEventListener('click', function(evt) {
  closeModalByClickOverlay(evt, imagePopup);
});

// Закрытие попапов "Редактирование профиля", "Создание новой карточки", попапа с картинкой
// нажатием на Escape
document.addEventListener('keypress', function(evt) {
  closeModalByEsc(evt, editProfilePopup);
}); 

document.addEventListener('keypress', function(evt) {
  closeModalByEsc(evt, addCardPopup);
}); 

document.addEventListener('keypress', function(evt) {
  closeModalByEsc(evt, imagePopup);
}); 

// Обработка событий ввода данных пользователем в формах "Редактирование профиля", "Создание новой карточки"
// и отправки даннхы
// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();// Отменяем стандартную отправку формы.

    // Получаем значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Выбираем элементы, куда должны быть вставлены значения полей
    // и вставляем новые значения с помощью textContent
    profile.querySelector('.profile__title').textContent = nameValue;
    profile.querySelector('.profile__description').textContent = jobValue;

    // Закрываем модальное окно
    closeModal(editProfilePopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmitforAddCard(evt) {
  evt.preventDefault();// Отменяем стандартную отправку формы.

  // Получаем значение полей cardNameInput и urlInput из свойства value
  let cardNameValue = cardNameInput.value;
  let urlValue = urlInput.value;
  // Собираем данные для карточки в один объект
  const newCard = {name: cardNameValue, link: urlValue};
  // Создаем карточку с помощью функции createCard
  const cardElement = createCard(newCard, deleteCard, likeCard, openImage);
  // Добавляем карточку в начало списка
  cardsContainer.prepend(cardElement);
  // Очищаем поля ввода
  cardNameInput.value ='';
  urlInput.value = '';
  // Закрываем модальное окно
  closeModal(addCardPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementforCard.addEventListener('submit', handleFormSubmitforAddCard);

export { editProfilePopup, nameInput, jobInput, setDefaultValues }