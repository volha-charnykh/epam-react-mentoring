import React, { useCallback } from 'react';
import './menu-panel.scss';
import PropTypes from 'prop-types';
import Panel from '../panel/panel';

export const menuItemType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool,
});

MenuPanel.propTypes = {
  items: PropTypes.arrayOf(menuItemType).isRequired,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  onItemSelected: PropTypes.func.isRequired,
};

export default function MenuPanel(props) {
  const selectItem = useCallback((item) => props.onItemSelected(item), [props.onItemSelected]);

  return (
    <Panel closable={props.closable} onClose={props.onClose}>
      {
                props.items.map((item) => (
                  <span
                    className="MenuPanelItem"
                    key={item.id}
                    onClick={selectItem.bind(this, item)}
                  >
                    {item.title}
                  </span>
                ))
            }
    </Panel>
  );
}
