<template>
  <div class="col form_field pull-left">
    <div class="label-cntr row center">
      <label :for=id>{{label}}</label>
      <span class="required" v-if=isRequired>*</span>
      <span class="optional" v-if=isOptional>(optional)</span>
    </div>
    <input
      :type=type
      :id=id
      :name=id
      :placeholder=placeholder
      v-model="value"
      v-on:input="$emit('input', $event.target.value)"
      :required=isRequired
    >
  </div>
</template>

<script>
export default {
  name: 'FormField',
  data () {
    return {
      value: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'text',
      required: false
    },
    label: {
      type: String,
      required: true
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
    border: 1px solid #C7C7C7;
    padding: $space__base-3 $form_field-padding;
    font-size: 16px;
    font-weight: 00;
    color: $color__black;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    &::placeholder {
      font-style: italic;
      color: $color__slate-gray;
    }
    &:invalid {
      // box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .65);
      border: 1px solid rgba(0, 0, 0, .45);
      box-shadow: none;
      &:focus {
        border: 1px solid rgba(214, 125, 125, 1);
        box-shadow: inset 0 0 0 1px rgba(214, 125, 125, 1), 1px 3px 14px -1px rgba(214, 125, 125, .25);
      }
    }
    &:valid {
      &:focus {
        border: 1px solid $color__green-primary;
        box-shadow: inset 0 0 0 1px $color__green-primary, 1px 3px 14px -1px rgba(64, 143, 201, .25);;
      }
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
        margin: 0 $space__base-2;
        font-size: 14px;
        font-weight: 500;
        color: $color__slate-2;
        opacity: .75;
      }
      &.required {
        font-size: 14px;
        font-weight: 500;
        color: #D67D7D;
      }
    }
  }

  .form_field {
    width: 100%;
    margin: $space__base-2 0;
  }
</style>
