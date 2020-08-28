import React, {useCallback, useMemo, useState} from 'react';
import './films-content.scss';
import FilmItem from './film-item/film-item';
import Tabs from '../../../general/components/tabs/tabs';
import Dropdown from '../../../general/components/dropdown/dropdown';
import PropTypes from 'prop-types';
import {filmType} from "../../util/prop-types/film.type";

FilmsContent.propTypes = {
    films: PropTypes.arrayOf(filmType),
    searchStr: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    updateActiveFilm: PropTypes.func.isRequired,
    onEditFilm: PropTypes.func.isRequired,
    onDeleteFilm: PropTypes.func.isRequired,
}

const availableSortItems = [
    {id: 0, title: 'Release Date', filmField: 'releaseDate'},
    {id: 1, title: 'Title', filmField: 'title'},
    {id: 2, title: 'Runtime', filmField: 'runtime'},
];

const SelectAllTabName = 'All';

export default function FilmsContent(props) {
    const [activeTab, setActiveTab] = useState(SelectAllTabName);
    const [activeSortItem, setActiveSortItem] = useState(availableSortItems[0]);

    let displayedFilms = useMemo(() => {
        let films = props.films;

        if (props.searchStr) {
            films = films.filter(el => el.title.includes(props.searchStr));
        }

        if (activeTab && activeTab !== SelectAllTabName) {
            films = films.filter(e => e.genres.includes(activeTab));
        }

        if (activeSortItem) {
            films.sort((a, b) => a[activeSortItem.filmField] > b[activeSortItem.filmField] ? 1 : -1)
        }
        return films;
    }, [props.films, props.searchStr, activeTab, activeSortItem]);

    let tabs = useMemo(() => [SelectAllTabName, ...props.genres], [props.genres]);

    const actions = [
        {
            id: 0,
            title: 'Edit',
            handle: (film) => {
                props.onEditFilm(film);
            }
        },
        {
            id: 1, title: 'Delete', handle: (film) => {
                props.onDeleteFilm(film);
            }
        },
    ];

    const updateActiveFilm = useCallback((f) => {
        window.scrollTo(0, 0);
        props.updateActiveFilm(f);
    }, [props.updateActiveFilm]);

    return (
        <div className='FilmsContent'>
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabClicked={setActiveTab}
                right={
                    <>
                        <div className='SortLabel'>Sort by</div>
                        <Dropdown
                            selected={activeSortItem}
                            items={availableSortItems}
                            onItemSelected={setActiveSortItem}
                        />
                    </>
                }>
                {
                    <div className='ContentContainer'>
                        <div className='FilmsCountContainer'>
                            <span className='FilmsCount'>{displayedFilms.length}</span> movies found
                        </div>
                        {
                            displayedFilms.length
                                ?
                                <div className='FilmContainer'>
                                    {
                                        displayedFilms.map(el =>
                                            <FilmItem
                                                key={el.id}
                                                film={el}
                                                actions={actions}
                                                clickHandler={()=>updateActiveFilm(el)}/>)
                                    }
                                </div>
                                :
                                <div className="NoData">No films found</div>
                        }

                    </div>
                }
            </Tabs>
        </div>
    );
}
