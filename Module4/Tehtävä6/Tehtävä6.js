const searchForm = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  resultsContainer.innerHTML = '';

  const query = document.querySelector('#query').value.trim();
  if (!query) return;

  try {
    const response = await fetch(
      `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    const searchResults = await response.json();
    searchResults.result.forEach((joke) => {
      const article = document.createElement('article');
      const paragraph = document.createElement('p');
      paragraph.textContent = joke.value;
      article.append(paragraph);
      resultsContainer.append(article);
    });
  } catch (error) {
    console.error('Could not search for jokes:', error);
    resultsContainer.textContent = 'Could not load jokes. Please try again.';
  }
});
