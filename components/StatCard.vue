<template>
  <div class="card-cntr col pull-top">
    <div class="card__head-cntr row center">
      <slot name="head"></slot>
    </div>
    <div class="card__body-cntr row center">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .card-cntr {
    width: auto;
  }

  .card__head-cntr {
    height: 2rem;
    width: 100%;
    padding: $space__base-2 $inset-gutter;
    border-top-right-radius: $border_radius-2;
    border-top-left-radius: $border_radius-2;
    background-color: #202A39;
  }

  .card__body-cntr {
    width: 100%;
    padding: $space__base-2 $inset-gutter;
    background-color: $color__black;
    border-bottom-right-radius: $border_radius-2;
    border-bottom-left-radius: $border_radius-2;
  }
</style>
