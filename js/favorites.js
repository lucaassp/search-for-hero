window.addEventListener('load', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    const favoritesContainer = document.getElementById('favorites');
    favorites.forEach((hero) => {
      const heroCard = document.createElement('div');
      heroCard.classList.add('hero-card');
      heroCard.id = `hero-${hero.id}`;
  
      const heroImage = document.createElement('img');
      heroImage.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
      heroImage.alt = hero.name;
      heroImage.classList.add('hero-image');
  
      const heroName = document.createElement('p');
      heroName.textContent = hero.name;
      heroName.classList.add('hero-name');
  
      const removeIcon = document.createElement('i');
      removeIcon.classList.add('fa-solid', 'fa-minus');
      removeIcon.style.marginLeft = '5px';
      removeIcon.addEventListener('click', () => {
        removeFavorite(hero);
      });
  
      heroName.appendChild(removeIcon);
  
      heroCard.appendChild(heroImage);
      heroCard.appendChild(heroName);
  
      favoritesContainer.appendChild(heroCard);
    });
  
    function removeFavorite(hero) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = favorites.filter((favorite) => favorite.id !== hero.id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        const heroCard = document.getElementById(`hero-${hero.id}`);
        heroCard.remove();
    }
  });
  