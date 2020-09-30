import React from 'react';
import '../../../../general/styles/dialog.scss';
import '../../../../general/styles/buttons.scss';
import '../../../../general/styles/form.scss';
import PropTypes from "prop-types";
import {filmType} from "../../../util/prop-types/film.type";
import * as Yup from 'yup';
import {Field, Form, withFormik} from "formik";
import DropdownSelector from "../../../../general/components/dropdown-selector/dropdown-selector";
import FormItem from "../../../../general/components/form-item/form-item";

const FilmSchema = Yup.object().shape({
    id: Yup.string(),
    title: Yup.string()
        .required('Please enter title'),
    release_date: Yup.date()
        .required('Please select release date'),
    poster_path: Yup.string()
        .url('Invalid url')
        .required('Please enter URL to movie poster'),
    genres: Yup.array()
        .of(Yup.string())
        .required('Please select at least one genre'),
    overview: Yup.string()
        .required('Please enter overview'),
    runtime: Yup.number()
        .min(1, 'Runtime can\'t be less than 0')
        .required('Please enter runtime in minutes'),
});

AddEditFilmForm.propTypes = {
    film: filmType,
    genres: PropTypes.arrayOf(PropTypes.string),
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

function AddEditFilmForm(props) {
    const isEditMode = !!props.id;

    return (
        <Form>
            <div className="DialogContainer">
                <div className='DialogTitle'>
                    {isEditMode ? 'Edit Movie' : 'Add Movie'}
                </div>

                {isEditMode &&
                <Field name="id">
                    {({field}) => (
                        <label className='FormItemLabel'>Movie ID
                            <div className="NotEditableFormItem">{field.value}</div>
                        </label>
                    )}
                </Field>
                }

                <FormItem
                    name="title"
                    label="Title"
                    type='text'>
                </FormItem>

                <FormItem
                    name="release_date"
                    label="Release Date"
                    type='date'>
                </FormItem>

                <FormItem
                    name="poster_path"
                    label="Movie Poster URL"
                    type='text'>
                </FormItem>

                <Field name='genres'>
                    {({field, meta,}) => (<>
                            <label className='FormItemLabel'>Genres
                            </label>
                            <DropdownSelector
                                defaultTitle='Select Genres'
                                markInvalid={!!meta.error}
                                available={props.genres || []}
                                onSelect={(items) => props.setFieldValue('genres', items)}
                                {...field}/>

                            {meta.error && (
                                <div className="InputError">{meta.error}</div>
                            )}
                        </>
                    )}
                </Field>

                <FormItem
                    name="overview"
                    label="Overview"
                    type='text'>
                </FormItem>

                <FormItem
                    name="runtime"
                    label="Runtime"
                    type='text'>
                </FormItem>

            </div>
            <div className="DialogActionContainer">
                <div key='reset'
                    tabIndex={0}
                    className='ActionButton'
                    onClick={() => props.onClose(false)}>
                    Reset
                </div>
                <button type="submit"
                    tabIndex={0}
                    className='PrimaryButton'>
                    {isEditMode ? 'Save' : 'Submit'}
                </button>
            </div>
        </Form>
    );
}

const AddEditFilmFormikWrapper = withFormik({

    validationSchema: FilmSchema,
    validateOnChange: false,
    validateOnBlur: false,

    mapPropsToValues: props => {
        if (!props.film) {
            return {title: '', release_date: '', poster_path: '', genres: [], overview: '', runtime: ''};
        }
        return {
            id: props.film.id,
            title: props.film.title || '',
            release_date: props.film.release_date || '',
            poster_path: props.film.poster_path || '',
            genres: props.film.genres || [],
            overview: props.film.overview || '',
            runtime: props.film.runtime || ''
        };
    },

    handleSubmit: (values, {props}) =>
        props.onSave({
            ...values,
            runtime: +values.runtime,
            vote_average: values.vote_average || 0
        })
})(AddEditFilmForm);

export default AddEditFilmFormikWrapper;
