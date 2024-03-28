import '../styles/index.css';
import { initialCards } from './cards';
import { cardsContainer, createCard, deleteCard, likeCard } from './card';
import { openModal, closeModal } from './modal';

// Находим попапы
const popups = document.querySelectorAll('.popup')
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
// Находим кнопки открытия попапов
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Находим данные для попапа с картинкой
const openImagePopup = document.querySelector('.popup__content_content_image');
const imageSrc = openImagePopup.querySelector('.popup__image');
const imageDescription = openImagePopup.querySelector('.popup__caption');

// Находим форму "Редактирование профиля" в DOM
const formElement = document.querySelector('form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
//заполняем поля «Имя» и «О себе» значениями, которые отображаются на странице.
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

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

// Добавление слушателя для закрытия попапов
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        if (popup.classList.contains('popup_type_edit')) {
          formElement.reset();
          nameInput.value = profileTitle.textContent;
          jobInput.value = profileDescription.textContent;
        }
        closeModal(popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        if (popup.classList.contains('popup_type_edit')) {
          formElement.reset();
          nameInput.value = profileTitle.textContent;
          jobInput.value = profileDescription.textContent;
        }
        closeModal(popup);

      }
    })
})

// Открытие попапов "Редактирование профиля" и "Создание новой карточки"
editProfileButton.addEventListener('click', function() {
  openModal(editProfilePopup);
}); 

addCardButton.addEventListener('click', function() {
  openModal(addCardPopup);
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
    // Получаем значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    // Выбираем элементы, куда должны быть вставлены значения полей
    // и вставляем новые значения с помощью textContent
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    // Закрываем модальное окно
    closeModal(editProfilePopup);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmitforAddCard(evt) {
  evt.preventDefault();// Отменяем стандартную отправку формы.
  // Получаем значение полей cardNameInput и urlInput из свойства value
  const cardNameValue = cardNameInput.value;
  const urlValue = urlInput.value;
  // Собираем данные для карточки в один объект
  const newCard = {name: cardNameValue, link: urlValue};
  // Создаем карточку с помощью функции createCard
  const cardElement = createCard(newCard, deleteCard, likeCard, openImage);
  // Добавляем карточку в начало списка
  cardsContainer.prepend(cardElement);
  // Очищаем поля ввода
  evt.target.reset();
  // Закрываем модальное окно
  closeModal(addCardPopup);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementforCard.addEventListener('submit', handleFormSubmitforAddCard);