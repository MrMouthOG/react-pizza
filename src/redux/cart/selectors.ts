import { RootStore } from "../store";

export const selectCart = (state: RootStore) => state.cart;
export const selectCartItemById = (id: string) => (state: RootStore) => state.cart.items.find(obj => obj.id === id);