import Logo from '../../../general/components/logo/logo';
import React from 'react';
import './header.scss';
import PropTypes from 'prop-types';
import '../../../general/styles/buttons.scss';
import img from '../../../img/background-movies.jpg';
import SearchBox from '../../../general/components/search-box/search-box';

Header.propTypes = {
    updateSearchStr: PropTypes.func.isRequired,
    onAddFilm: PropTypes.func.isRequired
}

export default function Header(props) {
    return (
            <div className='Header'>
                <img src={img}
                    alt='header'
                    className='HeaderBackground'/>
                <div className='HeaderContainer'>
                    <Logo/>
                    <div className='TransparentButton'
                        onClick={() => props.onAddFilm()}>+ ADD MOVIE
                    </div>
                    <div className='SearchContainer'>
                        <span className='SearchTitle'>Find your movie</span>
                        <SearchBox search={ props.updateSearchStr}/>
                    </div>
                </div>
            </div>
    );
}
