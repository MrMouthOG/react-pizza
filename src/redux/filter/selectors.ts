import { RootStore } from "../store";

export const selectFilter = (state: RootStore) => state.filter;
export const selectSort = (state: RootStore) => state.filter.sort;