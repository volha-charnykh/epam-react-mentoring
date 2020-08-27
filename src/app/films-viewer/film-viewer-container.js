import React, {Suspense} from 'react';
import FilmViewer from "./films-viewer";
import {allFilms, genres} from "../mockData/films-data";
import Loading from "../../general/components/loading/loading";

const AddEditFilmDialog = React.lazy(() => import("../film-dialog/add-edit-dialog/add-edit-film-dialog"));
const DeleteDialog = React.lazy(() => import("../film-dialog/delete-dialog/delete-dialog"));

const availableSortItems = [
    {id: 0, title: 'Release Date', filmField: 'releaseDate'},
    {id: 1, title: 'Title', filmField: 'title'},
    {id: 2, title: 'Runtime', filmField: 'runtime'},
];

const SelectAllTabName = 'All';

export default class FilmViewerContainer extends React.Component {
    state = {
        films: [],
        tabs: [SelectAllTabName],
        activeTab: SelectAllTabName,
        genres: [],
        sortItems: availableSortItems,
        activeSortItem: availableSortItems[0],
        isAddEditDialogOpen: false,
        isDeleteDialogOpen: false
    };

    componentDidMount() {
        // data loading
        this.updateStateField('films', [...allFilms]);
        this.updateStateField('genres', [...genres]);
        this.updateStateField('tabs', [SelectAllTabName, ...genres]);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevState.isDeleteDialogOpen && !this.state.isDeleteDialogOpen) ||
            (prevState.isAddEditDialogOpen && !this.state.isAddEditDialogOpen)) {
            this.updateStateField('films', [...allFilms]);
        }
    }

    updateStateField(fieldName, newValue) {
        this.setState((state) => ({
            ...state,
            [fieldName]: newValue
        }));
    }

    render() {
        const {
            tabs,
            films,
            activeSortItem,
            sortItems,
            searchStr,
            activeTab,
            selectedFilm,
            isAddEditDialogOpen,
            isDeleteDialogOpen
        } = this.state;

        let displayedFilms = [...films];

        if (searchStr) {
            displayedFilms = displayedFilms.filter(el => el.title.includes(searchStr));
        }

        if (activeTab && activeTab !== SelectAllTabName) {
            displayedFilms = displayedFilms.filter(e => e.genres.includes(activeTab));
        }

        if (activeSortItem) {
            displayedFilms.sort((a, b) => a[activeSortItem.filmField] > b[activeSortItem.filmField] ? 1 : -1)
        }

        const saveFilm = (film) => {
            if (selectedFilm) {
                this.updateStateField('selectedFilm', null);
                allFilms.splice(allFilms.findIndex(item => item.id === film.id), 1, film);
            } else {
                allFilms.push({
                    ...film,
                    id: allFilms.reduce((acc, cur) => acc < cur.id ? cur.id : acc, 0) + 1
                })
            }
            this.updateStateField('isAddEditDialogOpen', false);
        }

        const deleteFilm = (film) => {
            this.updateStateField('selectedFilm', null);
            allFilms.splice(allFilms.findIndex(item => item.id === film.id), 1);
            this.updateStateField('isDeleteDialogOpen', false);
        }

        const onAddFilm = () => {
            this.updateStateField('selectedFilm', null);
            this.updateStateField('isAddEditDialogOpen', true);
        }

        const onEditFilm = (film) => {
            this.updateStateField('selectedFilm', film);
            this.updateStateField('isAddEditDialogOpen', true);
        }

        const onDeleteFilm = (film) => {
            this.updateStateField('selectedFilm', film);
            this.updateStateField('isDeleteDialogOpen', true);
        }

        return (
            <>
                <FilmViewer
                    films={displayedFilms}
                    sortItems={sortItems}
                    activeSortItem={activeSortItem}
                    tabs={tabs}
                    activeTab={activeTab}

                    updateSearchStr={v => this.updateStateField('searchStr', v)}
                    updateActiveSortItem={v => this.updateStateField('activeSortItem', v)}
                    updateActiveTab={v => this.updateStateField('activeTab', v)}
                    onAddFilm={onAddFilm}
                    onEditFilm={onEditFilm}
                    onDeleteFilm={onDeleteFilm}
                />
                {
                    isAddEditDialogOpen &&
                    <Suspense fallback={<Loading/>}>
                        <AddEditFilmDialog
                            film={selectedFilm}
                            genres={genres}
                            onSave={saveFilm}
                            onClose={() => this.updateStateField('isAddEditDialogOpen', false)}/>
                    </Suspense>
                }
                {
                    isDeleteDialogOpen &&
                    <Suspense fallback={<Loading/>}>
                        <DeleteDialog
                            film={selectedFilm}
                            onDelete={deleteFilm}
                            onClose={() => this.updateStateField('isDeleteDialogOpen', false)}/>
                    </Suspense>
                }
            </>
        );
    }
}
