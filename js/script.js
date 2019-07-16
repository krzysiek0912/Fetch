const tweetLink = "https://twitter.com/intent/tweet?text=",
  quoteUrl =
    "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
  prefix = "https://cors-anywhere.herokuapp.com/";

function getQuote() {
  let random = Math.floor(Math.random() * 1000 + 1);
  fetch(prefix + quoteUrl + "&random=" + random, { cache: "no-store" })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(resp) {
      createTweet(resp);
    });
}

function createTweet(input) {
  document.querySelector(".spinner").style.display = "block";
  document.querySelector(".box").style.display = "none";
  let data = input[0];

  let dataElement = document.createElement("div");
  dataElement.innerHTML = data.content;
  let quoteText = dataElement.innerText.trim(),
    quoteAuthor = data.title;
  if (!quoteAuthor.length) {
    quoteAuthor = "Unknown author";
  }

  tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

  if (tweetText.length > 140) {
    getQuote();
  } else {
    document.querySelector(".spinner").style.display = "none";
    var tweet = tweetLink + encodeURIComponent(tweetText);
    document.querySelector(".quote").innerText = quoteText;
    document.querySelector(".author").innerText = "Author: " + quoteAuthor;
    document.querySelector(".tweet").setAttribute("href", tweet);
    document.querySelector(".box").style.display = "block";
  }
  return tweetText;
}

getQuote();

document.querySelector(".trigger").addEventListener("click", function() {
  getQuote();
});
