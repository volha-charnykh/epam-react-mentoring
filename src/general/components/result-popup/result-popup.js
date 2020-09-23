import React from 'react';
import '../../../general/styles/dialog.scss';
import '../../../general/styles/buttons.scss';
import '../../../general/styles/form.scss';
import PropTypes from "prop-types";
import Dialog from "../../../general/components/dialog/dialog";
import './result-popup.scss';

ResultPopup.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.oneOf(['Success', 'Failure']),
    onClose: PropTypes.func.isRequired
}

export default function ResultPopup(props) {

    return (
        <Dialog onClose={() => props.onClose()}>
            <div className="Popup DialogContainer">
                <div className={`ResultIcon ${props.type}`}>
                </div>
                <div className='DialogTitle'>
                    <div>{props.title}</div>
                </div>
                <div>{props.description}</div>
            </div>
        </Dialog>
    );
}
