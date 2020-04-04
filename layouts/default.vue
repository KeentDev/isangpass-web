<template>
  <div>
    <Nav />
    <nuxt />
    <Footer />
    <SnackBar />>
  </div>
</template>

<script>
import Nav from '~/components/base/Nav.vue'
import Footer from '~/components/base/Footer.vue'
import SnackBar from '~/components/SnackBar.vue'

export default {
  components: {
    Nav,
    Footer,
    SnackBar
  },
  head () {
    return {
      title: 'IsangPass',
    }
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Avenir Next', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  background-color: $color__dark;
}
</style>
