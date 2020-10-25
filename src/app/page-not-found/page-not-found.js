import React from 'react';
import Footer from '../footer/footer';
import Layout from '../../general/components/layout/layout';
import './page-not-found.scss';
import '../../general/styles/buttons.scss';
import img from '../../img/page-not-found.png';
import Logo from "../../general/components/logo/logo";
import {NavLink} from "react-router-dom";


export default function PageNotFound() {
    return (
        <>
                <Layout
                    footer={
                        <Footer/>
                    }>
                    <div className="PageNotFound">
                        <Logo/>
                        <div className="PageNotFoundContent">
                            <div className="PageNotFoundTitle">Page Not Found</div>
                            <img
                                src={img}
                                alt='404'
                                className='PageNotFoundImage'/>
                            <NavLink className="ActionButton" to='/'>Go back to home</NavLink>
                        </div>
                    </div>
                </Layout>
        </>
    );
}
