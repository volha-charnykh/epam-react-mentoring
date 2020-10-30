import React, { useCallback, useMemo } from 'react';
import './dropdown-selector.scss';
import '../../styles/buttons.scss';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox/checkbox';
import Panel from '../panel/panel';
import useToggle from '../../hooks/toggle';

export default function DropdownSelector(props) {
  const {
    available, value, defaultTitle, markInvalid,
  } = props;
  const [isOpen, setOpen] = useToggle(false);

  const allItems = useMemo(() => {
    const items = available.map((el) => ({ title: el }));

    if (Array.isArray(value) && value.length) {
      items.map((el) => ({
        ...el,
        checked: value.includes(el.title),
      }));
    }
    return items;
  }, [available, value]);

  const selectedTitles = useMemo(() => allItems.filter((el) => el.checked).map((el) => el.title),
    [allItems]);

  const title = useMemo(() => (selectedTitles.length ? selectedTitles.join(', ') : defaultTitle),
    [selectedTitles, defaultTitle]);

  const onCheck = (el, state) => {
    const selected = [...selectedTitles];
    if (state) {
      selected.push(el.title);
    } else {
      selected.splice(selected.indexOf(el.title), 1);
    }
    props.onSelect(selected);
  };

  const onKeyClick = useCallback((event) => event.key === 'Enter' && setOpen(), []);

  return (
    <>
      <div className="DropdownSelector">
        <div
          tabIndex={0}
          className={`Input FormItemInput DropdownButtonTriangle DropdownSelectorButton ${markInvalid ? 'Invalid' : ''}`}
          onKeyDown={onKeyClick}
          onClick={setOpen}
        >
          {title}
        </div>
        {
                    isOpen
                    && (
                    <Panel>
                      {allItems.map((el) => (
                        <Checkbox
                          key={el.title}
                          title={el.title}
                          checked={!!el.checked}
                          onCheck={(isChecked) => onCheck(el, isChecked)}
                        />
                      ))}
                    </Panel>
                    )
                }
      </div>
    </>
  );
}

DropdownSelector.propTypes = {
  defaultTitle: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  available: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  markInvalid: PropTypes.bool,
};

DropdownSelector.defaultProps = {
  defaultTitle: 'Select',
  value: [],
  markInvalid: false,
};
