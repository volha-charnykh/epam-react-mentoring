import React from 'react';
import './layout.scss';
import PropTypes from 'prop-types';

export default function Layout(props) {
  const { header, children, footer } = props;

  return (
    <div className="LayoutWrapper">
      <div className="Layout">
        {
                    header && (
                    <div className="Layout-Header">
                        {header}
                    </div>
                    )
                }
        <div className="Layout-Content">
          {children}
        </div>
        {
                    footer && (
                    <div className="Layout-Footer">
                        {footer}
                    </div>
                    )
                }
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  footer: PropTypes.node,
  header: PropTypes.node,
};

Layout.defaultProps = {
  footer: null,
  header: null,
};
