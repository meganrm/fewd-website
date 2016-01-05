// This is what the data returning from IMDB will look like:
var sampleResult = {
  "Search": [
    {
      "Title": "Cool Runnings",
      "Type": "movie",
      "Year": "1993",
      "imdbID": "tt0106611"
    }
  ]
}

// Attach an event listener to the form submit (using jQuery)
$("#movie-search-form").submit(formSubmitted);

// Handle the form submission: go to OMDB and get results
function formSubmitted(event) {
  event.preventDefault();
  var url = "http://omdbapi.com/?s=" + $("#query").val();
  $.get(url, resultsReceived);
}
var movielist= document.querySelector('#movies')

function resultsReceived(results) {

 var addedmovies= $('.movie');
 for (var i = 0; i < addedmovies.length; i++) {
   movielist.removeChild(addedmovies[i]);
 }
 if (results['Search']) {

  for (var i = 0; i < results['Search'].length; i++) {
    var movie=results["Search"][i];
    createMovie(movie['Title'], movie["imdbID"], movie["Year"])
  };
}
  else{
    alert("There no movies named anything close to what you typed, please try again.")
  };
}

function createMovie(movietitle, id, date) {
  // body...
  var li = $('<li>');
  var title = $('<div>');
  var url = "http://www.imdb.com/title/"+id;

  li.appendTo('#movies').addClass("movie");

  title.appendTo(li).addClass("movie-title");
  $('<a>').text(movietitle).attr("href", url).appendTo(title);

  $("<div>").text(date).addClass("movie-release-date").appendTo(li);

  // Access the first movie title
  // results["Search"][0]["Poster"]
};
