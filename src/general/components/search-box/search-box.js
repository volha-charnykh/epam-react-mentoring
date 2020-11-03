import React, { useCallback, useEffect, useState } from 'react';
import './search-box.scss';
import '../../styles/buttons.scss';
import '../../styles/form.scss';
import PropTypes from 'prop-types';

export default function SearchBox(props) {
  const { searchString, searchButtonLabel, search } = props;
  const [text, setText] = useState(searchString);

  useEffect(() => {
    setText(searchString);
  }, [searchString]);

  const onTextChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const searchStr = useCallback(() => {
    if (text && text !== searchString) {
      search(text);
    }
  }, [search]);

  const onKeyDown = useCallback((event) => event.key === 'Enter' && searchStr(), [searchStr]);

  return (
    <div className="Search">
      <input
        name="search"
        className="DarkInput"
        value={text}
        placeholder="What do you want to watch?"
        onKeyDown={onKeyDown}
        onChange={onTextChange}
      />
      <div
        className="PrimaryButton"
        onClick={searchStr}
      >
        {searchButtonLabel}
      </div>
    </div>
  );
}

SearchBox.propTypes = {
  searchString: PropTypes.string,
  searchButtonLabel: PropTypes.string,
  search: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  searchString: '',
  searchButtonLabel: 'Search',
};
