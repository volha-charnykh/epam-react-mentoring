import React, { useCallback } from 'react';
import './three-dot-menu.scss';
import PropTypes from 'prop-types';
import MenuPanel, { menuItemType } from '../menu-panel/menu-panel';
import useToggle from '../../hooks/toggle';

export default function ThreeDotMenu(props) {
  const [isMenuOpen, setMenuOpen] = useToggle(false);
  const { items, onItemSelected } = props;

  const onSelect = useCallback((el) => {
    setMenuOpen();
    onItemSelected(el);
  }, [onItemSelected]);

  const onMenuOpen = useCallback(() => setMenuOpen(), []);

  return (
    <>
      {
            !isMenuOpen
            && (
            <div
              className="ThreeDots"
              onClick={onMenuOpen}
            />
            )
        }
      {
            isMenuOpen
            && (
            <MenuPanel
              closable
              items={items}
              onClick={onMenuOpen}
              onItemSelected={onSelect}
            />
            )
        }
    </>
  );
}

ThreeDotMenu.propTypes = {
  items: PropTypes.arrayOf(menuItemType).isRequired,
  onItemSelected: PropTypes.func.isRequired,
};
