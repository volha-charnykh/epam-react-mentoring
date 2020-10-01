import Logo from '../../../general/components/logo/logo';
import React from 'react';
import './header-container.scss';
import '../../../general/styles/buttons.scss';
import img from '../../../img/background-movies.jpg';
import {useDispatch, useSelector} from "react-redux";
import {selectFilmDetails} from "../../store/selectors/film-details.selector";
import {setAddEditDialogOpen, setFilmDetails, setSearchString} from "../../store/slices";
import {useHistory, useLocation} from "react-router-dom";
import {selectSearchParams} from "../../store/selectors";


const ViewerHeader = React.lazy(() => import("./viewer-header/viewer-header"));
const FilmDetailsHeader = React.lazy(() => import("./film-details-header/film-details-header"));

export default function HeaderContainer() {
    const filmDetails = useSelector(selectFilmDetails);
    const dispatch = useDispatch();
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const genre = query.get("genre");
    const searchParams = useSelector(selectSearchParams);

    return (
        <div className='HeaderContainer' style={{height: (!filmDetails ? '300px' : '100%')}}>
            <img
                src={img}
                alt='header'
                className='HeaderBackground'/>
            <div className='HeaderContent'>
                <Logo/>
                {
                    !!filmDetails ?
                        <FilmDetailsHeader
                            film={filmDetails}
                            onGoBack={() => {
                                dispatch(setFilmDetails(null));
                                history.push(`/no-films`);
                            }}/>
                        :
                        <ViewerHeader
                            searchString={searchParams.searchString}
                            updateSearchStr={str => {
                                dispatch(setSearchString(str))
                                history.push(`/search?title=${str}${genre ? '&genre=' + genre:''}`);
                            }}
                            onAddFilm={() => dispatch(setAddEditDialogOpen(true))}/>
                }
            </div>
        </div>
    );
}
