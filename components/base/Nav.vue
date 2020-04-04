<template>
  <nav class="row center">
    <div class="row pull-apart max-width nav__cntr">
      <div class="row nav__menu res--tablet center pull-left">
        <div class="nav__mobile_menu-stripe-cntr col center" :class="{'nav__mobile_menu--close': this.isMobileMenuOpen}" v-on:click="mobileMenuTrigger">
          <div class="nav__mobile_menu-stripe"></div>
          <div class="nav__mobile_menu-stripe"></div>
          <div class="nav__mobile_menu-stripe"></div>
        </div>
      </div>
      <div class="row pull-left">
        <div class="brand_identity row center" @click="goToHome">
          <div class="brand_identity__logo row center">
            <img src="~/assets/images/logo.png" alt="IsangPass Logo">
            <div class="brand_identity__logo-name">One<span>Pass</span></div>
          </div>
        </div>
        <div class="nav__actions res--desktop">
          <ul class="row nav__items center">
            <nuxt-link class="nav__item row center" to="/" prefetch>Dashboard</nuxt-link>
            <nuxt-link class="nav__item row center" to="/scan-pass" prefetch>Scan Pass</nuxt-link>
            <nuxt-link class="nav__item row center" to="/create-homepass" prefetch>Create OnePass</nuxt-link>
          </ul>
        </div>
      </div>
      <div class="row nav__actions res--desktop center">
        <div class="btn btn-secondary nav__cta-cntr">
          Logout
        </div>
      </div>
      <div class="row nav__contact_us-cntr res--tablet center pull-right">
        <nuxt-link class="nav__item u-organism u-organism--1" to="/contact-us" prefetch>
          <div class="row center nav__contact_us">
            <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.66113 17.332H19.9678C21.7617 17.332 22.793 16.3008 22.793 14.292V3.07715C22.793 1.06836 21.751 0.0478516 19.7207 0.0478516H3.41406C1.62012 0.0478516 0.588867 1.06836 0.588867 3.07715V14.292C0.588867 16.3115 1.62012 17.332 3.66113 17.332ZM10.4824 9.31836L2.64062 1.60547C2.90918 1.45508 3.23145 1.37988 3.61816 1.37988H19.7637C20.1611 1.37988 20.5049 1.46582 20.7627 1.62695L12.9531 9.31836C12.5234 9.74805 12.1152 9.93066 11.7178 9.93066C11.3203 9.93066 10.9121 9.74805 10.4824 9.31836ZM1.93164 14.2812V3.07715C1.93164 2.95898 1.93164 2.84082 1.95312 2.7334L8.06543 8.72754L1.96387 14.7109C1.94238 14.582 1.93164 14.4424 1.93164 14.2812ZM21.4502 3.08789V14.292C21.4502 14.4209 21.4395 14.5498 21.4287 14.6572L15.3701 8.72754L21.4395 2.78711C21.4502 2.88379 21.4502 2.98047 21.4502 3.08789ZM3.61816 15.9893C3.26367 15.9893 2.95215 15.9248 2.70508 15.8066L8.98926 9.64062L9.69824 10.3389C10.3857 11.0156 11.0518 11.2734 11.7178 11.2734C12.3838 11.2734 13.0498 11.0156 13.7373 10.3389L14.4463 9.64062L20.709 15.7852C20.4512 15.9248 20.1289 15.9893 19.7637 15.9893H3.61816Z" fill="#CFCFCF"/>
            </svg>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="mobile_menu-cntr" v-if=isMobileMenuOpen v-on:click="mobileMenuTrigger">
      <div class="mobile_menu-wrap col center">
        <ul class="col nav__items center">
          <nuxt-link class="nav__item u-organism u-organism--1" to="/" prefetch>Dashboard</nuxt-link>
          <nuxt-link class="nav__item u-organism u-organism--1" to="/scan-pass" prefetch>Scan Pass</nuxt-link>
          <nuxt-link class="nav__item u-organism u-organism--1" to="/create-homepass" prefetch>Create OnePass</nuxt-link>
          <nuxt-link class="nav__item u-organism u-organism--1" to="/page-3" prefetch>Logout</nuxt-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    mobileMenuTrigger: function () {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    goToHome: function () {
      this.$router.push({path: '/'});
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: $color__black;
  color: $color__text-primary;
  font-size: 14px;
  font-weight: 500;
  height: $nav-height;
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
  position: relative;
  box-shadow: $shadow__natural--low_contrast;
}

.nav__cntr {
  margin: 0 $space__base-3;
  z-index: 20;
  height: 100%;
}

ul {
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 0;
  margin: 0;
}

.nav__items {
  .nav__item {
    text-decoration: none;
    color: $color__text-primary;
    font-weight: 600;
    height: 100%;
  }
  .nuxt-link-exact-active {
    color: $color__green-primary;
    &::after {
      content: '';
      display: inline-block;
      height: 2px;
      background-color: $color__green-primary;
      width: 100%;
      position: absolute;
      bottom: 0;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
  }
}

.nav__item {
  &:hover {
    opacity: .75;
  }
}

.nav__actions {
  height: 100%;
}

a {
  &.nav__item {
    text-decoration: none;
  }
}

.brand_identity {
  cursor: pointer;
}

.brand_identity__logo, .brand_identify__title {
  img {
    height: 32px;
  }
}

.nav__mobile_menu-stripe-cntr {
  width: $space__base-5;
  padding: $space__base-2 0;
  cursor: pointer;
  &:hover {
    .nav__mobile_menu-stripe {
      opacity: .65;
    }
  }
}

.nav__contact_us {
  padding: $space__base-2 0;
  cursor: pointer;
}

.nav__mobile_menu-stripe {
  width: 100%;
  height: 1px;
  background-color: $color__slate-1;
  &:nth-child(2) {
    background-color: $color__slate-gray;
  }
}

.col {
  & > .nav__mobile_menu-stripe + .nav__mobile_menu-stripe {
    margin-top: $space__base-0 + $space__base-1;
  }
}

.mobile_menu-cntr {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  background-color: $color__black;
  z-index: 10;
}

.mobile_menu-wrap {
  height: 100%;
  .nav__item {
    font-size: 24px;
    font-weight: 400;
    &+.nav__item {
      margin-top: $space__base-5;
    }
  }
}

.nav__mobile_menu--close.nav__mobile_menu--close {
  position: relative;
  .nav__mobile_menu-stripe {
    position: absolute;
    margin: 0;
    &:first-child {
      transform: rotate(45deg);
    }
    &:nth-child(2) {
      display: none;
    }
    &:last-child {
      transform: rotate(-45deg);
    }
  }
}

.brand_identity__logo-name {
  font-size: 18px;
  font-weight: 600;
  color: $color__slate-3;
  margin: 0 $space__base-2;
  span {
    font-weight: 400;
  }
}

.res--desktop {
  .nav__items {
    margin-left: $space__base-6;
    height: 100%;
  }
  .nav__item {
    height: 100%;
    width: 6rem;
    position: relative;
  }
}
</style>
