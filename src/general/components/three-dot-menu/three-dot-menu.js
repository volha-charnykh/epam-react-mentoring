import React, {useState} from 'react';
import './three-dot-menu.scss';
import MenuPanel, {menuItemType} from '../menu-panel/menu-panel';
import PropTypes from 'prop-types';

ThreeDotMenu.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    onItemSelected: PropTypes.func.isRequired
}

export default function ThreeDotMenu(props) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const onItemSelected = (el) => {
        setMenuOpen(false);
        props.onItemSelected(el);
    }

    return (<>
        { !isMenuOpen &&
        <div className='ThreeDots'
            onClick={() => setMenuOpen(!isMenuOpen)}>
        </div>
        }
        {
            isMenuOpen &&
            <MenuPanel
                closable={true}
                items={props.items}
                onClose={() => setMenuOpen(!isMenuOpen)}
                onItemSelected={onItemSelected}>
            </MenuPanel>
        }
    </>);
}
