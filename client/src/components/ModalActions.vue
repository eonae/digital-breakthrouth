<template lang="pug">

  .modal-actions
    button.btn.waves-effect.waves-light.indigo(
      v-for="action in actions",
      @click.prevent="action.func()",
      :disabled="action.disabled"
      ) {{ action.name }}

</template>

<script>

export default {
  props: {
    actions: Object
  }
}

</script>

<style>
  .modal-actions {
    text-align: center;
  }
  .modal-actions > button:not(:last-child) {
    margin-right: 2%;
  }
</style>
