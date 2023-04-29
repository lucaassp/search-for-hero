const searchForm = document.getElementById('search-form-id');
const searchInput = document.getElementById('search-input');
const heroInfo = document.getElementById('hero-info');
const heroThumbnail = document.getElementById('content-thumbnail');
const characterButton = document.getElementById('charactersButton');
const comicsButton = document.getElementById('comicsButton');
 

window.addEventListener('load', async () => {
  
    searchInput.addEventListener('keyup', async (e) => {
        e.preventDefault();
        if (e === 'Enter') {
            await fetchMarvelCharacters(); 
        }
    })

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await fetchMarvelCharacters();
    });

    
    

    async function fetchMarvelCharacters() {
        const timeStamp = '1';
        const apiKey = 'd28ef029a68ad984b5e2be6fa65b6512';
        const md5 = '051c2c5faf0162b6e3b25682a3af5a58';
        const searchTerm = searchInput.value;

        // Busca de personagens
        const characterUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`;
        const characterResponse = await fetch(characterUrl);
        const characterData = await characterResponse.json();
        
        const characters = characterData.data.results;
        
        const charactersData = characters.map(({ name, description, thumbnail }) => ({
            name,
            description,
            thumbnail,
        }));

        const comicsUrl = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${searchTerm}&ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`;
        const comicsResponse = await fetch(comicsUrl);
        const comicData = await comicsResponse.json();

        const comics = comicData.data.results;
        
        const comicsData = comics.map(({ title, description, thumbnail })=> ({
            title,
            description,
            thumbnail,
          }));


        showCharacters(charactersData);
        
        comicsButton.addEventListener('click', () => {
            showComics(comicsData);
          });
    }

    function showCharacters(characters) {
        heroInfo.innerHTML = '';
        heroThumbnail.innerHTML = '';
        characters.forEach((hero) => {
            const heroDiv = document.createElement('div');
            heroDiv.classList.add('hero');
            heroDiv.innerHTML = 
            `<div class="hero-details">
            <h3 class="hero-name">${hero.name}</h3>
            <p class="hero-description">${hero.description || 'No description available.'}</p>
            </div>`;
            heroThumbnail.innerHTML = `<img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" id="thumbnail-id">`;

            heroDiv.addEventListener('mouseover', () => {
            if (hero.thumbnail) {
                heroThumbnail.innerHTML = `<img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" id="thumbnail-id">`;
            }
            });

            heroInfo.appendChild(heroDiv);
        });
    }


    function showComics(comics) {
        heroInfo.innerHTML = '';
        comics.forEach(comic => {
            const comicDiv = document.createElement('div');
            comicDiv.classList.add('hero');
            comicDiv.innerHTML = 
            `<div class="comic">
              <h3>${comic.title}</h3>
              <p>${comic.description || "No description available."}</p>
            </div>`
            heroThumbnail.innerHTML = `<img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}"></img>`;
            
            comicDiv.addEventListener('mouseover', () => {
                if (comic.thumbnail) {
                    heroThumbnail.innerHTML = `<img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}"></img>`;
                }
            });
    
            heroInfo.appendChild(comicDiv);
        })
      }
    
});