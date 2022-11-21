import React, { useContext, useRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import { ReactComponent as SearchIcon } from '../../assets/img/search.svg';
import { ReactComponent as CloseIcon } from '../../assets/img/close.svg';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';

export function Search() {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
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
