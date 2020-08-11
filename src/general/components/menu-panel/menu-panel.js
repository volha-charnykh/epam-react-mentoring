import React, {useState} from 'react';
import './menu-panel.scss';
import PropTypes from 'prop-types';

export const menuItemType = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
});

MenuPanel.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    closable: PropTypes.bool,
    onItemSelected: PropTypes.func.isRequired
}

export default function MenuPanel(props) {
    const [items] = useState(props.items);
    const [displayClose] = useState(props.closable);

    return (
        <div className='MenuPanel'>
            {
                displayClose &&
                <span
                    className='MenuPanelCloseMark'
                    onClick={props.onClose}>x</span>
            }
            {
                items.map(item =>
                    <span
                        className='MenuPanelItem'
                        key={item.id}
                        onClick={() => props.onItemSelected(item)}>
                            {item.title}
                    </span>
                )
            }
        </div>
    );
}
