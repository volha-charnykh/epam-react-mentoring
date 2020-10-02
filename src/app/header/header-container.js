import Logo from '../../general/components/logo/logo';
import React from 'react';
import './header-container.scss';
import '../../general/styles/buttons.scss';
import img from '../../img/background-movies.jpg';

export default function HeaderContainer(props) {

    return (
        <div className='HeaderContainer' style={{height: (props.height || '100%')}}>
            <img
                src={img}
                alt='header'
                className='HeaderBackground'/>
            <div className='HeaderContent'>
                <Logo/>
                {
                   props.children
                }
            </div>
        </div>
    );
}
