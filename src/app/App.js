import React from 'react';
import './App.scss';
import Header from './header/Header';
import Content from './content/Content';
import Footer from './footer/Footer';
import Layout from '../general/components/layout/Layout';
import AppErrorBoundary from "./error-boundary/app-error-boundary";

export default function App() {
    return (
        <div className='App'>
            <AppErrorBoundary>
                <Layout
                    header={
                        <Header/>
                    }
                    footer={
                        <Footer/>
                    }>
                    <Content/>
                </Layout>
            </AppErrorBoundary>
        </div>
    );
}
