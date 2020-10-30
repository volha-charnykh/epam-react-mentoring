import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  release_date: PropTypes.string.isRequired,
  overview: PropTypes.string,
  vote_average: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
  runtime: PropTypes.number,
  budget: PropTypes.number,
  revenue: PropTypes.number,
  tagline: PropTypes.string,
  vote_count: PropTypes.number,
});
