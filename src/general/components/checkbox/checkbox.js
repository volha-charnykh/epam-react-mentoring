import React from 'react';
import './checkbox.scss';
import PropTypes from 'prop-types';

export default function Checkbox(props) {
  const { title, checked } = props;

  return (
    <label className="Checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => props.onCheck(event.target.checked)}
      />
      {title || ''}
      <span className="checkmark" />
    </label>
  );
}

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
};
