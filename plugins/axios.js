export default function ({ store, $axios, redirect }) {
  $axios.onRequest((config) => {
    // config.headers['Access-Control-Allow-Origin'] = '*'
    // check if the user is authenticated
    if (store.state.state.access_token) {
      // set the Authorization header using the access token
      console.log("true");
      config.headers.Authorization = "Bearer " + store.state.state.access_token;
    }
    console.log("false");

    return config;
  });
}
