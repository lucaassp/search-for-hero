// Recupera os heróis favoritos do armazenamento local e exibe na página
window.addEventListener('load', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const favoritesContainer = document.getElementById('favorites');
    favorites.forEach((hero) => {
      const heroDiv = document.createElement('div');
      heroDiv.innerHTML = `
        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}">
        <p>${hero.name}</p>
      `;
      favoritesContainer.appendChild(heroDiv);
    });
});