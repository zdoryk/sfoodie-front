export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'sfoodie',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/node_modules/bootstrap/dist/css/bootstrap.min.css',
    'vue2-datepicker/index.css',
    '~/assets/date_picker.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/local-storage', ssr: false},
    '~/plugins/axios',
    { src: "@/plugins/cookie_warner_check.js", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {
  //   dir: './dist'
  // },

  router: {
    // middleware: ['index']
  },

  generate: {
    dir: './dist',
    // subdir: 'subfolder'
  },
  target: 'static' // default is 'server'

  //Local dvelopment
  // server: {
  //   host: '10.9.179.156', // default: localhost
  //   port: 8000 // default: 3000
  // },

  // module: {
  //   rules: [
  //     {
  //       test: /\.svg$/,
  //       loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
  //     },
  //   ],
  // },
}
