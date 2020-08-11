import Logo from '../../general/components/logo/Logo';
import React from 'react';
import './header.scss';
import '../../general/styles/buttons.scss';
import img from '../../img/background-movies.jpg';
import SearchBox from '../../general/components/search-box/search-box';

export default function Header() {
    const search = (str) => {
        console.log('Find ', str);
    }
    return (
        <div className='Header'>
            <img src={img}
                alt='header'
                className='HeaderBackground'/>
            <div className='HeaderContainer'>
                <Logo/>
                <div className='TransparentButton'>+ ADD MOVIE</div>
                <div className='SearchContainer'>
                    <span className='SearchTitle'>Find your movie</span>
                    <SearchBox search={search}/>
                </div>
            </div>
        </div>
    );
}
