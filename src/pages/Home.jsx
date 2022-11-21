import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

//Components
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

//Redux
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

function Home() {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    async function fetchPizzas() {
      try {
        setIsLoading(true);

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `&category=${categoryId}` : ``;
        const search = searchValue ? `&search=${searchValue}` : '';

        await axios
          .get(
            `https://634936fca59874146b1a394b.mockapi.io/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
          )
          .then(({ data }) => {
            console.log(data);
            setPizzas(data);
            setIsLoading(false);
          });
      } catch (error) {
        alert('Произошла ошибка при загрузке данных');
        console.log(error);
      }
    }
    fetchPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const items = pizzas.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{isLoading ? 'Загрузка пиц' : 'Все пиццы'}</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
