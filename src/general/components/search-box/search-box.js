import React, { useCallback, useEffect, useState } from 'react';
import './search-box.scss';
import '../../styles/buttons.scss';
import '../../styles/form.scss';
import PropTypes from 'prop-types';

SearchBox.propTypes = {
  searchString: PropTypes.string,
  searchButtonLabel: PropTypes.string,
  search: PropTypes.func.isRequired,
};

export default function SearchBox(props) {
  const [text, setText] = useState(props.searchString || '');

  useEffect(() => setText(props.searchString || ''), [props.searchString]);

  const onTextChange = useCallback((event) => setText(event.target.value), []);

  const search = () => {
    props.search(text);
  };
  return (
    <div className="Search">
      <input
        name="search"
        className="DarkInput"
        value={text}
        placeholder="What do you want to watch?"
        onKeyDown={(event) => event.key === 'Enter' && search()}
        onChange={onTextChange}
      />
      <div
        className="PrimaryButton"
        onClick={search}
      >
        {props.searchButtonLabel || 'Search'}
      </div>
    </div>
  );
}
