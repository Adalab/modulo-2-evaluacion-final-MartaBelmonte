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
  ulElement.innerHTML = ''; // Limpiar antes de renderizar

  for (const character of listData) {
    ulElement.innerHTML += renderCharacter(character); // Renderiza cada personaje y lo agrega a ulElement
  }

  addEventCharacter(); // Agrega el evento de click
}

//Agregar eventos click a characters y fav characters:
function addEventCharacter() {
  const divElementList = document.querySelectorAll('.js_character-list'); //Personajes en la sección characters
  for (const div of divElementList) {    //Itera en cada div(elemento) de la lista
    div.addEventListener('click', handleClick);  //click a div, llamada a handleclick
  }

  const favoriteCharacterList = document.querySelectorAll('.js_favorite-character'); // los personajes en la sección favorites
  for (const character of favoriteCharacterList) {
    character.addEventListener('click', removeFavoriteCharacter);
  }
}

//Eliminar personaje sección favoritos
function removeFavoriteCharacter(event) {
  const id = event.currentTarget.id; //guarda el ID cuando se hace click al character
  const indexCharacter = listCharacterFavorite.findIndex((item) => item._id === parseInt(id)); //busca la posición del ch que tiene el mismo ID que el ch seleccionado.

  if (indexCharacter !== -1) { //si no da -1 (se ha encontrado el ch)
    listCharacterFavorite.splice(indexCharacter, 1); //elimina el ch de la listCh segun lo que encuentres antes.
    event.currentTarget.remove(); //elimina el personaje de la sección de fav.
    removeCharacterFromFavorites(id); //llama a la funcion y le pasa el ID del eliminado de la sección de favs.

    const originalCharacter = document.getElementById(id);
    if (originalCharacter) {    //si se encuentra elemento original se quita el resaltado de estilos
      originalCharacter.classList.remove('favorite');
    }
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
