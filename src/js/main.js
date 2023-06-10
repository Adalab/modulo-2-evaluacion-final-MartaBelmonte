'use strict';

/*
const url = 'api.disneyapi.dev/character?pageSize=50';
// Paso 3: Obtener el array de personajes desde el API con fetch()
fetch(url)
  .then(response => response.json())
  .then(data => {
  const characterData = data.results;
  console.log(characterData); //respuesta del servidor
  })
  .catch(error => {
    console.error('Error', error);
});

//1. Datos API copiados
const characterData = [
  { name: "Mickey Mouse", image: "mickey.jpg" },
  { name: "Donald Duck", image: "donald.jpg" },
  { name: "Mickey Mouse", image: "mickey.jpg" },
  { name: "Donald Duck", image: "donald.jpg" },
  { name: "Mickey Mouse", image: "mickey.jpg" },
  { name: "Donald Duck", image: "donald.jpg" },
  // ... más personajes
];

//1.Generar HTML para un único personaje con bucle
const charactersContainer = document.querySelector('.js_character-list');
for (let i = 0; i < characterData.length; i++) {
  const character = characterData[i];
  const characterCard = `
    <div class="card">
      <p>${character.name}</p>
      <img src="${character.image}" alt="${character.name}">
    </div>
  `;
  
  // Agregar la tarjeta al contenedor en el HTML
  charactersContainer.innerHTML += characterCard;

};

*/
let listCharactersApi = [];
const ulElement = document.querySelector('.js_ul_list');
const url = 'https://api.disneyapi.dev/character?pageSize=50';
// Paso 3: Obtener el array de personajes desde el API con fetch()
fetch(url)
  .then(response => response.json())
  .then(data => {
  console.log(data); //respuesta del servidor
  listCharactersApi = data.characters;
  renderCharacterList (listCharactersApi);
  ulElement.innerHTML =  renderCharacter(data.characters[0]);
  })
  .catch(error => {
    console.error('Error', error);
});

function renderCharacterList (listData) {
  for (const character of listData) {
    ulElement.innerHTML += renderCharacter(character);
  }
}
function renderCharacter(characters) {
  let html = '';

  for (const character of characters) { 
    html += `
      <div class="characters js_character-list">
        "name": ${character.name},
        "imageUrl": "${character.imageUrl}"
      </div>
    `;
  }

  return html;
}
