// import getters from './getters';
import md5 from "md5"
import axios from "axios";
import jwt from 'vue-jwt-decode'
import Cookies from 'js-cookie'



export const state = () => ({
  namespaced: true,
  state: {
    user_id: 1,
    isHamburger: false,
    isReceiptDeleteConfirmation: false,
    selected_receipt: [],
    selected_category: {},
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
    // new_receipt_date: {date: 'qwe'},
    existing_receipts: [],
    existing_categories: [],
    new_user: false,
    color_palette:    [
      "#E7C074",
      // "#78909C",
      "#8D6E63",
      "#00ACC1",
      "#FF7043",
      "#B388FF",
      "#9E9E9E",
      "#66BB6A",
      "#536DFE",
      // "#0288D1",
      "#7CB342",
      // "#C0CA33",
      "#FFA726",
      "#FF4081",
      "#BA68C8",
      "#FF5252",
      "#26A69A"
    ],
    icons: ['cafes', 'drinks','fish', 'greens', 'pizza', 'snacks', 'wine','apple', 'carrot', 'milk', 'drumstick', 'baguette', 'bowl', 'candy'],
    access_token: null, // JWT access token
    refresh_token: null, // JWT refresh token
    id: null, // user id
    email_address: null, // user email address
    tree_map_data: []
  },
});

export const getters = {
  isAuthenticated: (state) => {
    if (new Date < new Date(jwt.decode(state.state.access_token)['exp'] * 1000)){
      // return state.state.access_token && state.state.access_token !== ''
      return true
    } else return ''
  },
}

export const mutations = {
  // AUTH_MUTATIONS_SET_USER: (state, { id, email_address }) =>{
  AUTH_MUTATIONS_SET_USER: (state, email_address ) =>{
    // state.id = id
    state.state.email_address = email_address
  },

  // store new or updated token fields in the state
  // AUTH_MUTATIONS_SET_PAYLOAD : (state, { access_token, refresh_token = null }) => {
  AUTH_MUTATIONS_SET_PAYLOAD : (state, access_token) => {
    state.state.access_token = access_token
    // refresh token is optional, only set it if present
    // if (refresh_token) {
    //   state.state.refresh_token = refresh_token
    // }
  },

  // clear our the state, essentially logging out the user
  AUTH_MUTATIONS_LOGOUT : (state)  =>{
    state.id = null
    state.email_address = null
    state.access_token = null
    state.refresh_token = null
  },

  SET_EXISTING_RECEIPTS: (state, receipts) => {

    state.state.existing_receipts = receipts

    let a = JSON.parse(JSON.stringify(state.state.existing_receipts))
      .sort((a, b) => Number(new Date(a.createdAt * 1000)) - Number(new Date(b.createdAt * 1000))).reverse()

    state.state.selected_receipt = JSON.parse(JSON.stringify(
      state.state.existing_receipts.find(item => item.receipt_id === a[0].receipt_id))
    )

    state.state.selected_receipt.createdAt = new Date(state.state.selected_receipt.createdAt * 1000)
    state.state.selected_receipt.createdAt = ('0' + (state.state.selected_receipt.createdAt.getMonth()+ 1)).slice(-2) + '/'
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
    console.log(receipt)
    state.state.selected_receipt = receipt
    // state.state.selected_receipt_desktop = receipt
  },

  SET_SELECTED_CATEGORY: (state, category) => {
    state.state.selected_category = category
  },

  SET_EXISTING_CATEGORIES: (state, categories) => {
    state.state.existing_categories = categories
    state.state.selected_category = state.state.existing_categories[0]
  },

  SET_FIRST_RECEIPT(state) {
    let a = JSON.parse(JSON.stringify(state.state.existing_receipts))
      .sort((a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))).reverse()

    console.log(a)
    // state.state.selected_receipt = JSON.parse(JSON.stringify(
    //   state.state.existing_receipts.find(item => item.receipt_id === a[0].receipt_id))
    // )
    state.state.selected_receipt = a[0]
    console.log(state.state.selected_receipt)
  },

  SET_TREE_MAP_DATA(state, data) {
    state.state.tree_map_data = data
  }


  // REPLACE_SELECTED_RECEIPT_MOBILE: (state, receipt) => {
  //   state.state.selected_receipt_mobile = receipt
  // },
}


