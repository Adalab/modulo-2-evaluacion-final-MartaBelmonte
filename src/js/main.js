'use strict';

let listCharactersApi = [];
let listCharacterFavorite = [];
const ulElement = document.querySelector('.js_ul_list');
const url = 'https://api.disneyapi.dev/character?pageSize=50';
const ulFavorites = document.querySelector('.js_ul_favlist');
const searchBox = document.querySelector(".js-search-box");
const searchBtn = document.querySelector(".js-search-button");


fetch(url)
  .then(response => response.json())
  .then(data => {
    listCharactersApi = data.data;
    renderCharacterList(listCharactersApi);
  })
  .catch(error => {
    console.error('Error', error);
});


function renderCharacterList(listData) {
  ulElement.innerHTML = '';
  for (const character of listData) {
    ulElement.innerHTML += renderCharacter(character);
  }
  addEventCharacter();
}

function addEventCharacter() {
  const divElementList = document.querySelectorAll('.js_character-list');
  for (const div of divElementList) {
    div.addEventListener('click', handleClick); 
  }
}

function renderCharacter(character) { 
  const isFavorite = listCharacterFavorite.some((item) => item._id === character._id);
  const favoriteClass = isFavorite ? 'favorite' : '';
  const html = `
    <div class="characters js_character-list ${favoriteClass}" id="${character._id}">
      <p>Name: ${character.name}</p>
      <img src="${character.imageUrl}" alt="${character.name}" />
    </div>
  `;
  return html;
}

function renderFavoriteCharacter(character) { 
   if (!character) {
    return ''; 
  }
  const html = `
    <div class="characters-container">
      <div class="characters js_favorite-character" id="${character.id}">
        <p class="names"> Name: ${character.name}</p>
        <img src="${character.imageUrl}" alt="${character.name}" />
      </div>
    </div>
  `;
  return html;
}

function handleClick(event) {
  const id = event.currentTarget.id;
  const selectedCharacter = listCharactersApi.find((item) => item._id === parseInt(id));
  const indexCharacter = listCharacterFavorite.findIndex((item) => item._id === parseInt(id));
  
  if (indexCharacter === -1) {
    listCharacterFavorite.push(selectedCharacter);
    event.currentTarget.classList.add('favorite');
    moveCharacterToFavorites(event.currentTarget); // Mover el personaje al contenedor de favoritos
  } else {
    listCharacterFavorite.splice(indexCharacter, 1);
    event.currentTarget.classList.remove('favorite');
    removeCharacterFromFavorites(id); // Eliminar el personaje del contenedor de favoritos
  }

  renderFavoriteCharacter();
}

function moveCharacterToFavorites(characterElement) {
  const selectedFavList = document.querySelector('.js_selected-favlist');
  selectedFavList.appendChild(characterElement);
}

function removeCharacterFromFavorites(id) {
  const selectedFavList = document.querySelector('.js_selected-favlist');
  const characterElement = selectedFavList.querySelector(`[id="${id}"]`);
  if (characterElement) {
    characterElement.remove();
  }
}

//buscar personaje + botón
function handleClickbtn(event) {
//filter for searching a character
  event.preventDefault();
  const searchValue = searchBox.value.toLowerCase();
  const characterFilter = listCharactersApi.filter((character) =>
    character.name.toLowerCase().includes(searchValue)
  );
  renderCharacterList(characterFilter);
}

//Events
searchBtn.addEventListener("click", handleClickbtn); // click on search button


function addRemoveIdIntoLocalStorage(id) {
  const ids = JSON.parse(localStorage.getItem('characterIds')) || [];

  if (ids.includes(id)) {
    // Si el ID está incluido, se elimina
    const newIds = ids.filter((item) => item !== id);
    localStorage.setItem('characterIds', JSON.stringify(newIds));
  } else {
    // Si el ID no está incluido, se agrega
    ids.push(id);
    localStorage.setItem('characterIds', JSON.stringify(ids));
  }
}

