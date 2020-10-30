import React, { useMemo } from 'react';
import './dropdown.scss';
import '../../styles/buttons.scss';
import PropTypes from 'prop-types';
import MenuPanel, { menuItemType } from '../menu-panel/menu-panel';
import useToggle from '../../hooks/toggle';

export default function Dropdown(props) {
  const [isOpen, setOpen] = useToggle();
  const { selected, items, hideTriangle } = props;

  const title = useMemo(() => (selected && selected.title) || 'Select Option',
    [selected.title]);

  const onItemSelected = (el) => {
    setOpen();
    props.onItemSelected(el);
  };
  return (
    <div className="DropdownContainer">
      <div
        className={`DropdownButton ${!hideTriangle && 'DropdownButtonTriangle'}`}
        onClick={setOpen}
      >
        {title}
      </div>
      {
                isOpen
                && (
                <MenuPanel
                  items={items}
                  onItemSelected={onItemSelected}
                />
                )
            }
    </div>
  );
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(menuItemType).isRequired,
  selected: menuItemType,
  hideTriangle: PropTypes.bool,
  onItemSelected: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  selected: [],
  hideTriangle: false,
};
