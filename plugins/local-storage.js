import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";
import cookie from "cookie";
import jwt from "vue-jwt-decode";

// access the store, http request and environment from the Nuxt context
// https://nuxtjs.org/api/context/
export default ({ store, req, isDev }) => {
  createPersistedState({
    key: "authentication-cookie", // choose any name for your cookie
    paths: [
      // persist the access_token and refresh_token values from the "auth" store module
      "state.access_token",
      // 'state.refresh_token',
    ],
    storage: {
      // if on the browser, parse the cookies using js-cookie otherwise parse from the raw http request
      getItem: (key) =>
        process.client
          ? Cookies.getJSON(key)
          : cookie.parse(req.headers.cookie || "")[key],
      // getItem: key => Cookies.get(key),
      // getItem: function (key){
      //   console.log(Cookies.get(key))
      //   return Cookies.get(key)
      // },
      // js-cookie can handle setting both client-side and server-side cookies with one method
      // use isDev to determine if the cookies is accessible via https only (i.e. localhost likely won't be using https)
      setItem: (key, value) =>
        Cookies.set(key, value, { path: "/", expires: 7, secure: true }),
      // setItem: (key, value) => Cookies.set(key, value, { path: '/', expires: 7, secure: ! isDev }),
      // setItem: function (key, value){
      //   console.log(key, value)
      //   Cookies.set(key, value, { path: '/', expires: 14, secure: ! isDev })
      //   console.log(Cookies.get(key))
      // },
      // also allow js-cookie to handle removing cookies
      removeItem: (key) => Cookies.remove(key),
    },
  })(store);
};
