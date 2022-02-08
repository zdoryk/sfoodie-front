// import getters from './getters';
import md5 from "md5"


export const state = () => ({
  namespaced: true,
  state: {
    products: ['Bread', 'Chicken', 'Salmon',
      'Pasta', 'Rice', 'Oil', 'Ketchup',
      'Salad', 'Cereals', 'Tomato', 'Carrot',
      'Cheese', 'Eggs', 'Juice', 'Milk', 'Pineapple'],
    new_receipt_products: [
      {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
      {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
      {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
      {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    ],
    new_receipt_date: {date: 'qwe'},
    existing_receipts: [
        {
          createdAt: "02/07/2022",
          receipt_id: '1',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
            {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
          ]
        },
        {
          createdAt: "08/16/2022",
          receipt_id: '2',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          ]
        },
        {
          createdAt: "12/25/2022",
          receipt_id: '3',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
          ]
        },
        {
          createdAt: "02/07/2022",
          receipt_id: '1',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
            {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
          ]
        },
        {
          createdAt: "08/16/2022",
          receipt_id: '2',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          ]
        },
        {
          createdAt: "12/25/2022",
          receipt_id: '3',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
          ]
        },
        {
          createdAt: "02/07/2022",
          receipt_id: '1',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
            {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
          ]
        },
        {
          createdAt: "08/16/2022",
          receipt_id: '2',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          ]
        },
        {
          createdAt: "12/25/2022",
          receipt_id: '3',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
          ]
        },
        {
          createdAt: "02/07/2022",
          receipt_id: '1',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
            {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
          ]
        },
        {
          createdAt: "08/16/2022",
          receipt_id: '2',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          ]
        },
        {
          createdAt: "12/25/2022",
          receipt_id: '3',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
          ]
        },
        {
          createdAt: "02/07/2022",
          receipt_id: '1',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
            {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
          ]
        },
        {
          createdAt: "08/16/2022",
          receipt_id: '2',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          ]
        },
        {
          createdAt: "12/25/2022",
          receipt_id: '3',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
          ]
        },
        {
          createdAt: "02/07/2022",
          receipt_id: '1',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
            {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
          ]
        },
        {
          createdAt: "08/16/2022",
          receipt_id: '2',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          ]
        },
        {
          createdAt: "12/25/2022",
          receipt_id: '3',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
          ]
        },
        {
          createdAt: "02/05/2021",
          receipt_id: '3',
          products: [
            {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
            {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
            {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
            {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
          ]
        },
    ]
    },
});

export const getters = {
//   TOTAL_PRICE(state) {
//       state.state.receipt_products.indexOf(
//         state.state.receipt_products.find(element => element.product_id === product_id))
//
//     return state.state.receipt_products;
//   },
}

export const mutations = {
  SET_RECEIPT_PRODUCTS_STATE: (state, product) => {
    console.log(product)
    state.state.new_receipt_products.push(product);
  },

  REMOVE_FROM_RECEIPT: (state, product_id) => {
    console.log(product_id)
    state.state.new_receipt_products.splice(
      state.state.new_receipt_products.indexOf(
        state.state.new_receipt_products.find(element => element.product_id === product_id)),1)
  },

  DELETE_ALL_FROM_RECEIPT: (state) => {
    state.state.new_receipt_products = []
  },

  REMOVE_RECEIPT_FROM_EXISTING: (state, receipt) => {
    console.log(receipt)
    state.state.existing_receipts.splice(state.state.existing_receipts.indexOf(state.state.existing_receipts.find(item => item.receipt_id === receipt.receipt_id)),1)
  }
}

export const actions = {
  ADD_PRODUCT_TO_RECEIPT_PRODUCTS({commit}, product){
    commit('SET_RECEIPT_PRODUCTS_STATE', product)
  },

  DELETE_FROM_RECEIPT({commit}, product_id){
    commit('REMOVE_FROM_RECEIPT', product_id)
  },

  DELETE_EXISTING_RECEIPT({commit}, receipt){
    commit('REMOVE_RECEIPT_FROM_EXISTING', receipt)
  }


}
