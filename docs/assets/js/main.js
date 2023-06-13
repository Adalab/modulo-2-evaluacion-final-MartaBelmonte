"use strict";let listCharactersApi=[],listCharacterFavorite=[];const ulElement=document.querySelector(".js_ul_list"),url="https://api.disneyapi.dev/character?pageSize=50",ulFavorites=document.querySelector(".js_ul_favlist"),searchBox=document.querySelector(".js-search-box"),searchBtn=document.querySelector(".js-search-button");function renderCharacterList(e){ulElement.innerHTML="";for(const t of e)ulElement.innerHTML+=renderCharacter(t);addEventCharacter()}function addEventCharacter(){const e=document.querySelectorAll(".js_character-list");for(const t of e)t.addEventListener("click",handleClick)}function removeFavoriteCharacter(e){const t=e.currentTarget.id,r=listCharacterFavorite.findIndex(e=>e._id===parseInt(t));if(-1!==r){listCharacterFavorite.splice(r,1),e.currentTarget.remove(),checkIfFavoriteIsEmpty(t);const a=document.getElementById(t);a&&a.classList.remove("favorite")}}function renderCharacter(e){return`\n    <div class="characters js_character-list ${listCharacterFavorite.some(t=>t._id===e._id)?"favorite":""}" id="${e._id}">\n      <p>Name: ${e.name}</p>\n      <img src="${e.imageUrl}" alt="${e.name}" />\n    </div>\n  `}function renderFavoriteCharacter(e){if(!e)return"";return`\n    <div class="characters-container">\n      <div class="characters js_favorite-character" id="${e.id}">\n        <p class="names"> Name: ${e.name}</p>\n        <img src="${e.imageUrl}" alt="${e.name}" />\n      </div>\n    </div>\n  `}function handleClick(e){const t=e.currentTarget.id,r=listCharactersApi.find(e=>e._id===parseInt(t)),a=listCharacterFavorite.findIndex(e=>e._id===parseInt(t));-1===a?(listCharacterFavorite.push(r),e.currentTarget.classList.add("favorite"),moveCharacterToFavorites(e.currentTarget)):(listCharacterFavorite.splice(a,1),e.currentTarget.classList.remove("favorite"),checkIfFavoriteIsEmpty(t)),renderFavoriteCharacter()}function moveCharacterToFavorites(e){const t=document.querySelector(".js_selected-favlist"),r=e.cloneNode(!0),a=e.id;e.classList.add("favorite-original"),e.dataset.originalId=a,t.appendChild(r),r.addEventListener("click",removeFavoriteCharacter),document.querySelector(".js_favorites-section").classList.remove("hidden-section")}function checkIfFavoriteIsEmpty(){let e=document.querySelector(".js_favorites-section");0===e.querySelectorAll(".js_selected-favlist").length&&e.classList.add("hidden-section")}function addRemoveIdIntoLocalStorage(e){const t=JSON.parse(localStorage.getItem("characterIds"))||[];if(t.includes(e)){const r=t.filter(t=>t!==e);localStorage.setItem("characterIds",JSON.stringify(r))}else t.push(e),localStorage.setItem("characterIds",JSON.stringify(t))}function handleClickbtn(e){e.preventDefault();const t=searchBox.value.toLowerCase();renderCharacterList(listCharactersApi.filter(e=>e.name.toLowerCase().includes(t)))}fetch(url).then(e=>e.json()).then(e=>{listCharactersApi=e.data,renderCharacterList(listCharactersApi)}).catch(e=>{console.error("Error",e)}),searchBtn.addEventListener("click",handleClickbtn);