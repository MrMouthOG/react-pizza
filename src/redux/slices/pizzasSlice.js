import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;

    const { data } = await axios.get(
      `https://634936fca59874146b1a394b.mockapi.io/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading',
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    }
  }
});

export const selectPizzasData = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;