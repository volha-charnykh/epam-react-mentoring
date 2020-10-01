import React from 'react';
import Footer from '../footer/footer';
import Layout from '../../general/components/layout/layout';
import './page-not-found.scss';
import '../../general/styles/buttons.scss';
import img from '../../img/page-not-found.png';
import Logo from "../../general/components/logo/logo";
import {useHistory} from "react-router-dom";



export default function PageNotFound() {
    let history = useHistory();
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
                            <div className="ActionButton" onClick={() => history.push('/')}>Go back to home</div>
                        </div>
                    </div>
                </Layout>
        </>
    );
}
