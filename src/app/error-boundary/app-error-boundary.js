import React from 'react';
import PropTypes from 'prop-types';
import './app-error-boundary.scss';
import Layout from '../../general/components/layout/layout';
import Footer from '../footer/footer';
import Logo from '../../general/components/logo/logo';

// PATTERN: High Order Component
export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Layout
          footer={
            <Footer />
                }
        >
          <div className="ErrorPage">
            <Logo />
            <div className="ErrorPageTitle">Something went wrong.</div>
          </div>
        </Layout>
      );
    }

    return children;
  }
}

AppErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
