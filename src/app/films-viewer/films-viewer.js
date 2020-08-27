import React from 'react';
import Header from './header/header';
import FilmsContent from './content/films-content';
import Footer from './footer/footer';
import Layout from '../../general/components/layout/Layout';
import PropTypes from "prop-types";
import {filmType} from "./content/film-item/film-item";
import {menuItemType} from "../../general/components/menu-panel/menu-panel";
import './films-viewer.scss';

FilmViewer.propTypes = {
    films: PropTypes.arrayOf(filmType),
    activeSortItem: menuItemType,
    sortItems: PropTypes.arrayOf(menuItemType),
    activeTab: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.string),

    updateSearchStr: PropTypes.func.isRequired,
    updateActiveSortItem: PropTypes.func.isRequired,
    updateActiveTab: PropTypes.func.isRequired,
    onAddFilm: PropTypes.func.isRequired,
    onEditFilm: PropTypes.func.isRequired,
    onDeleteFilm: PropTypes.func.isRequired,
}

export default function FilmViewer(props) {

    return (
        <>
            <div className='FilmsViewer'>
                <Layout
                    header={
                        <Header
                            updateSearchStr={props.updateSearchStr}
                            onAddFilm={props.onAddFilm}/>
                    }
                    footer={
                        <Footer/>
                    }>
                    <FilmsContent
                        films={props.films}
                        activeTab={props.activeTab}
                        activeSortItem={props.activeSortItem}
                        sortItems={props.sortItems}
                        tabs={props.tabs}
                        updateActiveSortItem={props.updateActiveSortItem}
                        updateActiveTab={props.updateActiveTab}
                        onEditFilm={props.onEditFilm}
                        onDeleteFilm={props.onDeleteFilm}
                    />
                </Layout>
            </div>
        </>
    );
}
