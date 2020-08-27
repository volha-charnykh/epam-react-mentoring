import PropTypes from "prop-types";
import React from 'react';
import './form-item.scss';
import '../../styles/form.scss';
import DropdownSelector from "../dropdown-selector/dropdown-selector";

FormItem.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['Text', 'Date', 'Dropdown', 'Not-Editable']).isRequired,
    value: PropTypes.node,
    available: PropTypes.arrayOf(PropTypes.string),
    updateValue: PropTypes.func.isRequired
}

export default function FormItem(props) {
    const placeholder = props.label.charAt(0).toUpperCase() + props.label.slice(1).toLocaleLowerCase() + ' here';

    return (
        <>
            <label className='FormItemLabel'>
                {props.label}
                {
                    (props.type === 'Text' || props.type === 'Date') &&
                    <input
                        id={props.label}
                        className="Input FormItemInput"
                        name={props.label}
                        placeholder={placeholder}
                        type={props.type.toLowerCase()}
                        value={props.value}
                        onChange={(event) => props.updateValue(event.target.value)}
                    />
                }
                {
                    props.type === 'Not-Editable' &&
                    <div className="NotEditableFormItem">{props.value}</div>
                }
            </label>
            {
                props.type === 'Dropdown' &&
                <DropdownSelector
                    defaultTitle={'Select ' + props.label}
                    available={props.available}
                    selected={props.value || []}
                    onSelect={props.updateValue}/>
            }
        </>
    );
}
