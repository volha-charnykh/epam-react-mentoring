import React, {useState} from 'react';
import './three-dot-menu.scss';
import MenuPanel, {menuItemType} from '../menu-panel/menu-panel';
import PropTypes from 'prop-types';

ThreeDotMenu.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onItemSelected: PropTypes.func.isRequired
}

export default function ThreeDotMenu(props) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [displayMenuIcon, setDisplayMenuIcon] = useState(false);

    const onItemSelected = (el) => {
        setMenuOpen(false);
        props.onItemSelected(el);
    }

    return (<>
        {
            displayMenuIcon && !isMenuOpen &&
            <div className='ThreeDots'
                onClick={() => setMenuOpen(!isMenuOpen)}>
            </div>
        }
        {
            props.children &&
            React.cloneElement(props.children, {onClick: () => setDisplayMenuIcon(!displayMenuIcon)})
        }
        {
            isMenuOpen &&
            <MenuPanel
                closable={true}
                items={props.items}
                onClose={() => {
                    setMenuOpen(false)
                    setDisplayMenuIcon(false)
                }}
                onItemSelected={onItemSelected}>
            </MenuPanel>
        }
    </>);
}
