import React from 'react';
import './dialog.scss';
import '../../styles/dialog.scss';
import PropTypes from 'prop-types';

export default function Dialog(props) {
  const { onClose, children } = props;
  return (
    <>
      <div className="Dialog">
        <div
          className="DialogCloseMark"
          onClick={onClose}
        >
          <div className="Cross" tabIndex={0} />
        </div>
        {children}
      </div>
      <div className="DialogBackground" />
    </>
  );
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};
