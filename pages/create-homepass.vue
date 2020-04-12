<template>
  <div class="page-cntr col center">
    <div class="section__head">
      Create OnePass
    </div>
    <div class="section__body col center">
      <form class="contact_us-form-cntr col center" id="validated-form">
        <FormField
          :is-required=true
          :is-disabled=isDisable
          type="text"
          label="First Name"
          placeholder="Type first name here..."
          id="first-name"
          :value.sync="firstName"
          ></FormField>
        <FormField
          :is-required=true
          :is-disabled=isDisable
          type="text"
          label="Last Name"
          placeholder="Type last name here..."
          id="last-name"
          :value.sync="lastName"
          ></FormField>
        <div class="contact_us-btn col center">
          <button
            type="submit"
            :class="{
              'btn-loading': status == 'sending',
              'btn-success': status == 'success',
              'btn-error': status == 'error',
              'btn-disabled': status != ''
            }"
            :disabled=submitIsDisable
            class="btn btn-accent"
            @click.prevent="createOnePass()">
            <LoadingSpinner v-if="status == 'sending'"></LoadingSpinner>
            <div class=" btn-label row center" v-if="status == ''">
              <svg class="submit" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4414 24.5C15.3789 24.5 16.0234 23.8086 16.4336 22.7422L23.8398 3.35938C24.0156 2.90234 24.1094 2.48047 24.1094 2.11719C24.1094 1.22656 23.5352 0.652344 22.6445 0.652344C22.2812 0.652344 21.8594 0.746094 21.4023 0.921875L1.97266 8.35156C0.976562 8.73828 0.261719 9.37109 0.261719 10.3203C0.261719 11.4336 1.07031 11.9023 2.19531 12.2422L7.57422 13.9062C8.44141 14.1758 8.98047 14.1758 9.625 13.5898L22.2344 2.02344C22.4102 1.87109 22.6211 1.89453 22.75 2.01172C22.8789 2.14062 22.8906 2.36328 22.7383 2.52734L11.1953 15.1367C10.6562 15.7227 10.6094 16.3555 10.8672 17.1992L12.4961 22.5078C12.8477 23.668 13.3281 24.5 14.4414 24.5Z" fill="black"/>
              </svg>
              <span>Submit</span>
            </div>
            <div class="btn-label row center" v-if="status == 'success'">
              <svg class="success" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1748 23.9528C18.5849 23.9528 23.8584 18.6793 23.8584 12.2692C23.8584 5.85901 18.5849 0.585571 12.1748 0.585571C5.76461 0.585571 0.491173 5.85901 0.491173 12.2692C0.491173 18.6793 5.76461 23.9528 12.1748 23.9528ZM10.6865 18.2106C10.206 18.2106 9.80758 17.9879 9.47945 17.6012L6.29195 13.7926C6.04586 13.5114 5.94039 13.2184 5.94039 12.902C5.94039 12.2223 6.50289 11.6832 7.15914 11.6832C7.55758 11.6832 7.86227 11.8473 8.15524 12.1871L10.663 15.2457L15.456 7.62854C15.749 7.17151 16.1005 6.93713 16.5341 6.93713C17.1787 6.93713 17.788 7.40588 17.788 8.08557C17.788 8.36682 17.6591 8.67151 17.4834 8.95276L11.8701 17.5543C11.5771 17.9762 11.1552 18.2106 10.6865 18.2106Z" fill="black"/>
              </svg>
              <span>Successfully created OnePass</span>
            </div>
            <div class="btn-label row center" v-if="status == 'error'">
              <svg class="error" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6641 23.6914C19.0742 23.6914 24.3477 18.418 24.3477 12.0078C24.3477 5.59766 19.0742 0.324219 12.6641 0.324219C6.25391 0.324219 0.980469 5.59766 0.980469 12.0078C0.980469 18.418 6.25391 23.6914 12.6641 23.6914ZM8.99609 16.8945C8.30469 16.8945 7.76562 16.3555 7.76562 15.6523C7.76562 15.3359 7.89453 15.0312 8.14062 14.7969L10.918 12.0195L8.14062 9.23047C7.90625 8.99609 7.76562 8.70312 7.76562 8.375C7.76562 7.68359 8.30469 7.14453 8.99609 7.14453C9.37109 7.14453 9.65234 7.26172 9.88672 7.50781L12.6641 10.2734L15.4531 7.49609C15.6992 7.25 15.9805 7.13281 16.3438 7.13281C17.0352 7.13281 17.5742 7.67188 17.5742 8.375C17.5742 8.69141 17.4453 8.98438 17.1992 9.21875L14.4219 12.0195L17.1992 14.7852C17.4336 15.0312 17.5625 15.3242 17.5625 15.6523C17.5625 16.3555 17.0234 16.8945 16.332 16.8945C15.957 16.8945 15.6641 16.7656 15.4297 16.5312L12.6641 13.7773L9.89844 16.5312C9.66406 16.7773 9.37109 16.8945 8.99609 16.8945Z" fill="black"/>
              </svg>
              <span>
                Something went wrong. Please try again.
              </span>
            </div>
          </button>
          <button
            :class="{'btn-disabled': isDisable}"
            class="btn btn-secondary"
            @click.prevent="clearFields()"
            :disabled=isDisable
          >Clear</button>
        </div>
        <qrcode
          class="generate-qr_code-cntr"
          v-if="qrValue != ''"
          :value=qrValue
          :options="{
            width: 300,
            color: { dark: '#000000' }
          }"></qrcode>
      </form>
    </div>
  </div>
