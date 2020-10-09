import React from 'react';
import '../../../general/styles/dialog.scss';
import '../../../general/styles/buttons.scss';
import PropTypes from "prop-types";
import Dialog from "../../../general/components/dialog/dialog";
import {filmType} from "../../../app/util/prop-types/film.type";

ConfirmationDialog.propTypes = {
    film: filmType,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default function ConfirmationDialog(props) {

    return (
        <Dialog onClose={() => props.onClose()}>
            <div className="DialogContainer">
                <div className='DialogTitle'>
                    {props.title}
                </div>
                <div className="DialogDescription">
                    {props.description}
                </div>
            </div>
            <div className="DialogActionContainer">
                <div key="Confirm"
                    className="PrimaryButton"
                    onClick={() => props.onConfirm()}>
                    Confirm
                </div>
            </div>
        </Dialog>
    );
}