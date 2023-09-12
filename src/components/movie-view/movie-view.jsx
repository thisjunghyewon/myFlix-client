import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
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
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Release: </span>
        <span>{movie.Release}</span>
      </div>
      <div>
        <img className="w-100 h-100" src={movie.ImagePath} alt="" />
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Cast: </span>
        <span>{movie.Cast}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.Featured}</span>
      </div>

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
    </div>
  );
};
