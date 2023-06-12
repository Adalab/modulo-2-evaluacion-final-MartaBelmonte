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
  .then(response => response.json()) //coge respuesta en formato JSON
  .then(data => {  //para manejar la respuesta anterior
    listCharactersApi = data.data;  //respuesta del servidor+propiedad "data"
    renderCharacterList(listCharactersApi); //se mostrará la lista de characters
  })
  .catch(error => {
    console.error('Error', error);
});

//Renderizar characters
function renderCharacterList(listData) {
  ulElement.innerHTML = ''; // Limpiar antes de renderizar

  for (const character of listData) { //bucle-iterar
    ulElement.innerHTML += renderCharacter(character); //De agrega el HTML generado para el personaje al contenido HTML existente en ulElement.
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
  const isFavorite = listCharacterFavorite.some((item) => item._id === character._id); //id del item = id del character, se cumple la condicion (true)
  const favoriteClass = isFavorite ? 'favorite' : '';  //condición ? expresion1(true)class'favorite' : expresion2(false)
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
  const id = event.currentTarget.id;  //se obtiene el valor del atributo 'id' y se guarda en la const
  const selectedCharacter = listCharactersApi.find((item) => item._id === parseInt(id));  
  const indexCharacter = listCharacterFavorite.findIndex((item) => item._id === parseInt(id)); //cuando un elemento no se encuentra en el array devuelve -1
  
  if (indexCharacter === -1) { //si da -1 : no está en favoritos
    listCharacterFavorite.push(selectedCharacter);  //agrega el personaje seleccionado a la lista de favs
    event.currentTarget.classList.add('favorite');  //agrega la clase "favorite" al elemento HTML en q se hizo click
    moveCharacterToFavorites(event.currentTarget); // Mover el personaje al contenedor de favoritos
  } else {
    listCharacterFavorite.splice(indexCharacter, 1); //se elimina el personaje de la lista fav
    event.currentTarget.classList.remove('favorite');  //se elimina la clase "favorite"
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

// Si la sección de favoritos está vacía: ocultarla 
function removeCharacterFromFavorites(id) {
  const favoriteCharacters = favoritesSection.querySelectorAll('.js_favorite-character');
  
  if (favoriteCharacters.length === 0) {
    favoritesSection.classList.add('hidden-section');
  }
}

//Add to LocalStorage
function addRemoveIdIntoLocalStorage(id) {
  const ids = JSON.parse(localStorage.getItem('characterIds')) || [];  //get:recupera el valor almacenado como string y el json.parse lo convierte en un array. Si el valor no es valido se da una const vacía. 

  if (ids.includes(id)) { // Si el ID está incluido en el LS: 
    const newIds = ids.filter((item) => item !== id);  //
    localStorage.setItem('characterIds', JSON.stringify(newIds));  //guarda la nueva const newIds en el LS convertido en una cadena de texto mediante json.stringify

  } else {  // Si el ID no está incluido:
    ids.push(id);  //se agrega al LS
    localStorage.setItem('characterIds', JSON.stringify(ids)); //se guarda en el LS convertido en una cadena de texto mediante json.stringify
  }
}

//Filter to search
function handleClickbtn(event) {
  event.preventDefault();
  const searchValue = searchBox.value.toLowerCase(); //para obtener el valor del texto
  const characterFilter = listCharactersApi.filter((character) =>
    character.name.toLowerCase().includes(searchValue)
  );
  renderCharacterList(characterFilter);
}

//Events
searchBtn.addEventListener("click", handleClickbtn); 




//# sourceMappingURL=main.js.map
