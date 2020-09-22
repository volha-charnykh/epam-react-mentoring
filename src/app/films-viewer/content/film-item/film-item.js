import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './film-item.scss';
import ThreeDotMenu from '../../../../general/components/three-dot-menu/three-dot-menu';
import noImage from '../../../../img/no-image.jpg';
import {filmType} from "../../../util/prop-types/film.type";


FilmItem.propTypes = {
    film: filmType.isRequired,
    clickHandler: PropTypes.func
}

export default function FilmItem(props) {
    const [displayMenu, setDisplayMenu] = useState(false);

    return (
        <>
            <div className='FilmItem'
                onMouseOver={() => setDisplayMenu(true)}
                onMouseLeave={() => setDisplayMenu(false)}>
                {
                    displayMenu &&
                    <ThreeDotMenu
                        items={props.actions}
                        onItemSelected={el => el.handle(props.film)}>
                    </ThreeDotMenu>
                }
                <img className='FilmImage'
                    onClick={() => props.clickHandler()}
                    src={props.film.poster_path || noImage}
                    onError={(e)=>{e.target.onerror = null; e.target.src=noImage}}
                    alt='film-logo'>
                </img>
                <div className='FilmTitleContainer'>
                    <div className='FilmTitle'>{props.film.title}</div>
                    <div className='FilmReleaseDate'>{(new Date(props.film.release_date)).getFullYear()}</div>
                </div>
                <div className='FilmGenres'>{Array.isArray(props.film.genres) ? props.film.genres.join(', ') : ''}</div>
            </div>
        </>
    );
}
