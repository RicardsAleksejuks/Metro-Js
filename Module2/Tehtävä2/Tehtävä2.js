const participantCount = Number(prompt("How many participants are there?"));
const participants = [];

for (let i = 0; i < participantCount; i++) {
  const name = prompt(`Enter the name of participant ${i + 1}:`);
  participants.push(name);
}

participants.sort((a, b) => a.localeCompare(b));

const participantList = document.getElementById("participants");

for (const name of participants) {
  const listItem = document.createElement("li");
  listItem.textContent = name;
  participantList.appendChild(listItem);
}
