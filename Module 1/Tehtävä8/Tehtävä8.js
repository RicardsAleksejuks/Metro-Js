const startYear = Number(prompt("Enter the start year:"));
const endYear = Number(prompt("Enter the end year:"));
const yearList = document.getElementById("leap-years");

for (let year = startYear; year <= endYear; year++) {
    const isLeapYear = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);

    if (isLeapYear) {
        const listItem = document.createElement("li");
        listItem.textContent = year;
        yearList.appendChild(listItem);
    }
}
