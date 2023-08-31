import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
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
