import React from 'react';
import FilmsList from './content/films-list';
import FilmDialogContainer from "./dialogs/film-dialog-container";


export default function Films() {

    return (
        <>
            <FilmsList/>

            <FilmDialogContainer/>
        </>
    );
}
