const candidateCount = Number(prompt("How many candidates are there?"));
const candidates = [];

for (let i = 0; i < candidateCount; i++) {
  const name = prompt(`Name for candidate ${i + 1}`);
  candidates.push({ name, votes: 0 });
}

const voterCount = Number(prompt("How many voters are there?"));

for (let i = 0; i < voterCount; i++) {
  const vote = prompt(`Voter ${i + 1}, enter the name of your candidate (or leave blank):`).trim();

  if (vote !== "") {
    const candidate = candidates.find(
      (item) => item.name.toLowerCase() === vote.toLowerCase(),
    );

    if (candidate) {
      candidate.votes++;
    }
  }
}

candidates.sort((a, b) => b.votes - a.votes);

if (candidates.length > 0) {
  console.log(`The winner is ${candidates[0].name} with ${candidates[0].votes} votes.`);
  console.log("results:");

  for (const candidate of candidates) {
    console.log(`${candidate.name}: ${candidate.votes} votes`);
  }
} else {
  console.log("There are no candidates.");
}
