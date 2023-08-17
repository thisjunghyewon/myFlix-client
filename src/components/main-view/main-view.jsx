import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Silence of the Lambs",
      Director: "Jonathan Demme",
      ImageURL:
        "https://m.media-amazon.com/images/M/MV5BMTMwMzY0ODU0N15BMl5BanBnXkFtZTcwMTU3NDY3Mw@@._V1_FMjpg_UX685_.jpg",
    },
    {
      id: 2,
      Title: "The Fabelmans",
      Director: "Steven Spielberg",
      ImageURL:
        "https://m.media-amazon.com/images/M/MV5BZDAxN2Y0MjctNjU2OS00ZGJmLTkyNmQtNDE4OGYxYWIwOGQ0XkEyXkFqcGdeQXVyNTk5NTQzNDI@._V1_FMjpg_UX1920_.jpg",
    },
    {
      id: 3,
      Title: "Schindler's List",
      Director: "Steven Spielberg",
      ImageURL:
        "https://m.media-amazon.com/images/M/MV5BMTc4NTA1OTE4Nl5BMl5BanBnXkFtZTcwODA2MDAxMw@@._V1_FMjpg_UX2048_.jpg",
    },
    {
      id: 4,
      Title: "Little Women",
      Director: "Greta Gerwig",
      ImageURL:
        "https://m.media-amazon.com/images/M/MV5BODk3ZGZmNmUtYjQ2ZC00ZTJiLThiZTgtYjI2OWNkMDZiODNlXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1000_.jpg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
