const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: '412948d5-0c28-4099-89d0-e00a7f79ef1a',
    'Content-Type': 'application/json'
  }
}

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
  })
  .then((userData) => {
    return userData;
  })
  .catch((res) => {
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}


function getCards() {
 return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
  })
  .then((cardsData) => {
    return cardsData
  }) 
  .catch((res) => {
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function updateUserInfo(userInfo) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about
      }),
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
  })
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.status}`);
  })
}

function addNewCard(cardItem) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: cardItem.name,
      link: cardItem.link
      }),
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
  })
  .then((cardData) => {
    return cardData
  }) 
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.status}`);
  })
}


function deleteCard(cardId) {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.message}`);
  })
}

function addLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
  })
  .then((cardData) => {
    return cardData
  })
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.message}`);
  })
}

function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
  })
  .then((cardData) => {
    return cardData
  })
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.message}`);
  })
} 

function updateUserAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({avatar: avatarUrl}),
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
  })
  .then((avatarData) => {
    return avatarData
  })
  .catch(error => {
    return Promise.reject(`Ошибка: ${error.message}`);
  })
} 


export { getUserInfo, getCards, updateUserInfo, addNewCard, deleteCard, addLikeCard, deleteLikeCard, updateUserAvatar }
