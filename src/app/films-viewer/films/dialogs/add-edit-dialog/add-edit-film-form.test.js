import {render, screen} from "@testing-library/react";
import React from "react";
import AddEditFilmForm from './add-edit-film-form';
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import {waitFor} from "@testing-library/dom";

describe('AddEditFilmForm', () => {
    const genres = ['Genre1', 'Genre2', 'Genre3', 'Genre4', 'Genre5'];

    const initFilm = {
        id: 1234,
        title: 'Film Title',
        release_date: '1998-09-12',
        poster_path: 'http://test.com',
        genres: [genres[1], genres[3]],
        overview: 'Some text',
        runtime: 123,
        vote_average: 8
    };

    const updatedFilm = {
        id: 1234,
        title: 'Film Title1',
        release_date: '1998-09-12',
        poster_path: 'http://test1.com',
        genres: [genres[1], genres[3]],
        overview: 'Some text1',
        runtime: 1232,
        vote_average: 8
    }

    it('should correctly create form on add', () => {
        render(<AddEditFilmForm onSave={() => {
        }}
            onClose={() => {
            }}/>);
        expect(screen.getByText(/add movie/i)).toBeInTheDocument();
        expect(screen.queryByText(/edit movie/i)).toBeNull();
        expect(screen.queryByText(/movie id/i)).toBeNull();
        expect(screen.getByText(/submit/i)).toBeInTheDocument();
        expect(screen.queryByText(/save/i)).toBeNull();
    });

    it('should correctly create form and map film fields', async () => {
        render(<AddEditFilmForm
            film={initFilm}
            genres={genres}
            onSave={() => {
            }}
            onClose={() => {
            }}/>);

        const title = screen.getByLabelText(/title/i);
        const poster_path = screen.getByLabelText(/Movie Poster URL/i);
        const overview = screen.getByLabelText(/overview/i);
        const runtime = screen.getByLabelText(/runtime/i);

        expect(await screen.findByText(/edit movie/i)).toBeInTheDocument();
        expect(screen.queryByText(/add movie/i)).toBeNull();
        expect(screen.getByText(/movie id/i)).toBeInTheDocument();
        expect(screen.getByText(String(initFilm.id))).toBeInTheDocument();
        expect(title.value).toBe(initFilm.title);
        expect(poster_path.value).toBe(initFilm.poster_path);
        expect(overview.value).toBe(initFilm.overview);
        expect(runtime.value).toBe(String(initFilm.runtime));
        expect(screen.queryByText(/submit/i)).toBeNull();
        expect(screen.getByText(/save/i)).toBeInTheDocument();
    });

    it('should correctly update film fields', async () => {
        const handleUpdateFilm = jest.fn()

        render(<AddEditFilmForm
            film={initFilm}
            genres={genres}
            onSave={handleUpdateFilm}
            onClose={() => {
            }}/>);

        const title = screen.getByLabelText(/title/i);
        const poster_path = screen.getByLabelText(/Movie Poster URL/i);
        const overview = screen.getByLabelText(/overview/i);
        const runtime = screen.getByLabelText(/runtime/i);
        const save = await screen.findByText(/save/i);

        expect(save).toBeInTheDocument();

        await userEvent.type(title, updatedFilm.title);
        await userEvent.type(poster_path, updatedFilm.poster_path);
        await userEvent.type(overview, overview.title);
        await userEvent.type(runtime, runtime.title);

        userEvent.click(save);

        waitFor(() => {
            expect(handleUpdateFilm).toHaveBeenCalledWith(updatedFilm);
        })
    });
})
