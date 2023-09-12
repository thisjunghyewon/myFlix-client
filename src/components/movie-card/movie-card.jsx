import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100 mb-2">
      <Card.Img variant="top" src={movie.ImagePath} className="w-100" />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="outline-info">See more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.object.isRequired,
    Release: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Cast: PropTypes.array.isRequired,
    Featured: PropTypes.bool,
    Genre: PropTypes.object.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Director: PropTypes.string,
//     Release: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Cast: PropTypes.array.isRequired,
//     Featured: PropTypes.boolean,
//     Genre: PropTypes.string,
//     Description: PropTypes.string.isRequired,
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired,
// };
