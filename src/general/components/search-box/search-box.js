import React from 'react';
import './search-box.scss';
import '../../styles/buttons.scss';
import PropTypes from 'prop-types';

SearchBox.propTypes = {
    searchButtonLabel: PropTypes.string,
    search: PropTypes.func.isRequired
}

export default function SearchBox(props) {
    let text = '';
    const search = () => {
        props.search(text);
    }
    return (
        <div className='Search'>
            <input
                name="search"
                className='SearchInput'
                placeholder='What do you want to watch?'
                onChange={(event) => text = event.target.value}/>
            <div className='ActionButton' onClick={search}>
                {props.searchButtonLabel || 'Search'}
            </div>
        </div>
    );
}
