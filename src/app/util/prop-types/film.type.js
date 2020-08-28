import PropTypes from "prop-types";

export const filmType = PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    releaseDate: PropTypes.string.isRequired,
    overview: PropTypes.string,
    url: PropTypes.string,
    rate: PropTypes.number,
    runtime: PropTypes.string
});
