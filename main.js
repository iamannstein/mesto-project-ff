(()=>{"use strict";var e=document.querySelector(".content").querySelector(".places__list"),t=document.querySelector("#card-template").content;function n(e,n,o,r){var c=t.querySelector(".places__item").cloneNode("true");return c.querySelector(".card__image").src=e.link,c.querySelector(".card__title").textContent=e.name,c.querySelector(".card__image").alt=e.name,c.querySelector(".card__delete-button").addEventListener("click",(function(){n(c)})),c.querySelector(".card__like-button").addEventListener("click",o),c.querySelector(".card__image").addEventListener("click",(function(){r(c)})),c}function o(e){e.remove()}function r(e){e.target.classList.toggle("card__like-button_is-active")}function c(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),0),document.addEventListener("keydown",p)}function u(e){setTimeout((function(){e.classList.remove("popup_is-animated")}),600),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}document.querySelector(".popup__button"),document.querySelector(".popup__form");var i=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove("popup__button_disabled")):(t.disabled=!0,t.classList.add("popup__button_disabled"))},a=document.querySelector(".popup__form"),d=a.querySelector(".popup__input"),l=(a.querySelector(".".concat(d.id,"-error")),document.querySelectorAll(".popup")),s=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_image"),y=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),f=document.querySelector(".popup__content_content_image"),q=f.querySelector(".popup__image"),S=f.querySelector(".popup__caption"),k=document.querySelector('form[name="edit-profile"]'),L=k.querySelector(".popup__input_type_name"),b=k.querySelector(".popup__input_type_description"),g=document.querySelector(".profile"),x=g.querySelector(".profile__title"),E=g.querySelector(".profile__description");L.value=x.textContent,b.value=E.textContent;var h,C,j,A=document.querySelector('form[name="new-place"]'),w=A.querySelector(".popup__input_type_card-name"),D=A.querySelector(".popup__input_type_url");function T(e){c(m),q.src=e.querySelector(".card__image").src,S.textContent=e.querySelector(".card__title").textContent,q.alt=e.querySelector(".card__title").textContent}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(t){var c=n(t,o,r,T);e.append(c)})),l.forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("popup_is-opened")&&u(e),t.target.classList.contains("popup__close")&&u(e)}))})),y.addEventListener("click",(function(){L.value=x.textContent,b.value=E.textContent,c(s)})),v.addEventListener("click",(function(){c(_)})),k.addEventListener("submit",(function(e){e.preventDefault();var t=L.value,n=b.value;x.textContent=t,E.textContent=n,u(s)})),A.addEventListener("submit",(function(t){t.preventDefault();var c=n({name:w.value,link:D.value},o,r,T);e.prepend(c),t.target.reset(),u(_)})),h=a,C=Array.from(document.querySelectorAll(".popup__input")),j=document.querySelector(".popup__button"),i(C,j),C.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.classList.remove("popup__error_visible"),n.textContent=""}(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),o.textContent=n,o.classList.add("popup__error_visible")}(e,t,t.validationMessage)}(h,e),i(C,j)}))})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()}))}))})();