import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './film-item.scss';
import ThreeDotMenu from '../../../general/components/three-dot-menu/three-dot-menu';
import noImage from '../../../img/no-image.jpg';

const threeDotMenuItems = [
    {id: 0, title: 'Edit'},
    {id: 1, title: 'Delete'},
];

FilmItem.propTypes = {
    film: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        releaseDate: PropTypes.string.isRequired,
        overview: PropTypes.string
    }),
    onMenuItemSelected: PropTypes.func.isRequired
}

export default function FilmItem(props) {
    const [film] = useState(props.film);
    const [displayMenuIcon, setDisplayMenuIcon] = useState(false);

    const onMenuItemSelected = (el) => {
        setDisplayMenuIcon(false);
        props.onMenuItemSelected(el);
    }


    return (
        <div className='FilmItem'>
            <img className='FilmImage'
                src={film.image || noImage}
                alt='film-logo'
                onClick={() => setDisplayMenuIcon(!displayMenuIcon)}>
            </img>
            {displayMenuIcon &&
            <ThreeDotMenu
                items={threeDotMenuItems}
                onItemSelected={onMenuItemSelected}>
            </ThreeDotMenu>}
            <div className='FilmTitleContainer'>
                <div className='FilmTitle'>{film.title}</div>
                <div className='FilmReleaseDate'>{film.releaseDate}</div>
            </div>
            <div className='FilmOverview'>{film.overview || ''}</div>
        </div>);
}
