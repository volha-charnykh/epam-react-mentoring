import React from 'react';
import PropTypes from 'prop-types';
import './film-item.scss';
import ThreeDotMenu from '../../../../general/components/three-dot-menu/three-dot-menu';
import noImage from '../../../../img/no-image.jpg';


export const filmType = PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    releaseDate: PropTypes.string.isRequired,
    overview: PropTypes.string,
    url: PropTypes.string,
    runtime: PropTypes.string
});

FilmItem.propTypes = {
    film: filmType.isRequired
}

export default function FilmItem(props) {
    return (
        <>
            <div className='FilmItem'>
                <ThreeDotMenu
                    items={props.actions}
                    onItemSelected={el => el.handle(props.film)}>
                    <img className='FilmImage'
                        src={props.film.image || noImage}
                        alt='film-logo'>
                    </img>
                </ThreeDotMenu>
                <div className='FilmTitleContainer'>
                    <div className='FilmTitle'>{props.film.title}</div>
                    <div className='FilmReleaseDate'>{props.film.releaseDate}</div>
                </div>
                <div className='FilmOverview'>{props.film.overview || ''}</div>
            </div>
        </>
    );
}
