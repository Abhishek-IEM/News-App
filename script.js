let key = "0940d14c8ef14d4faf1ff9f20a8d0bb0";
let cardData = document.querySelector(".cardData");
let SearchBtn = document.getElementById("searchBtn");
let inputData = document.getElementById("inputData");
let searchType = document.getElementById("type");
let loader = document.getElementById("loader");
let darkModeBtn = document.getElementById("darkModeBtn");

const getData = async (input) => {
  loader.style.display = "block";
  cardData.innerHTML = "";
  searchType.innerText = `Search: ${input}`;

  try {
    let res = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`
    );
    let jsonData = await res.json();
    loader.style.display = "none";

    if (!jsonData.articles || jsonData.articles.length === 0) {
      cardData.innerHTML = "<p style='text-align:center;'>No news found.</p>";
      return;
    }

    jsonData.articles.forEach((article) => {
      let divs = document.createElement("div");
      divs.classList.add("card");

      divs.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="News Image" />
        <h3>${article.title || 'No title available'}</h3>
        <p>${article.description || 'No description available'}</p>
      `;

      divs.addEventListener("click", function () {
        window.open(article.url, "_blank", "noopener");
      });

      cardData.appendChild(divs);
    });
  } catch (error) {
    loader.style.display = "none";
    cardData.innerHTML = "<p style='text-align:center;color:red;'>Error loading news.</p>";
  }
};

window.addEventListener("load", function () {
  getData("India");
});


SearchBtn.addEventListener("click", function () {
  let inputText = inputData.value.trim();
  if (inputText) getData(inputText);
  inputData.value = "";
});

inputData.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    let inputText = inputData.value.trim();
    if (inputText) getData(inputText);
    inputData.value = "";
  }
});

function navClick(navName) {
  document.querySelectorAll(".logo li").forEach((li) => li.classList.remove("active"));
  document.getElementById(navName).classList.add("active");
  getData(navName);
}

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkModeBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});
