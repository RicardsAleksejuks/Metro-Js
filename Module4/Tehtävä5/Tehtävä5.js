async function getRandomJoke() {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    const joke = await response.json();
    console.log(joke.value);
  } catch (error) {
    console.error('Could not retrieve a joke:', error);
  }
}

getRandomJoke();
