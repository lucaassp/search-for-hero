window.addEventListener('load', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    const favoritesContainer = document.getElementById('favorites');
    favorites.forEach((hero) => {
      const heroCard = document.createElement('div');
      heroCard.classList.add('hero-card');
  
      const heroImage = document.createElement('img');
      heroImage.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
      heroImage.alt = hero.name;
      heroImage.classList.add('hero-image');
  
      const heroName = document.createElement('h2');
      heroName.textContent = hero.name;
      heroName.classList.add('hero-name');
  
      heroCard.appendChild(heroImage);
      heroCard.appendChild(heroName);
  
      favoritesContainer.appendChild(heroCard);
    });
  });
  