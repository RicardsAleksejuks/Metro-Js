const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = document.querySelector('#query').value.trim();
  if (!query) return;

  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error(`TVMaze request failed: ${response.status}`);

    const shows = await response.json();
    console.log('TVMaze search results:', shows);
  } catch (error) {
    console.error('Could not retrieve TVMaze search results:', error);
  }
});
