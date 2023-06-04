window.addEventListener('load', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    const favoritesContainer = document.getElementById('favorites');
    favorites.forEach((hero, index) => {
      const heroCard = createHeroCard(hero, index);
      favoritesContainer.appendChild(heroCard);
    });
  
    function createHeroCard(hero, index) {
      const heroCard = document.createElement('div');
      heroCard.classList.add('hero-card');
      heroCard.id = `hero-${index}`;
  
      const heroImage = document.createElement('img');
      heroImage.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
      heroImage.alt = hero.name;
      heroImage.classList.add('hero-image');
  
      const heroName = document.createElement('p');
      heroName.textContent = hero.name;
      heroName.classList.add('hero-name-favorites');
  
      const removeIcon = document.createElement('i');
      removeIcon.classList.add('fa-solid', 'fa-minus');
      removeIcon.style.marginLeft = '5px';
      removeIcon.dataset.heroIndex = index; // Armazena o índice do herói no atributo personalizado
  
      removeIcon.addEventListener('click', () => {
        handleRemoveFavorite(index);
      });
  
      heroName.appendChild(removeIcon);
  
      heroCard.appendChild(heroImage);
      heroCard.appendChild(heroName);
  
      return heroCard;
    }
  
    function handleRemoveFavorite(index) {
      removeFavoriteFromLocalStorage(index);
      removeHeroCard(index);
    }
  
    function removeFavoriteFromLocalStorage(index) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  
    function removeHeroCard(index) {
      const heroCard = document.getElementById(`hero-${index}`);
      if (heroCard) {
        heroCard.remove();
      }
    }
  });
  