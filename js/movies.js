$(document).ready(function() {
  $('#movies').DataTable();
});

(function() {

  // all api keys should not be exposed in a real app. Should be hidden in the backend
  const api = "https://www.omdbapi.com/?apikey=c077cec3&t=";
  const movieInput = document.getElementById('movie-search');
  const movieSearchBtn = document.getElementById('movie-search__button');
  const searchResults = document.getElementsByClassName('search-results')[0];

  let movieImage = document.getElementsByClassName('movie-image')[0];
  let movieTitle = document.getElementsByClassName('movie-title')[0];
  let moviePlot = document.getElementsByClassName('movie-plot')[0];
  let movieDirector = document.getElementsByClassName('movie-director')[0];
  let movieRating = document.getElementsByClassName('movie-rating')[0];

  function onMovieSearch() {
    let movie = movieInput.value.replace(/ /g, '+');

    fetch(`${api}${movie}`)
      .then(res => {
        return(res.json());
      })
      .then(movie => {
        movieImage.setAttribute('src', movie.Poster)
        movieTitle.innerHTML = `${movie.Title} (${movie.Year})`;
        moviePlot.innerHTML = movie.Plot;
        movieDirector.innerHTML = `Director: ${movie.Director}`;
        movieRating.innerHTML = `${movie.imdbRating}/10`;
        searchResults.style.display = 'block';
        })
      .catch(err => {
        console.log(err);
      })
  }

  function onEnterMovieSearch(e) {
    if (e.which === 13) {
      onMovieSearch();
    }
  }

  movieSearchBtn.addEventListener('click', onMovieSearch);
  movieInput.addEventListener('keydown', onEnterMovieSearch);

})();
