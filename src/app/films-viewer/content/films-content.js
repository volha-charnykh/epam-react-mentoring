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
    activeGenre: PropTypes.string,
    sortType: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    updateActiveFilm: PropTypes.func.isRequired,
    updateActiveGenre: PropTypes.func.isRequired,
    updateSortType: PropTypes.func.isRequired,
    updateSortOrder: PropTypes.func.isRequired,
    onEditFilm: PropTypes.func.isRequired,
    onDeleteFilm: PropTypes.func.isRequired,
}

const SelectAllTabName = 'All';

const availableSortItems = [
    {id: 0, title: 'Release Date', filmField: 'release_date'},
    {id: 1, title: 'Title', filmField: 'title'},
    {id: 2, title: 'Rating', filmField: 'vote_average'},
];

export default function FilmsContent(props) {
    const [activeTab, setActiveTab] = useState(props.activeGenre || SelectAllTabName);
    const [activeSortItem, setActiveSortItem] = useState(availableSortItems.find(el => el.filmField === props.sortType));

    const updateActiveTab = useCallback((tab) => {
        setActiveTab(tab);
        if (tab !== SelectAllTabName) {
            props.updateActiveGenre(tab)
        } else {
            props.updateActiveGenre(undefined)
        }
    }, [props.updateActiveGenre]);

    const updateActiveSortItem = useCallback((sortBy) => {
        setActiveSortItem(sortBy);
        props.updateSortType(sortBy.filmField);
    }, [props.updateSortType]);

    const updateSortOrder = useCallback(() => {
        const sortOr = props.sortOrder === 'asc' ? 'desc' : 'asc';
        props.updateSortOrder(sortOr);
    }, [props.updateSortOrder]);

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
                onTabClicked={updateActiveTab}
                right={
                    <>
                        <div className='SortLabel'>Sort by</div>
                        <Dropdown
                            hideTriangle={true}
                            selected={activeSortItem}
                            items={availableSortItems}
                            onItemSelected={updateActiveSortItem}
                        />
                        <div onClick={updateSortOrder}
                            className={`SortButton ${props.sortOrder === 'asc' ? 'AscSorting' : 'DscSorting'}`}>
                        </div>
                    </>
                }>
                {
                    <div className='ContentContainer'>
                        <div className='FilmsCountContainer'>
                            <span className='FilmsCount'>{props.films.length}</span> movies found
                        </div>
                        {
                            props.films.length
                                ?
                                <div className='FilmContainer'>
                                    {
                                        props.films.map(el =>
                                            <FilmItem
                                                key={el.id}
                                                film={el}
                                                actions={actions}
                                                clickHandler={() => updateActiveFilm(el)}/>)
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
