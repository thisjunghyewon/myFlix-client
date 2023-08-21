import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  //creates state changes for selected movies
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://mymovieflix-3d9c07cffa0d.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Release: movie.Release,
            Cast: movie.Cast,
            Genre: { Name: movie.Genre.Name },
            Director: { Name: movie.Director.Name },
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  //statement for movies selected to show movie view details and includes code for when clicking the back button to go list of movies
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  //if there is no movie in the array, the page will say
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  //return statement for movies in the array being displayed and being clickable from MovieCard file
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.Title}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
