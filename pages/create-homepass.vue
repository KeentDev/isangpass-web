<template>
  <div class="page-cntr col center">
    <div class="section__head">
      Create OnePass
    </div>
    <div class="section__body col center">
      <form class="contact_us-form-cntr col center" id="validated-form">
        <FormField
          :is-required=true
          type="text"
          label="First Name"
          placeholder="Type first name here..."
          id="first-name"
          v-model="firstName"
          ></FormField>
        <FormField
          :is-required=true
          type="text"
          label="Last Name"
          placeholder="Type last name here..."
          id="last-name"
          ></FormField>
        <div class="contact_us-btn row center">
          <button type="submit" class="btn btn-accent" @click.prevent="createOnePass()">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import FormField from '~/components/FormField'
  import {env} from '~/plugins/env.js'

  // this.$axios.get('http://icanhazip.com');

  export default {
    components: {
      FormField
    },
    data () {
      return {
        firstName: '',
        validationErrors: {
          firstName: null,
          lastName: null,
        }
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
        if (this.validateForm()) {
          console.log('formValidated');
          // this.$axios
          //   .post(`/create-homepass`, {
          //     "data": {
          //       "first_name": "Ken1",
          //       "last_name": "Gar1",
          //       "barangay": "Mandalagan"
          //     }
          //   })
          //   .then(response => {
          //     console.log('response', response);
          //   })
        } else {
          this.$notifier.showMessage({ content: 'Hello, snackbar', color: 'info' })
          console.log(this.validationErrors);
          console.log('form not validated');
        }
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
  }

  .contact_us-btn {
    width: 100%;
    margin: $space__base-5 0;
    button {
      padding: $space__base-3 $space__base-6;
      border: none;
      width: 100%;
    }
  }

  .contact_us-form-cntr {
    width: 100%;
    max-width: 380px;
  }
</style>
