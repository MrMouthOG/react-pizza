import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number
  }>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://634936fca59874146b1a394b.mockapi.io/pizzas/' + id,
        );

        setPizza(data);
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка ...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Пицца" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} рублей</h4>
    </div>
  );
}

export default FullPizza;
