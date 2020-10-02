import React, {useEffect} from 'react';
import './no-films.scss';
import {useHistory, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectFilms} from "../../store/selectors";


export default function NoFilms() {
    const history = useHistory();
    const location = useLocation();
    const films = useSelector(selectFilms);

    useEffect(() => {
        if (films.length) {
            history.push('/films' + location.search);
        }
    }, [films.length]);

    return (
        <>
            <div className="NoData">No films found</div>
        </>
    );
}
