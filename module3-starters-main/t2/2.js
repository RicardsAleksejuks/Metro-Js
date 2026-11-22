const target = document.getElementById("target");
const items = ["First item", "Second item", "Third item"];

items.forEach((text, index) => {
  const item = document.createElement("li");
  item.textContent = text;

  if (index === 1) {
    item.classList.add("my-item");
  }

  target.appendChild(item);
});
