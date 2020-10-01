import React from 'react';
import './viewer-header.scss';
import PropTypes from 'prop-types';
import '../../../../general/styles/buttons.scss';
import SearchBox from '../../../../general/components/search-box/search-box';

ViewerHeader.propTypes = {
    searchString: PropTypes.string,
    updateSearchStr: PropTypes.func.isRequired,
    onAddFilm: PropTypes.func.isRequired
}

export default function ViewerHeader(props) {
    return (
        <>
            <div className='TransparentButton HeaderRightCorner'
                onClick={() => props.onAddFilm()}>+ ADD MOVIE
            </div>
            <div className='SearchContainer'>
                <span className='SearchTitle'>Find your movie</span>
                <SearchBox searchString={props.searchString} search={props.updateSearchStr}/>
            </div>
        </>
    );
}
