import React from 'react';
import './dialog.scss';
import '../../styles/dialog.scss';
import PropTypes from 'prop-types';

Dialog.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
}


export default function Dialog(props) {
    return (
        <>
            <div className='Dialog'>
                <div
                    className='DialogCloseMark'
                    onClick={props.onClose}>
                    <div className="Cross" tabIndex={0}>

                    </div>
                </div>
                {props.children}
            </div>
            <div className="DialogBackground">

            </div>
        </>
    );
}
