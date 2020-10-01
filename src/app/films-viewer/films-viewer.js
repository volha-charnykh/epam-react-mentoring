import React, {useEffect, useMemo} from 'react';
import Footer from '../footer/footer';
import Layout from '../../general/components/layout/layout';
import './films-viewer.scss';
import HeaderContainer from "./header/header-container";
import Tabs from "../../general/components/tabs/tabs";
import Dropdown from "../../general/components/dropdown/dropdown";
import {loadFilms, setActiveGenre, setSearchString, setSortOrder, setSortType} from "../store/slices";
import {useDispatch, useSelector} from "react-redux";
import {selectFilms, selectGenres, selectSearchParams} from "../store/selectors";
import {useHistory, useLocation} from "react-router-dom";

const SelectAllTabName = 'All';

const availableSortItems = [
    {id: 0, title: 'Release Date', filmField: 'release_date'},
    {id: 1, title: 'Title', filmField: 'title'},
    {id: 2, title: 'Rating', filmField: 'vote_average'},
];

export default function FilmsViewer(props) {
    const searchParams = useSelector(selectSearchParams);
    const genres = useSelector(selectGenres);
    const films = useSelector(selectFilms);
    const dispatch = useDispatch();

    let activeTab = useMemo(() => searchParams.activeGenre || SelectAllTabName, [searchParams.activeGenre]);
    let activeSortItem = useMemo(() => availableSortItems.find(el => el.filmField === searchParams.sortType), [searchParams.sortType]);
    let tabs = useMemo(() => [SelectAllTabName, ...genres], [genres]);

    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const genre = query.get("genre");
    const title = query.get("title");

    useEffect(() => {
        dispatch(loadFilms(/*(dispatch, films) => films && films.length > 0 ?
                history.push('/films') : history.push('/no-films')*/));
    }, []);

    useEffect(() => {
        dispatch(setActiveGenre(genre));
        dispatch(setSearchString(title));
        if ((!genre && !title) || !films || !films.length) {
            history.push('/no-films');
        }
    }, [genre, title]);

    const updateActiveTab = (tab) => {
        if (tab !== SelectAllTabName) {
            history.push(`/search?genre=${tab}${title ? '&title=' + title : ''}`);
        } else {
            history.push('/no-films');
        }
    };

    const updateSortOrder = () => {
        const sortOrder = searchParams.sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSortOrder(sortOrder));
    };
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
                            <div className='ContentContainer'>
                                {props.children}
                            </div>
                        </Tabs>
                    </div>
                </Layout>
            </div>
        </>
    );
}
