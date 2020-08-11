import React from 'react';
import './layout.scss';
import PropTypes from 'prop-types';

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    footer: PropTypes.node,
    header: PropTypes.node
}

export default function Layout(props) {
    return (
        <div className='Layout'>
            {
                props.header && <div className='Layout-Header'>
                    {props.header}
                </div>
            }
            <div className='Layout-Content'>
                {props.children}
            </div>
            {
                props.footer && <div className='Layout-Footer'>
                    {props.footer}
                </div>
            }
        </div>
    );
}
