import React from 'react';
import '../../../general/styles/buttons.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectFilmDetails} from "../../store/selectors/film-details.selector";
import {setAddEditDialogOpen, setFilmDetails, setSearchString} from "../../store/slices";
import {useHistory, useLocation} from "react-router-dom";
import {selectSearchParams} from "../../store/selectors";
import HeaderContainer from "../../header/header-container";


const ViewerHeader = React.lazy(() => import("./viewer-header/viewer-header"));
const FilmDetailsHeader = React.lazy(() => import("./film-details-header/film-details-header"));

export default function FilmsHeaderContainer() {
    const filmDetails = useSelector(selectFilmDetails);
    const dispatch = useDispatch();
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const genre = query.get("genre");
    const searchParams = useSelector(selectSearchParams);

    const updateSearchStr = str => {
        if(str) {
            dispatch(setSearchString(str));
            history.push(`/films?title=${str}${genre ? '&genre=' + genre : ''}`);
        } else {
            dispatch(setSearchString(null));
            history.push(`/films${genre ? '?genre=' + genre : ''}`);
        }
    }

    return (
        <HeaderContainer height={!filmDetails ? '300px' : '100%'}>
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
                            updateSearchStr={updateSearchStr}
                            onAddFilm={() => dispatch(setAddEditDialogOpen(true))}/>
                }
        </HeaderContainer>
    );
}