</template>

<script>
  import FormField from '~/components/FormField'
  import LoadingSpinner from '~/components/LoadingSpinner'
  import {env} from '~/plugins/env.js'

  export default {
    components: {
      FormField,
      LoadingSpinner
    },
    data () {
      return {
        firstName: '',
        lastName: '',
        validationErrors: {
          firstName: '',
          lastName: '',
        },
        status: '',
        qrValue: ''
      }
    },
    computed: {
      isDisable () {
        return this.status == 'sending'
      },
      submitIsDisable () {
        return this.status == 'sending' || this.status == 'error'
      }
    },
    methods: {
      validateForm (formId = 'validated-form', errorObjectName = 'validationErrors') {
        var nodes = document.querySelectorAll(`#${formId} :invalid`);
        var vm = this; //current vue instance;

        Object.keys(this[errorObjectName]).forEach(key => {
            this[errorObjectName][key] = null
        });

        if (nodes.length > 0) {
            nodes.forEach(node => {
                if (node.title) {
                    this[errorObjectName][node.name] = node.title;
                }
                else {
                    this[errorObjectName][node.name] = node.validationMessage;
                }

                node.addEventListener('change', function (e) {
                    vm.validateForm(formId, errorObjectName);
                });
            });

            console.log('false');
            return false;
        }
        else {
            console.log('true');
            return true;
        }
      },
      createOnePass () {
        const sampleBarangay = "Mandalagan";
        if (this.validateForm()) {
          this.status = 'sending'
          this.$axios
            .post(`/create-homepass`, {
              "data": {
                "first_name": this.firstName,
                "last_name": this.lastName,
                "barangay": sampleBarangay
              }
            })
            .catch(e => {
              this.status = 'error'
              return Promise.reject()
            })
            .then(response => {
              const data = response.data;
              if(data.success) {
                const homePassId = data.data.home_pass_id;
                this.status = 'success'

                this.qrValue = JSON.stringify({
                  'home_pass_id': homePassId,
                  'holder': {
                    'first_name': this.firstName,
                    'last_name': this.lastName,
                  },
                  "barangay": sampleBarangay,
                  'note': '#StayHome #StaySafe'
                });

                this.firstName = ''
                this.lastName = ''

                return Promise.resolve(2500);
              } else {
                this.status = 'error'
                return Promise.reject();
              }
            })
            .catch(e => {
              return Promise.resolve(3500);
            })
            .then(duration => {
              setTimeout(() => {
                this.status = ''
              }, duration || 2000);
            });
        } else {
          console.log(this.validationErrors);
        }
      },
      clearFields () {
        this.firstName = '';
        this.lastName = '';
        this.qrValue = '';
        this.status = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .section__body {
    width: 100%;
    height: 100%;
  }

  .page-cntr {
    height: 100%;
    overflow: hidden;
  }

  .contact_us-btn {
    width: 100%;
    margin: $space__base-5 0;
    button {
      padding: $space__base-3 $space__base-6;
      width: 100%;
    }
  }

  .contact_us-form-cntr {
    width: 100%;
    max-width: 380px;
  }

  .btn-label {
    margin-left: -14px;
  }

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

  button + button {
    margin-top: $space__base-3;
  }

  .generate-qr_code-cntr {
    // max-width: 300px;
    // width: 100%;
    margin-bottom: 4rem;
    margin-top: 2rem;
  }
</style>
