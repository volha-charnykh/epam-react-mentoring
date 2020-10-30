import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../footer/footer';
import Layout from '../../general/components/layout/layout';
import './home.scss';
import '../../general/styles/buttons.scss';
import Logo from '../../general/components/logo/logo';
import HeaderContainer from '../header/header-container';

export default function PageNotFound() {
  return (
    <>
      <Layout
        header={(
          <HeaderContainer height="300px">
            <div className="HomeHeader">
              <div className="HomeHeaderTitle">Welcome to</div>
              <Logo />
            </div>
          </HeaderContainer>
                  )}
        footer={
          <Footer />
                }
      >
        <div className="Home">
          <div className="HomeContent">
            <div className="HomeTitle">Let&apos;s search for movies!</div>
            <NavLink
              className="ActionButton"
              to="/films"
            >
              Search
              {' '}
            </NavLink>
          </div>
        </div>
      </Layout>
    </>
  );
}
