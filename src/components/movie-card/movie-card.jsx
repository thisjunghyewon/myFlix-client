import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 mb-2">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
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
  onMovieClick: PropTypes.func.isRequired,
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
//     Description: PropTypes.string.isRequired
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired
// };
