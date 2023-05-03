const searchForm = document.getElementById('search-form-id');
const searchInput = document.getElementById('search-input');
const heroInfo = document.getElementById('hero-info');
const heroThumbnail = document.getElementById('content-thumbnail');
const characterButton = document.getElementById('charactersButton');
const comicsButton = document.getElementById('comicsButton');
const seriesButton = document.getElementById('seriesButton')
 

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

        const characterUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`;
        const characterResponse = await fetch(characterUrl);
        const characterData = await characterResponse.json();
        
        const characters = characterData.data.results;
        
        const charactersData = characters.map(({ name, description, thumbnail, comics, series, stories }) => ({
            name,
            description,
            thumbnail,
            comics,
            series,
            stories,
        }));

        const comicsUrl = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${searchTerm}&ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`;
        const comicsResponse = await fetch(comicsUrl);
        const comicData = await comicsResponse.json();

        const comics = comicData.data.results;
        
        const comicsData = comics.map(({ title, description, thumbnail, creators })=> ({
            title,
            description,
            thumbnail,
            creators
          }));

        const seriesUrl = `http://gateway.marvel.com/v1/public/series?apikey=${apiKey}&ts=${timeStamp}&hash=${md5}`
        const seriesResponse = await fetch(seriesUrl);
        const serieData = await seriesResponse.json();

        const series = serieData.data.results;

        const seriesData = series.map(({ title, description, startYear, endYear, modified, creators }) => ({
            title, 
            description, 
            startYear, 
            endYear, 
            modified, 
            creators, 
        }));  

        showCharacters(charactersData);

        characterButton.addEventListener('click', () => {
            showCharacters(charactersData);
          });
        
        comicsButton.addEventListener('click', () => {
            showComics(comicsData);
          });

        seriesButton.addEventListener('click', () => {
          showSeries(seriesData)
        })
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
            <h5 class="hero-comics">${hero.comics.available || 'There is no Comics'} comics | ${hero.series.available || 'There is no Series'} series | ${hero.stories.available || 'There is no Stories'} stories</h5>
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
          comicDiv.innerHTML = `
              <div class="comic">
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
  
          if (comic.creators && comic.creators.items.length > 0) {
              const creatorsDiv = document.createElement('div');
              creatorsDiv.classList.add('comic-creators');
              let creatorsHtml = '<h4>Creators</h4><ul>';
  
              comic.creators.items.forEach((creator) => {
                  creatorsHtml += `<li>${creator.name} (${creator.role})</li>`;
              });
  
              creatorsHtml += '</ul>';
              creatorsDiv.innerHTML = creatorsHtml;
              comicDiv.appendChild(creatorsDiv);
          }
      });
  }

      function showSeries(series) {
        heroInfo.innerHTML = '';
        series.forEach((serie) => {
          const serieDiv = document.createElement('div'); 
          serieDiv.classList.add('serie');
          serieDiv.innerHTML = `
            <div class="serie-details">
              <h3 class="serie-title">${serie.title}</h3>
              <p class="serie-description">${serie.description || 'No description available.'}</p>
              <h5 class="serie-beginning-end">Year of creation ${serie.startYear} - End  ${serie.endYear}</h5>
            </div>`;
            if (serie.thumbnail && serie.thumbnail.path) {
              heroThumbnail.innerHTML = `<img src="${serie.thumbnail.path}.${serie.thumbnail.extension}" id="thumbnail-id">`;
            }
            serieDiv.addEventListener('mouseover', () => {
            if (serie.thumbnail && serie.thumbnail.path) {
                heroThumbnail.innerHTML = `<img src="${serie.thumbnail.path}.${serie.thumbnail.extension}" id="thumbnail-id">`;
            }
          });
          heroInfo.appendChild(serieDiv);

          if (serie.creators && serie.creators.items.length > 0) {
            const creatorsDiv = document.createElement('div');
            creatorsDiv.classList.add('serie-creators');
            let creatorsHtml = '<h4>Creators:</h4><ul>';
      
            serie.creators.items.forEach((creator) => {
              creatorsHtml += `<li>${creator.name} (${creator.role})</li>`;
            });
      
            creatorsHtml += '</ul>';
            creatorsDiv.innerHTML = creatorsHtml;
            serieDiv.appendChild(creatorsDiv);
          }
        });
      }  
});