import React from 'react';
import '../../styles/dialog.scss';
import '../../styles/buttons.scss';
import '../../styles/form.scss';
import PropTypes from 'prop-types';
import Dialog from '../dialog/dialog';
import './result-popup.scss';

ResultPopup.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(['Success', 'Failure']),
  onClose: PropTypes.func.isRequired,
};

export default function ResultPopup(props) {
  return (
    <Dialog onClose={props.onClose}>
      <div className="Popup DialogContainer">
        <div className={`ResultIcon ${props.type}`} />
        <div className="DialogTitle">
          <div>{props.title}</div>
        </div>
        <div>{props.description}</div>
      </div>
    </Dialog>
  );
}
