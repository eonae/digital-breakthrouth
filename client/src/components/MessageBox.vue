<template lang="pug">

  modal-window(:title="props.title")
    form(name="msgBox")
      .msg-content(v-html="props.content")
      modal-actions(:actions="actions")

</template>

<script>

import Modal from './ModalWindow.vue'
import { STATUS_CODES } from '../constants';

export default {
  name: 'MessageBox',
  props: {
    props: Object
  },

  data() {
    return {
      actions: {
        ok: {
          name: 'ok',
          disabled: false,
          func: this.ok
        },
      }
    }
  },

  methods: {
    ok() {
      this.$emit('close');
      if (this.props.callback) {
        this.props.callback();
      }
    }
  }
}
</script>

<style>

  .msg-content {
    margin-bottom: 1em;
    text-align: center;
  }
  .msg-content span {
    font-weight: 700 !important;
    color: palevioletred !important;
  }
</style>
