// public/index.js

// variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];
const fetchNews = async () => {
    const response = await fetch('/api/news');
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}



window.onload = function () {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchNews();
};

generalBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>General news</h4>";
    fetchNews('general');
});

businessBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchNews('business');
});

sportsBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchNews('sports');
});

entertainmentBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchNews('entertainment');
});

technologyBtn.addEventListener("click", function () {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchNews('technology');
});

searchBtn.addEventListener("click", function () {
    newsType.innerHTML = `<h4>Search : ${newsQuery.value}</h4>`;
    fetchNews('', newsQuery.value);
});

function displayNews() {
    newsdetails.innerHTML = "";

    if (newsDataArr.length === 0) {
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    newsDataArr.forEach(news => {
        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        var link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}


