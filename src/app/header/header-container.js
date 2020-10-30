import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../general/components/logo/logo';
import './header-container.scss';
import '../../general/styles/buttons.scss';
import img from '../../img/background-movies.jpg';

export default function HeaderContainer(props) {
  const { children, height } = props;

  return (
    <div className="HeaderContainer" style={{ height }}>
      <img
        src={img}
        alt="header"
        className="HeaderBackground"
      />
      <div className="HeaderContent">
        <Logo />
        {
                   children
                }
      </div>
    </div>
  );
}

HeaderContainer.propTypes = {
  height: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

HeaderContainer.defaultProps = {
  height: '100%',
};
