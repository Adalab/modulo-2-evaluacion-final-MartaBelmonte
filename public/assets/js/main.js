'use strict';

let listCharactersApi = [];
let listCharacterFavourite = []; //array donde guardo el elemento clickado
const ulElement = document.querySelector('.js_ul_list');
const url = 'https://api.disneyapi.dev/character?pageSize=50';
const ulFavourites = document.querySelector('.js_ul_favlist');

//Obtener el array de personajes desde el API con fetch()
fetch(url)
  .then(response => response.json())
  .then(data => {
  listCharactersApi = data.data;
  renderCharacterList(listCharactersApi);
 
  })
  .catch(error => {
    console.error('Error', error);
});

function renderCharacterList (listData) {
  ulElement.innerHTML = '';
  for (const character of listData) {
    ulElement.innerHTML += renderCharacter(character);
  }
  addEventCharacter();
}

function addEventCharacter () {
  const divElementList = document.querySelectorAll('.js_character-list');
  for (const div of divElementList) {
    div.addEventListener('click', handleClick);
  }
}

function renderCharacter(character) { 
    const html = `
      <div id="${character.id}" class="characters js_character-list">
      <p>Name: ${character.name}</p>
      <img src="${character.imageUrl}" alt="${character.name}" />
    </div>
    `;
  return html;
}

//Añadir a favoritos
function handleClick(event) {
  const id = event.currentTarget.id // quiero que se tenga en cuenta ese ID y se ponga en favoritos
 //find (busca dentro de un array el primer elemento que cumpla con la condicion que pides y te devuelve el contenido)
 const selectedCharacter = listCharactersApi.find((item) => item.id === id );
 
 //findIndex te devuelve la posicion
 const indexCharacter = listCharacterFavourite.findIndex((item) => item.id === id ); //busco en que posicion se encuentra dentro del array de favoritos
 
 if (findIndex === -1) {
 listCharacterFavourite.push(selectedCharacter);// si da -1 es porque no esta en el array de fav y entonces hay que meterlo (push)
} else {
  listCharacterFavourite.splice(indexCharacter, 1 );
}

renderFavouriteList();
}

//pintar en la pagina el nuevo array de favoritos

function renderFavouriteList () {
 ulFavourites.innerHTML = '';
  for (const fav of listCharacterFavourite)(
    ulFavourites.innerHTML += renderCharacter(fav)
  )
}

//# sourceMappingURL=main.js.map
