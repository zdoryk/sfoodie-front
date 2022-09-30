// import getters from './getters';
import md5 from "md5"


export const state = () => ({
  namespaced: true,
  state: {
    isHamburger: false,
    isReceiptDeleteConfirmation: false,
    selected_receipt: [],
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
    existing_receipts: []
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
  SET_EXISTING_RECEIPTS: (state) => {
    console.log('Hey')
    state.state.existing_receipts = [
      {
        createdAt: "02/07/2022",
        receipt_id: '1',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
          {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
          {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
          {product_name: 'Ham', price: 3.39, product_id: md5('Ham'.toLowerCase())},
          {product_name: 'Juice', price: 6.19, product_id: md5('Juice'.toLowerCase())},
          {product_name: 'Snickers', price: 0.99, product_id: md5('Snickers'.toLowerCase())},
          {product_name: 'Lasagne', price: 7.99, product_id: md5('Lasagne'.toLowerCase())},
          {product_name: 'Ketchup', price: 0.59, product_id: md5('Ketchup'.toLowerCase())},
          {product_name: 'Pineapple', price: 4.99, product_id: md5('Pineapple'.toLowerCase())},
        ]
      },
      {
        createdAt: "08/16/2022",
        receipt_id: '2',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          // {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
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
        receipt_id: '4',
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
        receipt_id: '5',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
        ]
      },
      {
        createdAt: "12/25/2022",
        receipt_id: '6',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
          {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
        ]
      },
      {
        createdAt: "02/07/2022",
        receipt_id: '7',
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
        receipt_id: '8',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
        ]
      },
      {
        createdAt: "12/25/2022",
        receipt_id: '9',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
          {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
        ]
      },
      {
        createdAt: "02/07/2022",
        receipt_id: '10',
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
        receipt_id: '12',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
        ]
      },
      {
        createdAt: "12/25/2022",
        receipt_id: '13',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
          {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
        ]
      },
      {
        createdAt: "02/07/2022",
        receipt_id: '14',
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
        receipt_id: '15',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
        ]
      },
      {
        createdAt: "12/25/2022",
        receipt_id: '16',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
          {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
        ]
      },
      {
        createdAt: "02/07/2022",
        receipt_id: '17',
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
        receipt_id: '18',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
        ]
      },
      {
        createdAt: "12/25/2022",
        receipt_id: '19',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
          {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
        ]
      },
      {
        createdAt: "02/05/2021",
        receipt_id: '20',
        products: [
          {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
          {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
          {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
          {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
        ]
      },
    ]
    state.state.selected_receipt = state.state.existing_receipts[0]
  },


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

  // REMOVE_RECEIPT_FROM_EXISTING: (state, receipt) => {
  //   console.log(receipt)
  //   state.state.existing_receipts.splice(state.state.existing_receipts.indexOf(state.state.existing_receipts.find(item => item.receipt_id === receipt.receipt_id)),1)
  // },

  DELETE_SELECTED_RECEIPT_FROM_EXISTING: (state) => {
    state.state.existing_receipts.splice(state.state.existing_receipts.indexOf(state.state.existing_receipts.find(item => item.receipt_id === state.state.selected_receipt.receipt_id)),1)
  },

  CHANGE_HAMBURGER_STATE: (state) => {
    state.state.isHamburger = !state.state.isHamburger
  },

  REPLACE_SELECTED_RECEIPT: (state, receipt) => {
    state.state.selected_receipt = receipt
    // state.state.selected_receipt_desktop = receipt
  },

  SET_FIRST_RECEIPT(state) {
    console.log(this.$store.state.state.existing_receipts)
    state.state.selected_receipt = state.state.existing_receipts[0]
    // state.state.selected_receipt_desktop = state.state.existing_receipts[0]
  },

  // REPLACE_SELECTED_RECEIPT_MOBILE: (state, receipt) => {
  //   state.state.selected_receipt_mobile = receipt
  // },
}


export const actions = {
  ADD_PRODUCT_TO_RECEIPT_PRODUCTS({commit}, product){
    commit('SET_RECEIPT_PRODUCTS_STATE', product)
  },

  DELETE_FROM_RECEIPT({commit}, product_id){
    commit('REMOVE_FROM_RECEIPT', product_id)
  },

  // DELETE_EXISTING_RECEIPT({commit}, receipt){
  //   commit('REMOVE_RECEIPT_FROM_EXISTING', receipt)
  // },

  DELETE_SELECTED_RECEIPT({commit}){
    commit('DELETE_SELECTED_RECEIPT_FROM_EXISTING')
  },

  CHANGE_HAMBURGER_STATE_ACTION({commit}, active){
    commit('CHANGE_HAMBURGER_STATE')
  },

  SELECT_EXISTING_RECEIPT({commit}, receipt){
    commit('REPLACE_SELECTED_RECEIPT', receipt)
  },

  SELECT_FIRST_RECEIPT({commit}){
    commit('SET_FIRST_RECEIPT')
  },

  SET_EXISTING_RECEIPTS_ACTION({commit}){
    commit('SET_EXISTING_RECEIPTS')
  },

  // SELECT_EXISTING_MOBILE({commit}, receipt){
  //   commit('REPLACE_SELECTED_RECEIPT_MOBILE', receipt)
  // },

}
