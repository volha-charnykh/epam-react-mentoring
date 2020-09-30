import React, {useEffect, useMemo} from 'react';
import './films-content.scss';
import FilmItem from './film-item/film-item';
import Tabs from '../../../general/components/tabs/tabs';
import Dropdown from '../../../general/components/dropdown/dropdown';
import {useDispatch, useSelector} from "react-redux";
import {selectFilms, selectGenres, selectSearchParams} from "../../store/selectors";
import {
    loadFilms,
    setActiveGenre,
    setAddEditDialogOpen,
    setConfirmationDialog,
    setFilmDetails,
    setSelectedFilm,
    setSortOrder,
    setSortType
} from "../../store/slices";

const SelectAllTabName = 'All';

const availableSortItems = [
    {id: 0, title: 'Release Date', filmField: 'release_date'},
    {id: 1, title: 'Title', filmField: 'title'},
    {id: 2, title: 'Rating', filmField: 'vote_average'},
];

export default function FilmsContent() {
    const films = useSelector(selectFilms);
    const searchParams = useSelector(selectSearchParams);
    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();

    let activeTab = useMemo(() => searchParams.activeGenre || SelectAllTabName, [searchParams.activeGenre]);
    let activeSortItem = useMemo(() => availableSortItems.find(el => el.filmField === searchParams.sortType), [searchParams.sortType]);
    let tabs = useMemo(() => [SelectAllTabName, ...genres], [genres]);

    const actions = [
        {
            id: 0,
            title: 'Edit',
            handle: (film) => {
                dispatch(setSelectedFilm(film));
                dispatch(setAddEditDialogOpen(true));
            }
        },
        {
            id: 1,
            title: 'Delete',
            handle: (film) => {
                dispatch(setSelectedFilm(film));
                dispatch(setConfirmationDialog({
                    title: 'Delete Movie',
                    description: 'Are you sure you want to delete this movie?'
                }));
            }
        },
    ];

    useEffect(() => {
        dispatch(loadFilms());
    }, []);

    const updateActiveTab = (tab) => {
        if (tab !== SelectAllTabName) {
            dispatch(setActiveGenre(tab));
        } else {
            dispatch(setActiveGenre(undefined));
        }
    };

    const updateSortOrder = () => {
        const sortOrder = searchParams.sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSortOrder(sortOrder));
    };

    const updateActiveFilm = (f) => {
        window.scrollTo(0, 0);
        dispatch(setFilmDetails(f));
    };

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
                            onItemSelected={sortBy => dispatch(setSortType(sortBy.filmField))}
                        />
                        <div onClick={updateSortOrder}
                            className={`SortButton ${searchParams.sortOrder === 'asc' ? 'AscSorting' : 'DscSorting'}`}>
                        </div>
                    </>
                }>
                {
                    <div className='ContentContainer'>
                        <div className='FilmsCountContainer'>
                            <span className='FilmsCount'>{films.length}</span> movies found
                        </div>
                        {
                            films.length
                                ?
                                <div className='FilmContainer'>
                                    {
                                        films.map(el =>
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