export const actions = {
  async LOGIN ({ commit, dispatch }, {email, password}) {
    // make an API call to login the user with an email address and password
    axios.post('http://localhost:8000/token', "username=" + email + "&password=" + password,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function (data) {
        const access_token = data.data.access_token
        const decoded = jwt.decode(access_token)
        console.log(data)
        console.log(access_token)
        console.log(decoded)
        commit('AUTH_MUTATIONS_SET_USER', decoded.sub)
        commit('AUTH_MUTATIONS_SET_PAYLOAD', access_token)
        console.log(Cookies.get(['authentication-cookies']))
      })
    // const { data: { data: { user, payload } } } = await this.$axios.post(
    //   '/api/auth/login',
    //   { email_address, password }
    // )

    // commit the user and tokens to the state
    // commit(AUTH_MUTATIONS_SET_USER, user, )
    // commit(AUTH_MUTATIONS_SET_PAYLOAD, payload)
  },

  async register ({ commit }, { email_addr, password }) {
    // make an API call to register the user
    const { data: { data: { user, payload } } } = await this.$axios.post(
      '/api/auth/register',
      { email_address, password }
    )

    // commit the user and tokens to the state
    // commit(AUTH_MUTATIONS.SET_USER, user)
    // commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // given the current refresh token, refresh the user's access token to prevent expiry
  // async refresh ({ commit, state }) {
  //   const { refresh_token } = state
  //
  //   // make an API call using the refresh token to generate a new access token
  //   const { data: { data: { payload } } } = await this.$axios.post(
  //     '/api/auth/refresh',
  //     { refresh_token }
  //   )
  //
  //   commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  // },

  // logout the user
  // logout ({ commit, state }) {
  //   commit(AUTH_MUTATIONS.LOGOUT)
  // },

  async GET_ME ({},token){
    console.log('Bearer ' + token)
    await this.$axios.get('http://127.0.0.1:8000/users/me',
      // {
      //   headers: {'Authorization': 'Bearer ' + token},
      // }
    )
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  },

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
    console.log(receipt)
    commit('REPLACE_SELECTED_RECEIPT', receipt)
  },

  SELECT_FIRST_RECEIPT({commit}){
    commit('SET_FIRST_RECEIPT')
  },

  SET_EXISTING_RECEIPTS_ACTION({commit}){
    commit('SET_EXISTING_RECEIPTS')
  },

  SELECT_EXISTING_CATEGORY ({commit}, category){
    commit('SET_SELECTED_CATEGORY', category)
  },

  async GET_ALL_USER_DATA({commit}, user_id){
    await this.$axios('http://127.0.0.1:8000/custom/' + user_id, {
      method: "GET",
      // headers: {'X-Requested-With': 'XMLHttpRequest'},
    })
      .then((products) => {
        console.log(products.data)
        commit('SET_NEW_USER_VALUE', products.data.new_user)
        // commit('SET_PRODUCTS_STATE', products);
        let receipts = products.data.receipts

        // console.log(test.length)
        let receiptsArr = []

        for (const t in receipts) {
          receiptsArr.push(receipts[t])
        }
        commit('SET_EXISTING_RECEIPTS', receiptsArr)


        // CATEGORIES

        let categories = products.data.categories
        delete categories.user_id
        let all_products = {
          "category_name": "All Products",
          "ico": "cafes",
          "color": "black",
          "products": []
        }
        let some_array = []
        console.log(categories)
        for (const [key, value] of Object.entries(categories)) {
          let temp_object = {}
          for (let [k, v] of Object.entries(value)){
            temp_object[k] = v
            if (k === 'products'){
              temp_object[k] = v.map(function (product){
                const temp_product = {
                  "product_name": product,
                  "product_category": key,
                  "color": value.color
                }
                all_products.products.push(temp_product)
                return temp_product
              })
            }
          }

          some_array.push({
            "category_name": key,
            "ico": temp_object.ico,
            "color": temp_object.color,
            "products": temp_object.products,
          })
        }
        some_array.unshift(all_products)

        console.log(some_array)



        commit('SET_EXISTING_CATEGORIES', some_array)

        // console.log(testArr)

        // console.log(products.data)
        return products.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  },

  async GET_ALL_USER_RECEIPTS({commit}, user_id){
    await this.$axios('http://127.0.0.1:8000/receipts/' + user_id, {
      method: "GET",
      // headers: {'X-Requested-With': 'XMLHttpRequest'},
    })
      .then((products) => {
        return products;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  },

  async POST_NEW_RECEIPT({commit}, receipt){
    console.log(receipt)
    this.$axios.post('http://localhost:8000/receipts/post_user_receipt', receipt)
      .then(data =>(
        console.log(data)
      ));
  },

  async DELETE_RECEIPT_REQUEST ({commit}, receipt_and_user_ids){
    this.$axios.delete(`http://localhost:8000/receipts/delete_user_receipt`, {data: receipt_and_user_ids})
      .then(response => {
        if (response.data.Status === 'OK'){
          commit('DELETE_SELECTED_RECEIPT_FROM_EXISTING')
          commit('SET_FIRST_RECEIPT')
          // commit('REPLACE_SELECTED_RECEIPT', new_receipt)
        }
        return response
      }).catch(error => {
        console.log(error)
      })
  },


  async MOVE_TO_OTHER({commit, dispatch}, data_for_update){
    console.log(data_for_update)
    this.$axios.put('http://localhost:8000/products/replace_user_product_category', data_for_update)
      .then(function(data){
        dispatch('GET_ALL_USER_DATA', data_for_update.user_id)  // THERE NEED TO BE ANOTHER ACTION THAT WILL NOT FETCH ALL THE DATA ONLY THAT WE NEED TO
        console.log(data)
      });
  },

  async EDIT_PRODUCT({commit, dispatch}, data_for_update){
    console.log(data_for_update)
    this.$axios.put('http://localhost:8000/products/update_user_product', data_for_update)
      .then(function(data){
        dispatch('GET_ALL_USER_DATA', data_for_update.user_id)  // THERE NEED TO BE ANOTHER ACTION THAT WILL NOT FETCH ALL THE DATA ONLY THAT WE NEED TO
        console.log(data)
      });
  },

  async POST_NEW_CATEGORY({commit}, category) {
    console.log(category)
    this.$axios.post('http://localhost:8000/products/post_new_user_category', category)
      .then(data => (
        console.log(data)
      ))
  },

  async POST_NEW_PRODUCT({commit}, product) {
    console.log(product)
    this.$axios.post('http://localhost:8000/products/post_new_user_product', product)
      .then(data => (
        console.log(data)
      ))
  },

  async GET_TREEMAP_DATA({commit}, user_id){
    await this.$axios('http://127.0.0.1:8000/custom/tree_map_chart/' + user_id, {
      method: "GET",
      // headers: {'X-Requested-With': 'XMLHttpRequest'},
    })
      .then((data) => {
        console.log(data.data)
        commit('SET_TREE_MAP_DATA', data.data)
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
  },


}
