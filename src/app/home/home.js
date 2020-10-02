import React from 'react';
import Footer from '../footer/footer';
import Layout from '../../general/components/layout/layout';
import './home.scss';
import '../../general/styles/buttons.scss';
import Logo from "../../general/components/logo/logo";
import {useHistory} from "react-router-dom";
import HeaderContainer from "../header/header-container";


export default function PageNotFound() {
    let history = useHistory();
    return (
        <>
            <Layout
                header={
                    <HeaderContainer height={'300px'}>
                        <div className="HomeHeader">
                            <div className="HomeHeaderTitle">Welcome to</div>
                            <Logo/>
                        </div>
                    </HeaderContainer>
                }
                footer={
                    <Footer/>
                }>
                <div className="Home">
                    <div className="HomeContent">
                        <div className="HomeTitle">Let's search for movies!</div>
                        <div className="ActionButton"
                            onClick={() => history.push('/films')}>Search
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
