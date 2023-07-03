// import getters from './getters';
import md5 from "md5";
import axios from "axios";
import jwt from "vue-jwt-decode";
import Cookies from "js-cookie";

const back_link = "https://sfoodiedeta-1-w6589305.deta.app";
// const back_link = 'http://10.9.179.156:8080'
// const back_link = 'http://192.168.0.7:8080'
import currencyData from "assets/currency.json";

export const state = () => ({
  namespaced: true,
  state: {
    isHamburger: false,
    isReceiptDeleteConfirmation: false,
    selected_receipt: [],
    selected_category: {},
    products: [
      "Bread",
      "Chicken",
      "Salmon",
      "Pasta",
      "Rice",
      "Oil",
      "Ketchup",
      "Salad",
      "Cereals",
      "Tomato",
      "Carrot",
      "Cheese",
      "Eggs",
      "Juice",
      "Milk",
      "Pineapple",
    ],
    new_receipt_products: [],
    existing_receipts: [],
    existing_categories: [],
    new_user: false,
    color_palette: [
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
      "#26A69A",
    ],
    icons: [
      "cafes",
      "drinks",
      "fish",
      "greens",
      "pizza",
      "snacks",
      "wine",
      "apple",
      "carrot",
      "milk",
      "drumstick",
      "baguette",
      "bowl",
      "candy",
    ],
    access_token: null, // JWT access token
    refresh_token: null, // JWT refresh token
    user_id: null, // user id
    email_address: null, // user email address
    currency: null, // user currency
    currency_symbol: null,
    tree_map_data: [],
    stacked_bar_data: [],
    charts_shared: {
      selected_category: "None",
      isChartCategoryData: false,
      product: {
        isProductSelected: false,
        index: 0,
        product_name: null,
      },
      // selected_category_index: null,
      colors: [],
    },
    showCookieWarning: false,
  },
});

export const getters = {
  isAuthenticated: (state) => {
    if (
      new Date() < new Date(jwt.decode(state.state.access_token)["exp"] * 1000)
    ) {
      // return state.state.access_token && state.state.access_token !== ''
      return true;
    } else return "";
  },

  currencySymbol: (state) => {
    return state.state.currency_symbol;
  },
};

