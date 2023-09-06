import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

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
      <Link to={`/`}>
        <Button variant="outline=info" onClick={onBackClick}>
          Back
        </Button>
      </Link>
    </div>
  );
};
