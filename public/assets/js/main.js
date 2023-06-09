'use strict';

fetch('api.disneyapi.dev/character?pageSize=50'
    .then(response => response.json())
    .then(data => {
        const characters = data.data; 
        let html = '';
            for (let i = 0; i < characters.length; i++){
             const character = characters[i];
             html += `
                <div>
                    <img src="${character.imageUrl}" alt="" />
                    <p>${character.name}</p>
                </div>`;
            document.querySelector('.cards-characters').innerHTML = html;
            console.log(data);
            }
    })
    .catch(error =>{
        console.error('Error:', error);
    }))

//# sourceMappingURL=main.js.map
