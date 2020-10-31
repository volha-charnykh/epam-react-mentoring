import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import './film-item.scss';
import ThreeDotMenu from '../../../../../general/components/three-dot-menu/three-dot-menu';
import noImage from '../../../../../img/no-image.jpg';
import filmType from '../../../../util/prop-types/film.type';
import { menuItemType } from '../../../../../general/components/menu-panel/menu-panel';

// PATTERN: Function Component
export default function FilmItem(props) {
  const { clickHandler, actions, film } = props;
  const [displayMenu, setDisplayMenu] = useState(false);
  const onItemMouseOver = useCallback(() => setDisplayMenu(true), []);
  const onItemMouseLeave = useCallback(() => setDisplayMenu(false), []);
  const onItemClick = useCallback(() => clickHandler(), [clickHandler]);
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
                      items={actions}
                      onItemSelected={(el) => el.handle(props.film)}
                    />
                    )
                }
        <img
          className="FilmImage"
          onClick={onItemClick}
          src={film.poster_path || noImage}
          onError={onImageError}
          alt="film-logo"
        />
        <div className="FilmTitleContainer">
          <div className="FilmTitle">{film.title}</div>
          <div className="FilmReleaseDate">{(new Date(film.release_date)).getFullYear()}</div>
        </div>
        <div className="FilmGenres">{Array.isArray(film.genres) ? film.genres.join(', ') : ''}</div>
      </div>
    </>
  );
}

FilmItem.propTypes = {
  film: filmType.isRequired,
  clickHandler: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(menuItemType).isRequired,
};
