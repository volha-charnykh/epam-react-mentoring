import React, { useCallback } from 'react';
import './three-dot-menu.scss';
import PropTypes from 'prop-types';
import MenuPanel, { menuItemType } from '../menu-panel/menu-panel';
import { useToggle } from '../../hooks/toggle';

ThreeDotMenu.propTypes = {
  items: PropTypes.arrayOf(menuItemType).isRequired,
  onItemSelected: PropTypes.func.isRequired,
};

export default function ThreeDotMenu(props) {
  const [isMenuOpen, setMenuOpen] = useToggle(false);

  const onItemSelected = useCallback((el) => {
    setMenuOpen();
    props.onItemSelected(el);
  }, [props.onItemSelected]);

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
              items={props.items}
              onClick={onMenuOpen}
              onItemSelected={onItemSelected}
            />
            )
        }
    </>
  );
}
