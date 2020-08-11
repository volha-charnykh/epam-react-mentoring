import React, {useState} from 'react';
import './dropdown.scss';
import '../../styles/buttons.scss';
import MenuPanel, {menuItemType} from '../menu-panel/menu-panel';
import PropTypes from 'prop-types';

Dropdown.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    selected: menuItemType,
    onItemSelected: PropTypes.func.isRequired
}

export default function Dropdown(props) {
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] =
        useState(props.selected || props.items[0]);

    const onItemSelected = (el) => {
        console.log('Filter by ', el.title);
        setSelectedItem(el);
        setOpen(false);
        props.onItemSelected(el);
    }
    return (
        <div className='DropdownContainer'>
            <div
                className='DropdownButton'
                onClick={() => setOpen(!isOpen)}>
                {selectedItem.title}
            </div>
            {
                isOpen &&
                <MenuPanel
                    items={props.items}
                    onItemSelected={onItemSelected}>
                </MenuPanel>
            }
        </div>
    );
}
