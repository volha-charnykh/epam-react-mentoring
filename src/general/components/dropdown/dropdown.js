import React, {useMemo} from 'react';
import './dropdown.scss';
import '../../styles/buttons.scss';
import MenuPanel, {menuItemType} from '../menu-panel/menu-panel';
import PropTypes from 'prop-types';
import {useToggle} from "../../hooks/toggle";

Dropdown.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    selected: menuItemType,
    hideTriangle: PropTypes.bool,
    onItemSelected: PropTypes.func.isRequired
}

export default function Dropdown(props) {
    const [isOpen, setOpen] = useToggle();

    const title = useMemo(() => props.selected && props.selected.title || 'Select Option',
        [props.selected.title]);

    const onItemSelected = (el) => {
        setOpen();
        props.onItemSelected(el);
    }
    return (
        <div className='DropdownContainer'>
            <div
                className={`DropdownButton ${!props.hideTriangle &&'DropdownButtonTriangle'}`}
                onClick={() => setOpen()}>
                {title}
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
