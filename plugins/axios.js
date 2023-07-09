export default function ({ store, $axios }) {
  $axios.onRequest((config) => {
    // check if the user is authenticated
    if (store.state.state.access_token) {
      // set the Authorization header using the access token
      config.headers.Authorization = 'Bearer ' + store.state.state.access_token;
    }

    // Add your CORS headers here
    config.headers.common['Access-Control-Allow-Origin'] = '*';
    config.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
    config.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    config.headers.common['Access-Control-Allow-Credentials'] = true;

    return config;
  });
}
