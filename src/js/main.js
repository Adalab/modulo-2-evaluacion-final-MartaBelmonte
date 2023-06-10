'use strict';

let listCharactersApi = [];
let listCharacterFavourite = []; //array donde guardo el elemento clickado
const ulElement = document.querySelector('.js_ul_list');
const url = 'https://api.disneyapi.dev/character?pageSize=50';

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
}

function renderCharacter(character) { 
    const html = `
      <div class="characters js_character-list">
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
 console.log(selectedCharacter);

}
