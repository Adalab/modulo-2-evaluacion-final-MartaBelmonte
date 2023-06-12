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
  const selectedCharacterCopy = characterElement.cloneNode(true);
  const characterId = characterElement.id;

  characterElement.classList.add('favorite-original'); // Agregar una clase adicional al personaje en la primera sección
  characterElement.dataset.originalId = characterId; // Guardar una referencia al personaje original en un atributo personalizado

  selectedFavList.appendChild(selectedCharacterCopy);

  // Mostrar la sección de favoritos
  const favoritesSection = document.querySelector('.js_favorites-section');
  favoritesSection.classList.remove('hidden-section');
}

function removeCharacterFromFavorites(id) {
    // Si la sección de favoritos está vacía: ocultarla 
  const favoriteCharacters = favoritesSection.querySelectorAll('.js_favorite-character');
  if (favoriteCharacters.length === 0) {
    favoritesSection.classList.add('hidden-section');
  }
}

//Add to LocalStorage
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


//filter for searching a character
function handleClickbtn(event) {
  event.preventDefault();
  const searchValue = searchBox.value.toLowerCase();
  const characterFilter = listCharactersApi.filter((character) =>
    character.name.toLowerCase().includes(searchValue)
  );
  renderCharacterList(characterFilter);
}

//Events
searchBtn.addEventListener("click", handleClickbtn); 




//# sourceMappingURL=main.js.map
