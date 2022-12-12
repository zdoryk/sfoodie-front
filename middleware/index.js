import jwt from "vue-jwt-decode";

export default ({ app, store, redirect }) => {
  // Every time the route changes (fired on initialization too)
  // app.router.afterEach((to, from) => {
  //   // console.log( jwt.decode(store.state.state.access_token))
  //   const decoded = jwt.decode(store.state.state.access_token)
  //   store.commit('AUTH_MUTATIONS_SET_USER', {user_id: decoded.user_id, email: decoded.sub})
  // })
}
