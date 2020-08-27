import React, {useState} from 'react';
import './dropdown-selector.scss';
import '../../styles/buttons.scss';
import PropTypes from 'prop-types';
import Checkbox from "../checkbox/checkbox";
import Panel from "../panel/panel";


DropdownSelector.propTypes = {
    defaultTitle: PropTypes.string,
    selected: PropTypes.arrayOf(PropTypes.string),
    available: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired
}

export default function DropdownSelector(props) {
    const [isOpen, setOpen] = useState(false);

    let allItems = props.available.map(el => ({title: el}));
    if (Array.isArray(props.selected) && props.selected.length) {
        allItems.forEach(el => {
                el.checked = props.selected.includes(el.title);
            }
        );
    }

    const [items] = useState(allItems);

    const getSelectedTitles = () => items.filter(el => el.checked).map(el => el.title);

    const calcTitle = (selectedTitles) => {
        return Array.isArray(selectedTitles) && selectedTitles.length ? selectedTitles.join(', ')
            : props.defaultTitle;
    };

    const [title, setTitle] = useState(calcTitle(getSelectedTitles()));

    const onCheck = (el, state) => {
        el.checked = state;
        const titles = getSelectedTitles();
        setTitle(calcTitle(titles));
        props.onSelect(titles || []);
    }
    return (
        <>
            <div className="DropdownSelector">
                {title &&
                <div
                    tabIndex={0}
                    className='Input FormItemInput DropdownButtonTriangle DropdownSelectorButton'
                    onKeyDown={event => event.key === "Enter" &&  setOpen(!isOpen)}
                    onClick={() => setOpen(!isOpen)}>
                    {title}
                </div>}
                {
                    isOpen &&
                    <Panel>
                        {items.map(el =>
                            <Checkbox
                                key={el.title}
                                title={el.title}
                                checked={!!el.checked}
                                onCheck={isChecked => onCheck(el, isChecked)}/>)
                        }
                    </Panel>
                }
            </div>
        </>
    );
}
