import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSort, selectSort } from '../redux/slices/filterSlice';

import { ReactComponent as SortLogo } from '../assets/img/arrow-top.svg';

export const list = [
  { name: 'популярности (DESC)', sortProperty: 'rating' },
  { name: 'популярности (ASC)', sortProperty: '-rating' },
  { name: 'цене (DESC)', sortProperty: 'price' },
  { name: 'цене (ASC)', sortProperty: '-price' },
  { name: 'алфавиту (DESC)', sortProperty: 'title' },
  { name: 'алфавиту (ASC)', sortProperty: '-title' },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef();

  const [open, setOpen] = useState(false);

  const onSelectSort = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.path.includes(sortRef.current)) {
        setOpen(false);
        console.log('!Sort was clicked');
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <SortLogo />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                onClick={() => onSelectSort(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