export const mutations = {
  SET_SHOW_COOKIE_WARNING: (state, value) => {
    state.state.showCookieWarning = value;
  },

  SET_CHART_SELECTED_PRODUCT_NAME: (state, data) => {
    state.state.charts_shared.product.product_name = data;
  },
  // AUTH_MUTATIONS_SET_USER: (state, { id, email_address }) =>{
  AUTH_MUTATIONS_SET_USER: (state, data) => {
    // state.id = id
    console.log(data);
    state.state.email_address = data.email;
    state.state.user_id = data.user_id;
    state.state.currency = data.currency;
    state.state.currency_symbol = currencyData[data.currency].symbol + " ";
    console.log(state.state.currency_symbol);
  },

  // store new or updated token fields in the state
  // AUTH_MUTATIONS_SET_PAYLOAD : (state, { access_token, refresh_token = null }) => {
  AUTH_MUTATIONS_SET_PAYLOAD: (state, access_token) => {
    state.state.access_token = access_token;
    // refresh token is optional, only set it if present
    // if (refresh_token) {
    //   state.state.refresh_token = refresh_token
    // }
  },

  // clear our the state, essentially logging out the user
  AUTH_MUTATIONS_LOGOUT: (state) => {
    state.state.user_id = null;
    state.state.email_address = null;
    state.state.access_token = null;
    state.state.currency = null;
    state.state.currency_symbol = null;
    // state.refresh_token = null
  },

  DELETE_NEW_RECEIPT_PRODUCTS: (state) => {
    state.state.new_receipt_products = [];
  },

  SET_EXISTING_RECEIPTS: (state, receipts) => {
    state.state.existing_receipts = receipts;

    let a = JSON.parse(JSON.stringify(state.state.existing_receipts))
      .sort(
        (a, b) =>
          Number(new Date(a.createdAt * 1000)) -
          Number(new Date(b.createdAt * 1000))
      )
      .reverse();

    state.state.selected_receipt = JSON.parse(
      JSON.stringify(
        state.state.existing_receipts.find(
          (item) => item.receipt_id === a[0].receipt_id
        )
      )
    );

    state.state.selected_receipt.createdAt = new Date(
      state.state.selected_receipt.createdAt * 1000
    );
    state.state.selected_receipt.createdAt =
      ("0" + (state.state.selected_receipt.createdAt.getMonth() + 1)).slice(
        -2
      ) +
      "/" +
      ("0" + state.state.selected_receipt.createdAt.getDate()).slice(-2) +
      "/" +
      state.state.selected_receipt.createdAt.getFullYear();
  },

  SET_NEW_USER_VALUE: (state, value) => {
    state.state.new_user = value;
  },

  SET_RECEIPT_PRODUCTS_STATE: (state, product) => {
    console.log(product);
    state.state.new_receipt_products.push(product);
  },

  REMOVE_FROM_RECEIPT: (state, product_name) => {
    console.log(product_name);
    state.state.new_receipt_products.splice(product_name, 1);
    // state.state.new_receipt_products.splice(
    //   state.state.new_receipt_products.indexOf(
    //     state.state.new_receipt_products.find(element => element.product_name === product_name)),1)
  },

  DELETE_ALL_FROM_RECEIPT: (state) => {
    state.state.new_receipt_products = [];
  },

  // REMOVE_RECEIPT_FROM_EXISTING: (state, receipt) => {
  //   console.log(receipt)
  //   state.state.existing_receipts.splice(state.state.existing_receipts.indexOf(state.state.existing_receipts.find(item => item.receipt_id === receipt.receipt_id)),1)
  // },

  DELETE_SELECTED_RECEIPT_FROM_EXISTING: (state) => {
    state.state.existing_receipts.splice(
      state.state.existing_receipts.indexOf(
        state.state.existing_receipts.find(
          (item) => item.receipt_id === state.state.selected_receipt.receipt_id
        )
      ),
      1
    );
  },

  CHANGE_HAMBURGER_STATE: (state) => {
    state.state.isHamburger = !state.state.isHamburger;
  },

  REPLACE_SELECTED_RECEIPT: (state, receipt) => {
    console.log(receipt);
    state.state.selected_receipt = receipt;
    // state.state.selected_receipt_desktop = receipt
  },

  SET_SELECTED_CATEGORY: (state, category) => {
    state.state.selected_category = category;
  },

  SET_EXISTING_CATEGORIES: (state, categories) => {
    state.state.existing_categories = categories;
    state.state.selected_category = state.state.existing_categories[0];
  },

  SET_FIRST_RECEIPT(state) {
    let a = JSON.parse(JSON.stringify(state.state.existing_receipts))
      .sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
      )
      .reverse();

    console.log(a);
    // state.state.selected_receipt = JSON.parse(JSON.stringify(
    //   state.state.existing_receipts.find(item => item.receipt_id === a[0].receipt_id))
    // )
    state.state.selected_receipt = a[0];
    console.log(state.state.selected_receipt);
  },

  SET_TREE_MAP_DATA(state, data) {
    state.state.tree_map_data = data;
  },

  SET_STACKED_BAR_DATA(state) {
    // Create a list of all possible product names and days of the week
    const productNames = [];
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    for (const receipt of state.state.existing_receipts) {
      for (const product of receipt.products) {
        productNames.push(product.product_name);
      }
    }

    // Make sure the product names and days of the week are unique
    const uniqueProductNames = new Set(productNames);
    const uniqueDaysOfWeek = new Set(daysOfWeek);

    // Create a dictionary with all possible combinations of product names and days of the week
    // and initialize the values to 0

    const categoryMap = {};
    for (const category of state.state.existing_categories) {
      for (const product of category.products) {
        categoryMap[product.product_name] = category.category_name;
      }
    }

    const productSums = {};
    const categorySums = {};
    const productCounts = {};
    const categoryCounts = {};

    for (const productName of uniqueProductNames) {
      for (const dayOfWeek of uniqueDaysOfWeek) {
        productSums[`${productName},${dayOfWeek}`] = 0;
        productCounts[`${productName},${dayOfWeek}`] = 0;
        if (categoryMap[productName] !== undefined) {
          categorySums[`${categoryMap[productName]},${dayOfWeek}`] = 0;
          categoryCounts[`${categoryMap[productName]},${dayOfWeek}`] = 0;
        }
      }
    }

    // Iterate over the receipts

    for (const receipt of state.state.existing_receipts) {
      // Calculate the day of the week for the receipt using the Date object
      const date = new Date(receipt.createdAt * 1000);
      const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });

      // Get the list of products for the receipt
      const products = receipt.products;

      // Iterate over the products
      for (const product of products) {
        const productName = product.product_name;
        const productPrice = product.price;
        const categoryName = categoryMap[productName];
        // Temporary
        if (categoryName !== undefined) {
          categorySums[`${categoryName},${dayOfWeek}`] += productPrice;
          categoryCounts[`${categoryName},${dayOfWeek}`] += 1;
        }
        // Update the value in the dictionary by adding the product price
        productSums[`${productName},${dayOfWeek}`] += productPrice;
        productCounts[`${productName},${dayOfWeek}`] += 1;
      }
    }

    const productAverages = {};
    const categoryAverages = {};

    console.group();
    console.log(uniqueDaysOfWeek);
    console.log(uniqueProductNames);
    console.groupEnd();

    for (const productName of uniqueProductNames) {
      for (const dayOfWeek of uniqueDaysOfWeek) {
        // if (productCounts[`${productName},${dayOfproductsWeek}`] === 0) productAverages[`${productName},${dayOfWeek}`] = 0
        if (productCounts[`${productName},${dayOfWeek}`] === 0)
          productAverages[`${productName},${dayOfWeek}`] = 0;
        else
          productAverages[`${productName},${dayOfWeek}`] =
            productSums[`${productName},${dayOfWeek}`] /
            productCounts[`${productName},${dayOfWeek}`];
        const categoryName = categoryMap[productName];
        if (categoryName !== undefined) {
          if (categoryCounts[`${categoryName},${dayOfWeek}`] === 0)
            categoryAverages[`${categoryName},${dayOfWeek}`] = 0;
          else
            categoryAverages[`${categoryName},${dayOfWeek}`] =
              categorySums[`${categoryName},${dayOfWeek}`] /
              categoryCounts[`${categoryName},${dayOfWeek}`];
        }
      }
    }

    // console.group()
    // console.log(categorySums)
    // console.log(categoryCounts)
    // console.log(categoryAverages)
    // console.groupEnd()
    // console.group()
    // console.log(productSums)
    // console.log(productCounts)
    // console.log(productAverages)
    // console.groupEnd()

    // Print the product sums
    state.state.stacked_bar_data = {
      categories: categoryAverages,
      // 'categories': categoryCounts,
      // 'categories': categorySums,
      // "products": productCounts,
      products: productAverages,
      // 'products': productSums ,
      category_map_products: categoryMap,
    };
    // console.log(state.state.stacked_bar_data)
  },

  SET_CATEGORY_CHART_DATA(state, data) {
    state.state.charts_shared.selected_category = data.selected_category;
    state.state.charts_shared.isChartCategoryData = data.isChartCategoryData;
  },

  SET_SHARED_CHART_COLORS(state, data) {
    state.state.charts_shared.colors = data;
  },

  SET_IS_CHART_SELECTED_PRODUCT(state, data) {
    console.log(data.bool, data.index);
    state.state.charts_shared.product.isProductSelected = data.bool;
    state.state.charts_shared.product.index = data.index;
  },

  SET_USER_PRODUCTS(state, receipts) {
    state.state.products = new Set(
      [].concat(
        ...receipts.map((receipt) =>
          receipt.products.map((product) => product.product_name)
        )
      )
    );
  },

  // REPLACE_SELECTED_RECEIPT_MOBILE: (state, receipt) => {
  //   state.state.selected_receipt_mobile = receipt
  // },
};

