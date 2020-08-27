import React from 'react';
import '../../../general/styles/dialog.scss';
import '../../../general/styles/buttons.scss';
import PropTypes from "prop-types";
import Dialog from "../../../general/components/dialog/dialog";
import {filmType} from "../../films-viewer/content/film-item/film-item";
import FormItem from "../../../general/components/form-item/form-item";

const filmFormItems = [{
    label: 'Movie id',
    type: 'Not-Editable',
    showOnlyOnEdit: true,
    filmField: 'id'
}, {
    label: 'Title',
    type: 'Text',
    filmField: 'title'
}, {
    label: 'Release Date',
    type: 'Date',
    filmField: 'releaseDate'
}, {
    label: 'Movie url',
    type: 'Text',
    filmField: 'url'
}, {
    label: 'Genre',
    type: 'Dropdown',
    filmField: 'genres',
    available: []
}, {
    label: 'Overview',
    type: 'Text',
    filmField: 'overview'
}, {
    label: 'Runtime',
    type: 'Text',
    filmField: 'runtime'
}];

export default class AddEditFilmDialog extends React.Component {
    state = {
        formItems: []
    };

    componentDidMount() {
        this.initForm(this.props.genres, this.props.film);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.film !== this.props.film) ||
            (prevProps.genres !== this.props.genres)) {
            this.initForm(this.props.genres, this.props.film);
        }
    }

    initForm(genres, film) {
        const isEditMode = !!this.props.film;
        let formItems = [...filmFormItems];
        formItems.find(el => el.filmField === 'genres').available = genres || [];
        if (!isEditMode) {
            formItems = formItems.filter(el => !el.showOnlyOnEdit).map(el => ({...el}));
        }
        this.updateStateField('formItems', formItems);

        const initState = {};
        filmFormItems.forEach(el => initState[el.filmField] = film ? film[el.filmField] : '');
        this.setState((state) => ({
            ...state,
            ...initState
        }));
    }

    updateStateField(fieldName, newValue) {
        this.setState((state) => ({
            ...state,
            [fieldName]: newValue
        }));
    }

    render() {
        const isEditMode = !!this.props.film;

        const {formItems} = this.state;


        const save = () => {
            const newFilm = {};
            filmFormItems.forEach(el => {
                newFilm[el.filmField] = this.state[el.filmField]
            });
            this.props.onSave(newFilm);
        }

        return (
            <Dialog onClose={() => this.props.onClose()}>
                <div className="DialogContainer">
                    <div className='DialogTitle'>
                        {isEditMode ? 'Edit Movie' : 'Add Movie'}
                    </div>
                    {
                        formItems.map(item =>
                            <FormItem
                                key={item.label}
                                label={item.label}
                                type={item.type}
                                value={this.state[item.filmField]}
                                available={item.available}
                                updateValue={value => this.updateStateField(item.filmField, value)}/>
                        )
                    }
                </div>
                <div className="DialogActionContainer">
                    <div key='reset'
                        tabIndex={0}
                        className='ActionButton'
                        onClick={() => props.onClose(false)}>
                        Reset
                    </div>
                    <div key='save'
                        tabIndex={0}
                        className='PrimaryButton'
                        onClick={save}>
                        {isEditMode ? 'Save' : 'Submit'}
                    </div>
                </div>
            </Dialog>
        );
    }
}

AddEditFilmDialog.propTypes = {
    film: filmType,
    genres: PropTypes.arrayOf(PropTypes.string),
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}
