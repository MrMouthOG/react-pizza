import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

function Categories({ value, onChangeCategory }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => {
          return (
            <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
