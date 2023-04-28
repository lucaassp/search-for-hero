window.addEventListener('load', () => {
    
    const timeStamp = '1';
    const apiKey = 'd28ef029a68ad984b5e2be6fa65b6512';
    const md5 = '051c2c5faf0162b6e3b25682a3af5a58';

    const searchForm = document.getElementById('search-form-id');
    const searchInput = document.getElementById('search-input');
    const heroList = document.getElementById('hero-list');
    const heroThumbnail = document.getElementById('content-thumbnail');

    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const searchTerm = searchInput.value;
        const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`;

        console.log(url)

        fetch(url).then(response => response.json()).then(data => {
            const results = data.data.results;
            heroList.innerHTML = '';
            heroThumbnail.innerHTML = '';
            results.forEach(hero => {
                const heroDiv = document.createElement('div');
                heroDiv.classList.add('hero');
                const heroName = document.createElement('li');
                heroName.textContent = hero.name;
                heroDiv.appendChild(heroName);
                if (hero.thumbnail) {
                    const heroImg = document.createElement('img');
                    heroImg.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
                    heroThumbnail.innerHTML = '';
                    heroThumbnail.appendChild(heroImg);
                }
                heroList.appendChild(heroDiv);
            });
        })
        .catch(error => {
            console.error(error);
            heroList.innerHTML = '<p>Failed to load heroes. Please try again later.</p>';
        });

    })

})