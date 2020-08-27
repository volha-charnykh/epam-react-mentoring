import React from 'react';
import '../../../general/styles/dialog.scss';
import '../../../general/styles/buttons.scss';
import PropTypes from "prop-types";
import Dialog from "../../../general/components/dialog/dialog";
import {filmType} from "../../films-viewer/content/film-item/film-item";


DeleteDialog.propTypes = {
    film: filmType,
    onDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default function DeleteDialog(props) {

    return (
        <Dialog onClose={() => props.onClose()}>
            <div className="DialogContainer">
                <div className='DialogTitle'>
                    Delete Movie
                </div>
                <div className="DialogDescription">
                    Are you sure you want to delete this movie?
                </div>
            </div>
            <div className="DialogActionContainer">
                <div key="Confirm"
                    className="PrimaryButton"
                    onClick={() => props.onDelete(props.film)}>
                    Confirm
                </div>
            </div>
        </Dialog>
    );
}
