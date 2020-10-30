import React from 'react';
import '../../styles/dialog.scss';
import '../../styles/buttons.scss';
import PropTypes from 'prop-types';
import Dialog from '../dialog/dialog';

ConfirmationDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function ConfirmationDialog(props) {
  return (
    <Dialog onClose={props.onClose}>
      <div className="DialogContainer">
        <div className="DialogTitle">
          {props.title}
        </div>
        <div className="DialogDescription">
          {props.description}
        </div>
      </div>
      <div className="DialogActionContainer">
        <div
          key="Confirm"
          className="PrimaryButton"
          onClick={props.onConfirm}
        >
          Confirm
        </div>
      </div>
    </Dialog>
  );
}
