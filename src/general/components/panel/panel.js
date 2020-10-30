import React from 'react';
import './panel.scss';
import PropTypes from 'prop-types';

export default function Panel(props) {
  const { closable, onClose, children } = props;

  return (
    <div className="Panel">
      {
                closable
                && (
                <span
                  className="PanelCloseMark"
                  tabIndex={0}
                  onClick={onClose}
                >
                  x
                </span>
                )
            }
      {
                children
            }
    </div>
  );
}

Panel.propTypes = {
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Panel.defaultProps = {
  closable: false,
  onClose: () => console.error('Panel props onClose isn\'t provided'),
};
