const searchForm = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  resultsContainer.innerHTML = '';

  const query = document.querySelector('#query').value.trim();
  if (!query) return;

  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error(`TVMaze request failed: ${response.status}`);

    const tvShows = await response.json();
    tvShows.forEach((tvShow) => {
      const show = tvShow.show;
      const article = document.createElement('article');

      const heading = document.createElement('h2');
      heading.textContent = show.name;
      article.append(heading);

      const link = document.createElement('a');
      link.href = show.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = show.url;
      article.append(link);

      const image = document.createElement('img');
      image.src = show.image && show.image.medium
        ? show.image.medium
        : 'https://placehold.co/210x295?text=Not%20Found';
      image.alt = show.name;
      article.append(image);

      const summary = document.createElement('div');
      summary.innerHTML = show.summary ?? '';
      article.append(summary);

      resultsContainer.append(article);
    });
  } catch (error) {
    console.error('Could not retrieve TVMaze search results:', error);
    resultsContainer.textContent = 'Could not load search results. Please try again.';
  }
});
