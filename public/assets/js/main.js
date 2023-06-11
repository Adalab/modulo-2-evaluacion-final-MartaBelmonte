'use strict';

let listCharactersApi = [];
let listCharacterFavorite = [];
const ulElement = document.querySelector('.js_ul_list');
const url = 'https://api.disneyapi.dev/character?pageSize=50';
const ulFavorites = document.querySelector('.js_ul_favlist');
const favoritesSection = document.querySelector('.js_favorites-section');

fetch(url)
  .then(response => response.json())
  .then(data => {
    listCharactersApi = data.data;
    renderCharacterList(listCharactersApi);
    localStorage.setItem('character',  JSON.stringify(listCharacterFavorite));
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
  const isFavorite = listCharacterFavorite.some((item) => item.id === character.id);
  const favoriteClass = isFavorite ? 'favorite' : '';
  const html = `
    <div class="characters js_character-list ${favoriteClass}" id="${character.id}">
      <p>Name: ${character.name}</p>
      <img src="${character.imageUrl}" alt="${character.name}" />
    </div>
  `;
  return html;
}

function renderFavoriteCharacter(character) { 
  const html = `
    <div class="characters-container">
      <div class="characters js_favorite-character" id="${character.id}">
        <p>Name: ${character.name}</p>
        <img src="${character.imageUrl}" alt="${character.name}" />
      </div>
    </div>
  `;
  return html;
}

function handleClick(event) {
  const id = event.currentTarget.id;
  const selectedCharacter = listCharactersApi.find((item) => item.id === id);
  const indexCharacter = listCharacterFavorite.findIndex((item) => item.id === id);

  if (indexCharacter === -1) {
    listCharacterFavorite.push(selectedCharacter);
    event.currentTarget.classList.add('favorite');
  } else {
    listCharacterFavorite.splice(indexCharacter, 1);
    event.currentTarget.classList.remove('favorite');
  }

  renderCharacterList(listCharactersApi);
  moveToFavorites();
}

function moveToFavorites() {
  ulFavorites.innerHTML = '';
  for (const character of listCharacterFavorite) {
    ulFavorites.innerHTML += renderFavoriteCharacter(character);
  }
}

//# sourceMappingURL=main.js.map
