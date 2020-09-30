import React from 'react';
import FilmsContent from './content/films-content';
import Footer from './footer/footer';
import Layout from '../../general/components/layout/Layout';
import './films-viewer.scss';
import HeaderContainer from "./header/header-container";
import FilmDialogContainer from "./dialogs/film-dialog-container";



export default function FilmViewer() {

    return (
        <>
            <div className='FilmsViewer'>
                <Layout
                    header={
                        <HeaderContainer/>
                    }
                    footer={
                        <Footer/>
                    }>
                    <FilmsContent/>
                </Layout>
            </div>

            <FilmDialogContainer/>
        </>
    );
}
