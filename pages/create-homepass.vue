<template>
  <div class="page-cntr col center">
    <div class="section__head">
      Create OnePass
    </div>
    <div class="section__body">
      <form class="contact_us-form-cntr col pull-left">
        <FormField
          :is-required=true
          type="email"
          label="Your email address"
          placeholder="Your email address here..."
          id="email-address"
          ></FormField>
        <FormField
          :is-optional=true
          type="text"
          label="Name"
          placeholder="John Appleseed..."
          id="name"
          ></FormField>
        <FormField
          :is-optional=true
          type="text"
          label="Subject"
          placeholder="Interested in your services..."
          id="subject"
          ></FormField>
        <FormField
          is-required=true
          type="text"
          label="Message"
          placeholder="Type your additional message..."
          id="message"
          ></FormField>
        <div class="contact_us-btn row center">
            <button type="submit" class="btn btn-accent" >Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import FormField from '../components/FormField';

  export default {
    name: "create-homepass",
    components: {
      FormField
    }
  }
</script>

<style lang="scss" scoped>
  .section__body {
    width: 100%;
  }

  .contact_us-btn {
    width: 100%;
    margin: $space__base-5 0;
    button {
      border: none;
      width: 100%;
    }
  }

  .contact_us-form-cntr {
    width: 100%;
  }
</style>
