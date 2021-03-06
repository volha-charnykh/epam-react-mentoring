import React from 'react';
import './viewer-header.scss';
import PropTypes from 'prop-types';
import '../../../../general/styles/buttons.scss';
import SearchBox from '../../../../general/components/search-box/search-box';
import HeaderContainer from '../../../header/header-container';

export default function ViewerHeader(props) {
  const { onAddFilm, searchString, updateSearchStr } = props;
  return (
    <HeaderContainer height="300px">
      <div
        className="TransparentButton HeaderRightCorner"
        onClick={onAddFilm}
      >
        + ADD MOVIE
      </div>
      <div className="SearchContainer">
        <span className="SearchTitle">Find your movie</span>
        <SearchBox
          searchString={searchString}
          search={updateSearchStr}
        />
      </div>
    </HeaderContainer>
  );
}

ViewerHeader.propTypes = {
  searchString: PropTypes.string,
  updateSearchStr: PropTypes.func.isRequired,
  onAddFilm: PropTypes.func.isRequired,
};

ViewerHeader.defaultProps = {
  searchString: '',
};
