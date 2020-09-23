import PropTypes from "prop-types";
import React from 'react';
import '../../styles/form.scss';
import {useField} from "formik";

FormItem.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'date']).isRequired
}

export default function FormItem(props) {
    const [field, meta] = useField(props);
    const placeholder = props.label.charAt(0).toUpperCase() + props.label.slice(1).toLocaleLowerCase() + ' here';

    return (
        <>
            <label className='FormItemLabel'>
                {props.label}
                    <input
                        id={props.label}
                        className={`Input FormItemInput ${meta.error ? 'Invalid' : ''}`}
                        name={props.label}
                        placeholder={placeholder}
                        type={props.type}
                        {...field}
                    />
            </label>
            {meta.error && (
                <div className="InputError">{meta.error}</div>
            )}
        </>
    );
}
