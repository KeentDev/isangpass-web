<template>
  <button
    type="submit"
    :class="{
      'btn-loading': status == 'sending',
      'btn-success': status == 'success',
      'btn-error': status == 'error',
      'btn-disabled': status != ''
    }"
    :disabled=isDisable
    class="btn btn-accent"
    @click.prevent="btnClick()">
    <LoadingSpinner v-if="status == 'sending'"></LoadingSpinner>
    <div class=" btn-label row center" v-if="status == ''">
      <slot name="label-icon"></slot>
      <span>{{btnLabel}}</span>
    </div>
    <div class="btn-label row center" v-if="status == 'success'">
      <svg class="success" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.1748 23.9528C18.5849 23.9528 23.8584 18.6793 23.8584 12.2692C23.8584 5.85901 18.5849 0.585571 12.1748 0.585571C5.76461 0.585571 0.491173 5.85901 0.491173 12.2692C0.491173 18.6793 5.76461 23.9528 12.1748 23.9528ZM10.6865 18.2106C10.206 18.2106 9.80758 17.9879 9.47945 17.6012L6.29195 13.7926C6.04586 13.5114 5.94039 13.2184 5.94039 12.902C5.94039 12.2223 6.50289 11.6832 7.15914 11.6832C7.55758 11.6832 7.86227 11.8473 8.15524 12.1871L10.663 15.2457L15.456 7.62854C15.749 7.17151 16.1005 6.93713 16.5341 6.93713C17.1787 6.93713 17.788 7.40588 17.788 8.08557C17.788 8.36682 17.6591 8.67151 17.4834 8.95276L11.8701 17.5543C11.5771 17.9762 11.1552 18.2106 10.6865 18.2106Z" fill="black"/>
      </svg>
      <span>{{successMsg}}</span>
    </div>
    <div class="btn-label row center" v-if="status == 'error'">
      <svg class="error" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6641 23.6914C19.0742 23.6914 24.3477 18.418 24.3477 12.0078C24.3477 5.59766 19.0742 0.324219 12.6641 0.324219C6.25391 0.324219 0.980469 5.59766 0.980469 12.0078C0.980469 18.418 6.25391 23.6914 12.6641 23.6914ZM8.99609 16.8945C8.30469 16.8945 7.76562 16.3555 7.76562 15.6523C7.76562 15.3359 7.89453 15.0312 8.14062 14.7969L10.918 12.0195L8.14062 9.23047C7.90625 8.99609 7.76562 8.70312 7.76562 8.375C7.76562 7.68359 8.30469 7.14453 8.99609 7.14453C9.37109 7.14453 9.65234 7.26172 9.88672 7.50781L12.6641 10.2734L15.4531 7.49609C15.6992 7.25 15.9805 7.13281 16.3438 7.13281C17.0352 7.13281 17.5742 7.67188 17.5742 8.375C17.5742 8.69141 17.4453 8.98438 17.1992 9.21875L14.4219 12.0195L17.1992 14.7852C17.4336 15.0312 17.5625 15.3242 17.5625 15.6523C17.5625 16.3555 17.0234 16.8945 16.332 16.8945C15.957 16.8945 15.6641 16.7656 15.4297 16.5312L12.6641 13.7773L9.89844 16.5312C9.66406 16.7773 9.37109 16.8945 8.99609 16.8945Z" fill="black"/>
      </svg>
      <span>
        {{errorMsg}}
      </span>
    </div>
</button>
</template>

<script>
import LoadingSpinner from '~/components/LoadingSpinner'

export default {
  components: {
    LoadingSpinner
  },
  props: {
    status: {
      type: String,
      default: ''
    },
    errorMsg: {
      type: String,
      default: 'Something went wrong. Please try again.'
    },
    successMsg: {
      type: String,
      default: 'Successfully created OnePass.'
    },
    btnLabel: {
      type: String,
      default: 'Submit'
    }
  },
  computed: {
    isDisable () {
      return this.status == 'sending' || this.status == 'error'
    }
  },
  methods: {
    btnClick () {
      this.$emit('btnClick');
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    svg {
      flex-shrink: 0;
      margin-right: $space__base-2;
      &.submit {
        path {
          fill: #ffffff
        }
      }
      &.success {
        path {
          fill: $color__green-primary
        }
      }
      &.error {
        path {
          fill: $color__red-secondary
        }
      }
    }
  }
</style>
