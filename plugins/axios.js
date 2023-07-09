export default function ({ store, $axios }) {
  $axios.onRequest((config) => {
    // check if the user is authenticated
    if (store.state.state.access_token) {
      // set the Authorization header using the access token
      config.headers.Authorization = 'Bearer ' + store.state.state.access_token;
    }

    // Disable preflight requests
    config.headers.common['Access-Control-Allow-Origin'] = '*';
    config.headers.common['Access-Control-Allow-Methods'] = '*';

    return config;
  });
}
