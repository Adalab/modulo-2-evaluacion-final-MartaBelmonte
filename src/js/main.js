'use strict';


// Paso 3: Obtener el array de personajes desde el API con fetch()
fetch('api.disneyapi.dev/character?pageSize=50')
  .then(response => response.json())
  .then(data => {
  const characterData = data.results;
  console.log(characterData);
  })
  .catch(error => {
    console.error('Error', error);
});

//1. Datos API copiados
const characterData = [
  { name: "Mickey Mouse", image: "mickey.jpg" },
  { name: "Donald Duck", image: "donald.jpg" },
  // ... más personajes
];

//1Generar HTML para un único personaje con bucle
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