import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pizzas, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizzas[], SearchPizzaParams>(
    'pizzas/fetchPizzas',
    async (params) => {
      const { order, sortBy, category, search, currentPage } = params;
  
      const { data } = await axios.get<Pizzas[]>(
        `https://634936fca59874146b1a394b.mockapi.io/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
      );
  
      return data;
    }
  );