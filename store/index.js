// import getters from './getters';
import md5 from "md5"
import axios from "axios";


export const state = () => ({
  namespaced: true,
  state: {
    user_id: '1',
    isHamburger: false,
    isReceiptDeleteConfirmation: false,
    selected_receipt: [],
    products: ['Bread', 'Chicken', 'Salmon',
      'Pasta', 'Rice', 'Oil', 'Ketchup',
      'Salad', 'Cereals', 'Tomato', 'Carrot',
      'Cheese', 'Eggs', 'Juice', 'Milk', 'Pineapple'],
    new_receipt_products: [
      {product_name: 'Bananas', price: 3.50},
      {product_name: 'Strawberry', price: 6.43},
      {product_name: 'Corn Flakes', price: 2.09},
      {product_name: 'Beef', price: 11.99},
    ],
    new_receipt_date: {date: 'qwe'},
    existing_receipts: [],
    new_user: false
    },
});

export const getters = {

}

export const mutations = {
  SET_EXISTING_RECEIPTS: (state, receipts) => {
    // console.log(receipts)
    // if (typeof receipts !== "undefined") {
    //   let test = receipts.map(receipt => new Date(receipt.createdAt + '000'))
    //   console.log(test)
    // }

    // state.state.existing_receipts = products

    // console.log(receipts)

    state.state.existing_receipts = receipts

    // state.state.existing_receipts = [
    //   {
    //     createdAt: "02/07/2022",
    //     receipt_id: '7',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //       {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
    //       {product_name: 'Ham', price: 3.39, product_id: md5('Ham'.toLowerCase())},
    //       {product_name: 'Juice', price: 6.19, product_id: md5('Juice'.toLowerCase())},
    //       {product_name: 'Snickers', price: 0.99, product_id: md5('Snickers'.toLowerCase())},
    //       {product_name: 'Lasagne', price: 7.99, product_id: md5('Lasagne'.toLowerCase())},
    //       {product_name: 'Ketchup', price: 0.59, product_id: md5('Ketchup'.toLowerCase())},
    //       {product_name: 'Pineapple', price: 4.99, product_id: md5('Pineapple'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "08/21/2022",
    //     receipt_id: '13',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       // {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "12/16/2022",
    //     receipt_id: '19',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "02/09/2022",
    //     receipt_id: '6',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //       {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "08/25/2022",
    //     receipt_id: '12',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "12/19/2022",
    //     receipt_id: '18',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "02/10/2022",
    //     receipt_id: '5',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //       {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "08/20/2022",
    //     receipt_id: '11',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "12/15/2022",
    //     receipt_id: '17',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //       {product_name: 'Butter', price: 2.09, product_id: md5('Butter'.toLowerCase())},
    //       {product_name: 'Wine', price: 11.99, product_id: md5('Wine'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "02/16/2022",
    //     receipt_id: '4',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //       {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "08/10/2022",
    //     receipt_id: '10',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "12/04/2022",
    //     receipt_id: '16',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "02/25/2022",
    //     receipt_id: '3',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //       {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "08/03/2022",
    //     receipt_id: '9',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "12/22/2022",
    //     receipt_id: '15',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "02/27/2022",
    //     receipt_id: '2',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //       {product_name: 'Pizza', price: 4.99, product_id: md5('Pizza'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "08/16/2022",
    //     receipt_id: '8',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "12/25/2022",
    //     receipt_id: '14',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //     ]
    //   },
    //   {
    //     createdAt: "02/01/2021",
    //     receipt_id: '1',
    //     products: [
    //       {product_name: 'Bananas', price: 3.50, product_id: md5('Bananas'.toLowerCase())},
    //       {product_name: 'Strawberry', price: 6.43, product_id: md5('Strawberry'.toLowerCase())},
    //       {product_name: 'Corn Flakes', price: 2.09, product_id: md5('Corn Flakes'.toLowerCase())},
    //       {product_name: 'Beef', price: 11.99, product_id: md5('Beef'.toLowerCase())},
    //     ]
    //   },
    // ]

    let a = JSON.parse(JSON.stringify(state.state.existing_receipts))
      .sort((a, b) => Number(new Date(parseInt(a.createdAt+"000",10))) - Number(new Date(parseInt(b.createdAt+"000",10)))).reverse()

    state.state.selected_receipt = JSON.parse(JSON.stringify(
      state.state.existing_receipts.find(item => item.receipt_id === a[0].receipt_id))
    )

    state.state.selected_receipt.createdAt = new Date(parseInt(state.state.selected_receipt.createdAt+"000",10))
    state.state.selected_receipt.createdAt = ('0' + state.state.selected_receipt.createdAt.getMonth()).slice(-2) + '/'
      + ( '0' + state.state.selected_receipt.createdAt.getDate()).slice(-2)
      + '/' + state.state.selected_receipt.createdAt.getFullYear()


  },


  SET_NEW_USER_VALUE: (state, value) => {
    state.state.new_user = value
  },

  SET_RECEIPT_PRODUCTS_STATE: (state, product) => {
    console.log(product)
    state.state.new_receipt_products.push(product);
  },

  REMOVE_FROM_RECEIPT: (state, product_name) => {
    console.log(product_name)
    state.state.new_receipt_products.splice(
      state.state.new_receipt_products.indexOf(
        state.state.new_receipt_products.find(element => element.product_name === product_name)),1)
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
    let a = JSON.parse(JSON.stringify(state.state.existing_receipts))
      .sort((a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))).reverse()

    state.state.selected_receipt = JSON.parse(JSON.stringify(
      state.state.existing_receipts.find(item => item.receipt_id === a[0].receipt_id))
    )
  },

  // REPLACE_SELECTED_RECEIPT_MOBILE: (state, receipt) => {
  //   state.state.selected_receipt_mobile = receipt
  // },
}


export const actions = {
  ADD_PRODUCT_TO_RECEIPT_PRODUCTS({commit}, product){
    commit('SET_RECEIPT_PRODUCTS_STATE', product)
  },

  DELETE_FROM_RECEIPT({commit}, product_name){
    commit('REMOVE_FROM_RECEIPT', product_name)
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

  async GET_ALL_USER_DATA({commit}, user_id){
    return axios('http://127.0.0.1:8000/custom/' + user_id, {
      method: "GET",
      // headers: {'X-Requested-With': 'XMLHttpRequest'},
    })
      .then((products) => {
        commit('SET_NEW_USER_VALUE', products.data.new_user)
        // commit('SET_PRODUCTS_STATE', products);
        let test = products.data.receipts
        // console.log(typeof(test))
        // console.log(test.length)
        let testArr = []

        for (const t in test) {
          testArr.push(test[t])
        }

        // console.log(testArr)

        commit('SET_EXISTING_RECEIPTS', testArr)
        // console.log(products.data)
        return products.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  },

  async POST_NEW_RECEIPT({commit}, receipt){
    console.log(receipt)
    // console.log(new_receipt)
    // axios.post('http://localhost:8080/users', {
    //   'user_name': user.user_name,
    //   'email': user.email,
    //   'phone_number': user.phone_number
    // }).then(data =>( commit('SET_USER_ID', data.data[0])));
  },

  // SELECT_EXISTING_MOBILE({commit}, receipt){
  //   commit('REPLACE_SELECTED_RECEIPT_MOBILE', receipt)
  // },

}
