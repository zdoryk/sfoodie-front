// import getters from './getters';

export const state = () => ({
  namespaced: true,
  state: {
    products: ['Bread', 'Chicken', 'Salmon',
      'Pasta', 'Rice', 'Oil', 'Ketchup',
      'Salad', 'Cereals', 'Tomato', 'Carrot',
      'Cheese', 'Eggs', 'Juice', 'Milk', 'Pineapple'],
  },
});

export const getters = {
  PRODUCTS(state) {
    return state.products;
  },
}