export const actions = {
  CHECK_COOKIE_ACCEPTED({ commit }) {
    let cookieAccepted = localStorage.getItem("cookieAccepted");

    if (!cookieAccepted) {
      commit("SET_SHOW_COOKIE_WARNING", true);
    }
  },

  SET_COOKIE_WARNING_ACCEPTED({ commit }) {
    localStorage.setItem("cookieAccepted", true);
    commit("SET_SHOW_COOKIE_WARNING", false);
  },

  SET_CATEGORY_CHART_DATA_ACTION(
    { commit },
    { selected_category, isChartCategoryData }
  ) {
    commit("SET_CATEGORY_CHART_DATA", {
      selected_category,
      isChartCategoryData,
    });
  },

  SET_IS_CHART_SELECTED_PRODUCT_ACTION(commit, { bool, index }) {
    commit("SET_IS_CHART_SELECTED_PRODUCT", { bool, index });
  },

  SET_SHARED_CHART_COLORS_ACTION({ commit }, colors) {
    commit("SET_SHARED_CHART_COLORS", colors);
  },

  async LOGIN({ commit, dispatch, context }, { email, password }) {
    try {
      const data = await axios.post(
        back_link + "/token",
        "username=" + email + "&password=" + password,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const access_token = data.data.access_token;
      const decoded = jwt.decode(access_token);
      if (decoded) {
        commit("AUTH_MUTATIONS_SET_USER", {
          user_id: decoded.user_id,
          currency: decoded.currency,
          email: decoded.sub,
        });
        commit("AUTH_MUTATIONS_SET_PAYLOAD", access_token);
        $nuxt.$router.push("/program/AddNewReceipt");
      }
    } catch (error) {
      throw error.response.data.detail;
    }
  },

  async SIGN_UP({ commit }, { email_address, password }) {
    try {
      return await axios.post(
        back_link + "/token/register",
        "username=" + email_address + "&password=" + password,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      // if (data.data.detail === 'Message has been sent'){
      //   return data.data.detail
      // }
      // const access_token = data.data.access_token
      // const decoded = jwt.decode(access_token)
      // if (decoded) {
      //   console.log(data)
      //   console.log(access_token)
      //   console.log(decoded)
      // commit('AUTH_MUTATIONS_SET_USER', {user_id: decoded.user_id, currency: decoded.currency, email: decoded.sub})
      // commit('AUTH_MUTATIONS_SET_PAYLOAD', access_token)
      // $nuxt.$router.push('/program/AddNewReceipt')
      // }
    } catch (error) {
      throw error.response;
    }

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
  LOGOUT({ commit, state }) {
    commit("AUTH_MUTATIONS_LOGOUT");
    $nuxt.$router.push("/Login");
  },

  async GET_ME({}, token) {
    console.log("Bearer " + token);
    await this.$axios
      .get(
        back_link + "/users/me"
        // {
        //   headers: {'Authorization': 'Bearer ' + token},
        // }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  ADD_PRODUCT_TO_RECEIPT_PRODUCTS({ commit }, product) {
    commit("SET_RECEIPT_PRODUCTS_STATE", product);
  },

  DELETE_FROM_RECEIPT({ commit }, product_name) {
    commit("REMOVE_FROM_RECEIPT", product_name);
  },

  // DELETE_EXISTING_RECEIPT({commit}, receipt){
  //   commit('REMOVE_RECEIPT_FROM_EXISTING', receipt)
  // },

  DELETE_SELECTED_RECEIPT({ commit }) {
    commit("DELETE_SELECTED_RECEIPT_FROM_EXISTING");
  },

  CHANGE_HAMBURGER_STATE_ACTION({ commit }, active) {
    commit("CHANGE_HAMBURGER_STATE");
  },

  SELECT_EXISTING_RECEIPT({ commit }, receipt) {
    console.log(receipt);
    commit("REPLACE_SELECTED_RECEIPT", receipt);
  },

  SELECT_FIRST_RECEIPT({ commit }) {
    commit("SET_FIRST_RECEIPT");
  },

  SET_EXISTING_RECEIPTS_ACTION({ commit }) {
    commit("SET_EXISTING_RECEIPTS");
  },

  SELECT_EXISTING_CATEGORY({ commit }, category) {
    commit("SET_SELECTED_CATEGORY", category);
  },

  // DEV METHOD
  async GET_ALL_USER_DATA({ commit }, user_id) {
    this.$axios(back_link + "/custom/" + user_id, {
      method: "GET",
      // headers: {'X-Requested-With': 'XMLHttpRequest'},
    })
      .then((products) => {
        // console.log(products.data)
        commit("SET_NEW_USER_VALUE", products.data.new_user);
        // commit('SET_PRODUCTS_STATE', products);
        let receipts = products.data.receipts;

        // console.log(test.length)
        let receiptsArr = [];

        for (const t in receipts) {
          receiptsArr.push(receipts[t]);
        }
        commit("SET_EXISTING_RECEIPTS", receiptsArr);

        // CATEGORIES

        let categories = products.data.categories;
        delete categories.user_id;
        let all_products = {
          category_name: "All Products",
          ico: "cafes",
          color: "black",
          products: [],
        };
        let some_array = [];
        // console.log(categories)
        for (const [key, value] of Object.entries(categories)) {
          let temp_object = {};
          for (let [k, v] of Object.entries(value)) {
            temp_object[k] = v;
            if (k === "products") {
              temp_object[k] = v.map(function (product) {
                const temp_product = {
                  product_name: product,
                  product_category: key,
                  color: value.color,
                };
                all_products.products.push(temp_product);
                return temp_product;
              });
            }
          }

          some_array.push({
            category_name: key,
            ico: temp_object.ico,
            color: temp_object.color,
            products: temp_object.products,
          });
        }
        some_array.unshift(all_products);

        console.log(some_array);

        commit("SET_EXISTING_CATEGORIES", some_array);

        // console.log(testArr)

        // console.log(products.data)
        return products.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  async GET_ALL_USER_RECEIPTS({ commit }, user_id) {
    await this.$axios(back_link + "/receipts/" + user_id, {
      method: "GET",
      // headers: {'X-Requested-With': 'XMLHttpRequest'},
    })
      .then((receipts) => {
        commit("SET_USER_PRODUCTS", receipts.data);
        commit("SET_EXISTING_RECEIPTS", receipts.data);
        commit("SET_STACKED_BAR_DATA");
        console.log(receipts.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  async POST_NEW_RECEIPT({ commit }, receipt) {
    console.log(receipt);
    this.$axios
      .post(back_link + "/receipts/post_user_receipt", receipt)
      .then((data) => console.log(data));
    commit("DELETE_NEW_RECEIPT_PRODUCTS");
  },

  async DELETE_RECEIPT_REQUEST({ commit }, receipt_and_user_ids) {
    this.$axios
      .delete(
        back_link +
          "/receipts/delete_user_receipt/?user_id=" +
          receipt_and_user_ids.user_id +
          "&receipt_id=" +
          receipt_and_user_ids.receipt_id
      )
      .then((response) => {
        if (response.data.Status === "OK") {
          commit("DELETE_SELECTED_RECEIPT_FROM_EXISTING");
          commit("SET_FIRST_RECEIPT");
          // commit('REPLACE_SELECTED_RECEIPT', new_receipt)
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // async MOVE_TO_OTHER({commit, dispatch}, data_for_update){
  //   console.log(data_for_update)
  //   this.$axios.put(back_link + '/products/replace_user_product_category', data_for_update)
  //     .then(function(data){
  //       dispatch('GET_ALL_USER_DATA', data_for_update.user_id)  // THERE NEED TO BE ANOTHER ACTION THAT WILL NOT FETCH ALL THE DATA ONLY THAT WE NEED TO
  //       console.log(data)
  //     });
  // },

  async EDIT_PRODUCT({ commit, dispatch }, data_for_update) {
    console.log(data_for_update);
    this.$axios
      .put(back_link + "/products/update_user_product", data_for_update)
      .then(function (data) {
        dispatch("GET_USER_CATEGORIES", data_for_update.user_id);
        console.log(data);
      });
  },

  async POST_NEW_CATEGORY({ commit, dispatch }, category) {
    console.log(category);
    this.$axios
      .post(back_link + "/products/post_new_user_category", category)
      .then((data) => {
        console.log(data);
        dispatch("GET_USER_CATEGORIES", category.user_id);
      });
  },

  async POST_NEW_PRODUCT({ commit }, product) {
    console.log(product);
    this.$axios
      .post(back_link + "/products/post_new_user_product", product)
      .then((data) => console.log(data));
  },

  async GET_TREEMAP_DATA({ commit, state }, data) {
    await this.$axios(
      back_link +
        "/custom/tree_map_chart/?user_id=" +
        data.user_id +
        "&start_timestamp=" +
        data.start.toFixed(0) +
        "&end_timestamp=" +
        data.end.toFixed(0),
      {
        method: "GET",
        // headers: {'X-Requested-With': 'XMLHttpRequest'},
      }
    )
      .then((data) => {
        console.log(data.data);
        commit("SET_TREE_MAP_DATA", data.data);
        commit("SET_STACKED_BAR_DATA");
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  async GET_USER_CATEGORIES({ commit }, user_id) {
    this.$axios.get(back_link + "/products/" + user_id).then((products) => {
      console.log(products.data);
      let categories = products.data;
      delete categories.user_id;
      let all_products = {
        category_name: "All Products",
        ico: "cafes",
        color: "black",
        products: [],
      };
      let some_array = [];
      // console.log(categories)
      for (const [key, value] of Object.entries(categories)) {
        let temp_object = {};
        for (let [k, v] of Object.entries(value)) {
          temp_object[k] = v;
          if (k === "products") {
            temp_object[k] = v.map(function (product) {
              const temp_product = {
                product_name: product,
                product_category: key,
                color: value.color,
              };
              all_products.products.push(temp_product);
              return temp_product;
            });
          }
        }

        some_array.push({
          category_name: key,
          ico: temp_object.ico,
          color: temp_object.color,
          products: temp_object.products,
        });
      }
      some_array.unshift(all_products);

      console.log(some_array);

      commit("SET_EXISTING_CATEGORIES", some_array);

      // console.log(testArr)
    });
  },

  async update_token_func({ commit }, access_token) {
    const decoded = jwt.decode(access_token);
    if (decoded) {
      console.log(access_token);
      console.log(decoded);
      commit("AUTH_MUTATIONS_LOGOUT");
      commit("AUTH_MUTATIONS_SET_USER", {
        user_id: decoded.user_id,
        currency: decoded.currency,
        email: decoded.sub,
      });
      commit("AUTH_MUTATIONS_SET_PAYLOAD", access_token);
    }
  },

  async PUT_USER_EMAIL({ commit, dispatch }, data) {
    console.log(data);
    this.$axios
      .put(back_link + "/account/put_user_email", data)
      .then(function (data) {
        const access_token = data.data.access_token;
        dispatch("update_token_func", access_token);
      });
  },

  async PUT_USER_CURRENCY({ commit, dispatch }, data) {
    console.log(data);
    this.$axios
      .put(back_link + "/account/put_user_currency", data)
      .then(function (data) {
        const access_token = data.data.access_token;
        console.log(data);
        dispatch("update_token_func", access_token);
      });
  },

  // async PUT_USER_PASSWORD({commit, dispatch}, data) {
  //   console.log(data)
  //   this.$axios.put(back_link + '/account/put_user_password', data)
  //     .then(function (data) {
  //       console.log(data)
  //       if (data.data.code !== undefined){
  //         console.log('bad pass')
  //       }
  //       else console.log('Good')
  //       // const access_token = data.data.access_token
  //       // dispatch('update_token_func', access_token)
  //     })
  // },

  async DEACTIVATE_USER_ACCOUNT({ commit }, request_body) {
    console.log(request_body);
    this.$axios
      .put(back_link + "/account/deactivate_an_account/", request_body)
      .then(function (data) {
        console.log(data);
        commit("AUTH_MUTATIONS_LOGOUT");
        $nuxt.$router.push("/Landing");
      });
  },

  async SEND_EMAIL_FOR_RECOVERY({ commit }, email) {
    try {
      // return await this.$axios.post(back_link + '/token/password-recovery/send-code/' + email)
      return await this.$axios.post(
        back_link + "/token/password-recovery/send-code/" + email
      );
    } catch (e) {
      throw e;
    }
  },

  async SEND_CODE_FOR_RECOVERY({ commit }, data) {
    try {
      return await this.$axios.post(
        back_link + "/token/password-recovery/use-code",
        data
      );
    } catch (e) {
      throw e;
    }
  },

  // TEMP
  async WAKE_APP() {
    console.log("wake up");
    await this.$axios.get(back_link + "/wake-up");
  },
};
