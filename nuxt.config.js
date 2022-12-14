import {env} from './plugins/env.js'

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
 css: ["~assets/styles.scss", "~assets/keen.scss"],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase.js',
    '~/plugins/env.js',
    '~/plugins/vue_moment.js',
    '~/plugins/generate_qr_code.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: ['@nuxt/typescript-build'],
  /*
  ** Nuxt.js modules
  */
 modules: ["@nuxtjs/style-resources", '@nuxtjs/axios'],
  axios: {
    baseURL: env.server_url,
    proxyHeaders: false,
    credentials: false
  },
 styleResources: {
   scss: ["~assets/var/design_tokens.scss"]
 },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    dir: "dist"
  }
}
