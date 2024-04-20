import { checkResponse } from "../utils/checkResponse";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: '412948d5-0c28-4099-89d0-e00a7f79ef1a',
    'Content-Type': 'application/json'
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse)
} 

function getUserInfo() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers})
  .then((userData) => {
    return userData;
  })
}


function getCards() {
 return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((cardsData) => {
    return cardsData
  }) 
}

function updateUserInfo(userInfo) {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about
      }),
    headers: config.headers
  })
}

function addNewCard(cardItem) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: cardItem.name,
      link: cardItem.link
      }),
    headers: config.headers
  })
  .then((cardData) => {
    return cardData
  }) 
}


function deleteCard(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

function addLikeCard(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((cardData) => {
    return cardData
  })
}

function deleteLikeCard(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((cardData) => {
    return cardData
  })
} 

function updateUserAvatar(avatarUrl) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({avatar: avatarUrl}),
    headers: config.headers
  })
  .then((avatarData) => {
    return avatarData
  })
} 


export { getUserInfo, getCards, updateUserInfo, addNewCard, deleteCard, addLikeCard, deleteLikeCard, updateUserAvatar }
