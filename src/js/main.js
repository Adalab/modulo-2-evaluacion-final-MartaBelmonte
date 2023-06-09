'use strict';

const characterListContainer = document.querySelector(".js_character-list");

fetch('api.disneyapi.dev/character?pageSize=50')
  .then(response => response.json())
  .then(data => {
    const characters = data.data;

    characters.forEach(character => {
      const characterCard = document.createElement("div");
      characterCard.classList.add("character-card");

      const characterImage = document.createElement("img");
      characterImage.src = character.imageUrl;
      characterImage.alt = character.name;

      const characterName = document.createElement("h2");
      characterName.textContent = character.name;

      characterCard.appendChild(characterImage);
      characterCard.appendChild(characterName);

      characterListContainer.appendChild(characterCard);
    });
  })
  .catch(error => {
    console.error('Error', error);
});
