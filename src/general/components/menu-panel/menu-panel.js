import React, { useCallback } from 'react';
import './menu-panel.scss';
import PropTypes from 'prop-types';
import Panel from '../panel/panel';

export const menuItemType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool,
});

export default function MenuPanel(props) {
  const {
    items, closable, onClose, onItemSelected,
  } = props;
  const selectItem = useCallback((item) => props.onItemSelected(item), [onItemSelected]);

  return (
    <Panel
      closable={closable}
      onClose={onClose}
    >
      {
                items.map((item) => (
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

MenuPanel.propTypes = {
  items: PropTypes.arrayOf(menuItemType).isRequired,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  onItemSelected: PropTypes.func.isRequired,
};

MenuPanel.defaultProps = {
  closable: false,
  onClose: () => console.error('MenuPanel props onClose isn\'t provided'),
};
