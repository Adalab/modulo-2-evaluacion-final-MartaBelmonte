'use strict';

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
  ulElement.innerHTML = '';
  for (const character of listData) {
    ulElement.innerHTML += renderCharacter(character);
  }
}

function renderCharacter(characters) {

  for (const character of characters) { 
    const html = `
      <div class="characters js_character-list">
      <p>Name: ${character.name}</p>
      <img src="${character.imageUrl}" alt="${character.name}" />
    </div>
    `;
  }

  return html;
}

//# sourceMappingURL=main.js.map
