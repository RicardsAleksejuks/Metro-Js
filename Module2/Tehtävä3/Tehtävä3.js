const dogs = [];

for (let i = 0; i < 6; i++) {
  dogs.push(prompt(`Enter the name of dog ${i + 1}:`));
}

dogs.sort((a, b) => b.localeCompare(a));

const dogList = document.getElementById("dogs");

for (const dog of dogs) {
  const listItem = document.createElement("li");
  listItem.textContent = dog;
  dogList.appendChild(listItem);
}
