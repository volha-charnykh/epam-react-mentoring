import PropTypes from 'prop-types';
import React from 'react';
import '../../styles/form.scss';
import { useField } from 'formik';

// PATTERN: JSX spread attributes
export default function FormItem(props) {
  const [field, meta] = useField(props);
  const { label, type } = props;
  const placeholder = `${label.charAt(0).toUpperCase() + label.slice(1).toLocaleLowerCase()} here`;

  return (
    <>
      <label className="FormItemLabel" htmlFor={label}>
        {label}
        <input
          id={label}
          className={`Input FormItemInput ${meta.error ? 'Invalid' : ''}`}
          name={label}
          placeholder={placeholder}
          type={type}
          {...field}
        />
      </label>
      {meta.error && (
      <div className="InputError">{meta.error}</div>
      )}
    </>
  );
}

FormItem.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'date']).isRequired,
};
