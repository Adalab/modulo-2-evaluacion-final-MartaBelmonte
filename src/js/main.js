'use strict';

let listCharactersApi = [];
let listCharacterFavorite = [];
const ulElement = document.querySelector('.js_ul_list');
const url = 'https://api.disneyapi.dev/character?pageSize=50';
const ulFavorites = document.querySelector('.js_ul_favlist');
const searchBox = document.querySelector(".js-search-box");
const searchBtn = document.querySelector(".js-search-button");


//Solicitud al servidor 
fetch(url)
  .then(response => response.json()) 
  .then(data => {  
    listCharactersApi = data.data;  
    renderCharacterList(listCharactersApi); 
  })
  .catch(error => {
    console.error('Error', error);
});


//Renderizar characters
function renderCharacterList(listData) {
  ulElement.innerHTML = ''; 

  for (const character of listData) { 
    ulElement.innerHTML += renderCharacter(character); 
  }

  addEventCharacter(); 
}

//Agregar eventos click a characters y fav characters:
function addEventCharacter() {
  const divElementList = document.querySelectorAll('.js_character-list'); 
  for (const div of divElementList) {    
    div.addEventListener('click', handleClick);  
  }

  const favoriteCharacterList = document.querySelectorAll('.js_favorite-character'); 
  for (const character of favoriteCharacterList) {
   // character.addEventListener('click', removeFavoriteCharacter);
  }
}

//Eliminar personaje sección favoritos
function removeFavoriteCharacter(event) {
  const id = event.currentTarget.id; //guarda el ID cuando se hace click al character
  const indexCharacter = listCharacterFavorite.findIndex((item) => item._id === parseInt(id)); //busca la posición del ch que tiene el mismo ID que el ch seleccionado.

  if (indexCharacter !== -1) { //si no da -1 (se ha encontrado el ch)
    listCharacterFavorite.splice(indexCharacter, 1); 
    event.currentTarget.remove(); 
    checkIfFavoriteIsEmpty(id); 

    const originalCharacter = document.getElementById(id);
    if (originalCharacter) {    
      originalCharacter.classList.remove('favorite');  
    }
  }
}

//Pintar al HTML el character
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

//Pintar al HTML el fav character
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

//Funcion del evento cuando se hace click en un character
function handleClick(event) {
  const id = event.currentTarget.id;  
  const selectedCharacter = listCharactersApi.find((item) => item._id === parseInt(id));  
  const indexCharacter = listCharacterFavorite.findIndex((item) => item._id === parseInt(id));  //-1
  
  if (indexCharacter === -1) { //si da -1 : no está en favoritos
    listCharacterFavorite.push(selectedCharacter);  //agrega el personaje a la lista de favs
    event.currentTarget.classList.add('favorite');  //agrega clase 
    moveCharacterToFavorites(event.currentTarget); // Mover a favoritos
  } else {
    listCharacterFavorite.splice(indexCharacter, 1); 
    event.currentTarget.classList.remove('favorite');  
    checkIfFavoriteIsEmpty(id); 
  }

  renderFavoriteCharacter();
}

//Mover character a sección fav
function moveCharacterToFavorites(characterElement) {
  const selectedFavList = document.querySelector('.js_selected-favlist');
  const selectedCharacterCopy = characterElement.cloneNode(true);
  const characterId = characterElement.id;

  characterElement.classList.add('favorite-original'); 
  characterElement.dataset.originalId = characterId;  

  selectedFavList.appendChild(selectedCharacterCopy);
  selectedCharacterCopy.addEventListener('click', removeFavoriteCharacter);

  // Mostrar la sección de favoritos
  let favoritesSection = document.querySelector('.js_favorites-section');
  favoritesSection.classList.remove('hidden-section');
}

// Comprobar sección favoritos, si está vacía: ocultarla 
function checkIfFavoriteIsEmpty() { 
  let favoritesSection = document.querySelector('.js_favorites-section');
  const favoriteCharacters = favoritesSection.querySelectorAll('.js_selected-favlist');

  if (favoriteCharacters.length === 0) {
    favoritesSection.classList.add('hidden-section');
  }
}

//Add to LocalStorage
function addRemoveIdIntoLocalStorage(id) {
  const ids = JSON.parse(localStorage.getItem('characterIds')) || [];  

  if (ids.includes(id)) { // Si el ID está incluido en el LS: 
    const newIds = ids.filter((item) => item !== id);  
    localStorage.setItem('characterIds', JSON.stringify(newIds));  

  } else {  // Si el ID no está incluido:
    ids.push(id);  //se agrega al LS
    localStorage.setItem('characterIds', JSON.stringify(ids)); 
  }
}

//Filter to search
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



