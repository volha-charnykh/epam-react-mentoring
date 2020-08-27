import React from 'react';
import './panel.scss';
import PropTypes from 'prop-types';

Panel.propTypes = {
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
}

export default function Panel(props) {
    return (
        <div className='Panel'>
            {
                props.closable &&
                <span
                    className='PanelCloseMark'
                    tabIndex={0}
                    onClick={props.onClose}>x</span>
            }
            {
                props.children
            }
        </div>
    );
}
