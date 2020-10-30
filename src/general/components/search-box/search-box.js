import React, { useCallback, useEffect, useState } from 'react';
import './search-box.scss';
import '../../styles/buttons.scss';
import '../../styles/form.scss';
import PropTypes from 'prop-types';

export default function SearchBox(props) {
  const { searchString, searchButtonLabel } = props;
  const [text, setText] = useState(searchString);

  useEffect(() => setText(searchString), [searchString]);

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
