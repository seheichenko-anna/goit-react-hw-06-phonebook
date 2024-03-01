import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterContacts, selectFilter } from '../../redux/filterSlice';
import { SearchInput, SearchWrapper } from './Filter.styled';

const Filter = () => {
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const handleSearch = e => {
    dispatch(filterContacts(e.target.value.toLowerCase().trim()));
  };

  return (
    <SearchWrapper>
      {' '}
      Find contacs by name
      <SearchInput type="text" value={filter} onChange={handleSearch} />
    </SearchWrapper>
  );
};

export default Filter;
