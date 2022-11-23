import React, { useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/filterSlice';

import { ReactComponent as SearchIcon } from '../../assets/img/search.svg';
import { ReactComponent as CloseIcon } from '../../assets/img/close.svg';
import styles from './Search.module.scss';

export function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 550),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <SearchIcon className={styles.icon} />
      <input
        value={value}
        ref={inputRef}
        onChange={onChangeInput}
        className={styles.input}
        type="search"
        placeholder="Поиск пиццы..."
      />
      {value && <CloseIcon onClick={onClickClear} className={styles.clear} />}
    </div>
  );
}
