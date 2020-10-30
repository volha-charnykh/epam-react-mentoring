import React from 'react';
import '../../styles/dialog.scss';
import '../../styles/buttons.scss';
import '../../styles/form.scss';
import PropTypes from 'prop-types';
import Dialog from '../dialog/dialog';
import './result-popup.scss';

export default function ResultPopup(props) {
  const {
    type, title, description, onClose,
  } = props;
  return (
    <Dialog onClose={onClose}>
      <div className="Popup DialogContainer">
        <div className={`ResultIcon ${type}`} />
        <div className="DialogTitle">
          <div>{title}</div>
        </div>
        <div>{description}</div>
      </div>
    </Dialog>
  );
}

ResultPopup.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(['Success', 'Failure']).isRequired,
  onClose: PropTypes.func.isRequired,
};

ResultPopup.defaultProps = {
  description: '',
};
