<template>
  <div class="col form_field pull-left">
    <div class="row">
      <div class="label-cntr row center">
        <label :for=id>{{label}}</label>
        <span class="required" v-if=isRequired> (required)</span>
        <span class="optional" v-if=isOptional>(optional)</span>
      </div>
      <div class="field_error-cntr" v-if="errorMsg != ''">
        {{ errorMsg }}
      </div>
    </div>
    <input
      :type=type
      :id=id
      :name=id
      :placeholder=placeholder
      :value="value"
      :required=isRequired
      :disabled=isDisabled
      @input="$emit('update:value', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'FormField',
  // data () {
  //   return {
  //     inputValue: ''
  //   }
  // },
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      required: false
    },
    label: {
      type: String,
      required: true
    },
    errorMsg: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    isRequired: {
      type: Boolean,
      default: false,
      required: false
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: false
    },
    isOptional: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  $form_field-padding: $space__base-3;

  input {
    border-radius: 7px;
    border: 1px solid $color__slate-4;
    padding: $space__base-3 $form_field-padding;
    font-size: 16px;
    font-weight: 00;
    color: $color__black;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    background-color: $color__slate-4;
    &::placeholder {
      font-style: italic;
      color: $color__slate-gray;
    }
    &:invalid {
      box-shadow: none;
      &:focus {
        border: 1px solid rgba(214, 125, 125, 1);
        box-shadow: inset 0 0 0 1px rgba(214, 125, 125, 1), 1px 3px 16px -2px rgba(214, 125, 125, .65);
      }
    }
    &:valid {
      &:focus {
        border: 1px solid $color__green-primary;
        box-shadow: inset 0 0 0 1px $color__green-primary, 1px 3px 14px -3px rgba(55, 188, 155, .3);
      }
    }
    &:disabled {
      border: 1px solid rgba(255,255,255,.1);
      color: $color__slate-gray;
    }
  }

  label {
    margin: $space__base-1 $form_field-padding;
    margin-right: 0;
    font-size: 16px;
    font-weight: 500;
    color: $color__slate-3;
  }

  .label-cntr {
    span {
      &.optional {
        margin: 0 $space__base-1;
        font-size: 12px;
        font-weight: 500;
        color: $color__slate-2;
        opacity: .75;
      }
      &.required {
        margin: 0 $space__base-1;
        font-size: 12px;
        font-weight: 500;
        color: #FBD168;
      }
    }
  }

  .form_field {
    width: 100%;
    margin: $space__base-2 0;
  }

  .field_error-cntr {
    background-color: $color__red-primary;
    border-radius: 7px;
    color: white;
    padding: 3px $space__base-4;
  }
</style>
