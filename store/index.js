import getters from './getters';

export const state = () => ({
  state: {
      products: ['Bread', 'Chicken', 'Salmon',
        'Pasta', 'Rice', 'Oil', 'Ketchup',
        'Salad', 'Cereals', 'Tomato', 'Carrot',
        'Cheese', 'Eggs', 'Juice', 'Milk', 'Pineapple'],
  },
  namespaced: true,
  getters: getters
});

// export default {
//   state,
//   getters
// }
