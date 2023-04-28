const searchForm = document.getElementById('search-form-id');
const searchInput = document.getElementById('search-input');
const heroInfo = document.getElementById('hero-info');
const heroThumbnail = document.getElementById('content-thumbnail');

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
        const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`;

        const response = await fetch(url);
        const data = await response.json();

        const { results: heroes } = data.data;

        const heroData = heroes.map(({ name, description, thumbnail, comics, series, stories }) => ({
            name,
            description,
            thumbnail,
            comics,
            series,
            stories,
        }));

        displayHeroData(heroData);
    }

    function displayHeroData(heroData) {
    heroInfo.innerHTML = '';
    heroThumbnail.innerHTML = '';
    heroData.forEach((hero) => {
        const heroDiv = document.createElement('div');
        heroDiv.classList.add('hero');
        heroDiv.innerHTML = 
        `<div class="hero-details">
            <h3 class="hero-name">${hero.name}</h3>
            <p class="hero-description">${hero.description || 'No description available.'}</p>
        </div>`;
        

        heroInfo.appendChild(heroDiv);


        
        if (hero.thumbnail) {
            heroThumbnail.innerHTML = `<img src="${hero.thumbnail.path}.${hero.thumbnail.extension}">`;
        }
    });
    }
});
