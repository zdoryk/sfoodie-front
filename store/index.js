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
  REMOVE_FROM_RECEIPT: (state, product_id) => {
    console.log(product_id)
    state.state.receipt_products.splice(
      state.state.receipt_products.indexOf(
        state.state.receipt_products.find(element => element.product_id === product_id)),1)
  }
}

export const actions = {
  ADD_PRODUCT_TO_RECEIPT_PRODUCTS({commit}, product){
    console.log(product)
    commit('SET_RECEIPT_PRODUCTS_STATE', product)
  },

  DELETE_FROM_RECEIPT({commit}, product_id){
    console.log(product_id)
    commit('REMOVE_FROM_RECEIPT', product_id)
  }
}
