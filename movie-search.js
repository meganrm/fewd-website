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
  // debugger
  // Try putting a debugger here and inspecting the results argument
  // The array of movies lives inside results["Search"]
  // See the sampleResult above for an example

  // Access the array of movies:
  // results["Search"]
 var addedmovies= $('.movie');
 for (var i = 0; i < addedmovies.length; i++) {
   movielist.removeChild(addedmovies[i]);
 }
 if (results['Search']) {

  for (var i = 0; i < results['Search'].length; i++) {
    var li = newTagText('li', movielist);
    li.classList.add("movie");
    var div = newTagText('div', li);
    div.classList.add("movie-title");
    var a = newTagText('a', div,   results["Search"][i]["Title"]
);
     a.setAttribute("href",   results["Search"][i]["Poster"])
     var div = newTagText('div', li, results["Search"][i]["Year"]);
     div.classList.add("movie-release-date");
  };
}
  else{
    alert("There no movies named anything close to what you typed, please try again.")
  };

  // Access the first movie title
  // results["Search"][0]["Poster"]
};
