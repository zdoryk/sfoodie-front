import Vue from "vue"
import CookieWarning from "~/components/CookieWarning.vue"

export default async function({ app, store, $root }) {
  Vue.component("CookieWarning", CookieWarning)

  let cookieAccepted = localStorage.getItem("cookieAccepted")

  if (!cookieAccepted) {
    store.commit("SET_SHOW_COOKIE_WARNING", true)
  }
}
