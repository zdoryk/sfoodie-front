// import getters from './getters';
import md5 from "md5"


export const state = () => ({
  namespaced: true,
  state: {
    products: ['Bread', 'Chicken', 'Salmon',
      'Pasta', 'Rice', 'Oil', 'Ketchup',
      'Salad', 'Cereals', 'Tomato', 'Carrot',
      'Cheese', 'Eggs', 'Juice', 'Milk', 'Pineapple'],
    receipt_products: [
      {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
      {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
      {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
      {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    ]
  },
});

export const getters = {
  // PRODUCTS(state) {
  //   return state.products;
  // },
}

export const mutations = {
  SET_RECEIPT_PRODUCTS_STATE: (state, product) => {
    console.log(product)
    state.state.receipt_products.push(product);
  },
}

export const actions = {
  ADD_PRODUCT_TO_RECEIPT_PRODUCTS({commit}, product){
    // console.log(user)
    console.log(product)
    commit('SET_RECEIPT_PRODUCTS_STATE', product)
  }
}
