import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";
// import { useSelector } from "react-redux";

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  const [isFavorite, setIsFavorite] = useState(true);

  useEffect(() => {
    const isFavorited = user.Favorite_movies.includes(movieId);
    setIsFavorite(isFavorited);
  }, []);

  const addToFavorite = () => {
    fetch(
      `https://mymovieflix-3d9c07cffa0d.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsFavorite(true);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      });
  };

  const removeFavorite = () => {
    fetch(
      `https://mymovieflix-3d9c07cffa0d.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Somethins is wrong");
          return false;
        }
      })
      .then((data) => {
        setIsFavorite(false);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      });
  };

  return (
    <Card className="w-100 h-100">
      <Card.Img variant="top" src={movie.ImagePath} alt="Movie image" />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Card.Text>Release: {movie.Release}</Card.Text>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Card.Text>Cast: {movie.Cast}</Card.Text>
        <Card.Text>Featured: {movie.Featured}</Card.Text>
      </Card.Body>

      {isFavorite ? (
        <Button variant="danger" onClick={removeFavorite}>
          Remove from Favorite List.
        </Button>
      ) : (
        <Button variant="success" onClick={addToFavorite}>
          Add to Favorite List.
        </Button>
      )}

      <Link to={`/`}>
        <Button variant="outline=info">Back</Button>
      </Link>
    </Card>
  );
};
