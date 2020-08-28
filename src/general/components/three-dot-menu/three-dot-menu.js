import React from 'react';
import './three-dot-menu.scss';
import MenuPanel, {menuItemType} from '../menu-panel/menu-panel';
import PropTypes from 'prop-types';
import {useToggle} from "../../hooks/toggle";

ThreeDotMenu.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    onItemSelected: PropTypes.func.isRequired
}

export default function ThreeDotMenu(props) {
    const [isMenuOpen, setMenuOpen] = useToggle(false);

    const onItemSelected = (el) => {
        setMenuOpen();
        props.onItemSelected(el);
    }

    return (<>
        {
            !isMenuOpen &&
            <div className='ThreeDots'
                onClick={() => setMenuOpen()}>
            </div>
        }
        {
            isMenuOpen &&
            <MenuPanel
                closable={true}
                items={props.items}
                onClick={() => setMenuOpen()}
                onItemSelected={onItemSelected}>
            </MenuPanel>
        }
    </>);
}
