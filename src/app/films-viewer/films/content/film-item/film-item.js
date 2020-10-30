import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './film-item.scss';
import ThreeDotMenu from '../../../../../general/components/three-dot-menu/three-dot-menu';
import noImage from '../../../../../img/no-image.jpg';
import { filmType } from '../../../../util/prop-types/film.type';

FilmItem.propTypes = {
  film: filmType.isRequired,
  clickHandler: PropTypes.func,
};

export default function FilmItem(props) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const onItemMouseOver = useCallback(() => setDisplayMenu(true), []);
  const onItemMouseLeave = useCallback(() => setDisplayMenu(false), []);
  const onItemClick = useCallback(() => props.clickHandler(), [props.clickHandler]);
  const onImageError = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = noImage;
  }, []);

  return (
    <>
      <div
        className="FilmItem"
        onMouseOver={onItemMouseOver}
        onMouseLeave={onItemMouseLeave}
      >
        {
                    displayMenu
                    && (
                    <ThreeDotMenu
                      items={props.actions}
                      onItemSelected={(el) => el.handle(props.film)}
                    />
                    )
                }
        <img
          className="FilmImage"
          onClick={onItemClick}
          src={props.film.poster_path || noImage}
          onError={onImageError}
          alt="film-logo"
        />
        <div className="FilmTitleContainer">
          <div className="FilmTitle">{props.film.title}</div>
          <div className="FilmReleaseDate">{(new Date(props.film.release_date)).getFullYear()}</div>
        </div>
        <div className="FilmGenres">{Array.isArray(props.film.genres) ? props.film.genres.join(', ') : ''}</div>
      </div>
    </>
  );
}
