import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://mymovieflix-3d9c07cffa0d.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Director: movie.Director,
            Release: movie.Release,
            ImagePath: movie.ImagePath,
            Genre: movie.Genre,
            Description: movie.Description,
            Cast: movie.Cast,
            Featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={5} className="form-bg-style">
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <span>or</span>
          <SignupView />
        </Col>
      </Row>
    );
  }
  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </>
      ) : selectedMovie ? (
        <Col md={4}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-2" key={movie.id} md={6}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </>
      )}
    </Row>
  );
};
