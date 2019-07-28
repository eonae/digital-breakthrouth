<template lang="pug">
  div(:class="className")
    .details-title.card-panel.indigo.darken-4
      div.order-title Заказ 
        span #12304
      div
        button.waves-effect.waves-light(@click="toggle()")
          i.material-icons {{ this.shown ? 'expand_more' : 'expand_less' }}
    details-content
</template>

<script>

import DetailsContent from './DetailsContent';
export default {


  name: 'TrackingDetails',
  components: {
    DetailsContent
  },
  props: {
    shown: Boolean
  },
  computed: {
    className() {
      const state = this.shown ? 'shown' : 'hidden';
      return 'details card-panel ' + state;
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    }
  }
}
</script>

<style>

  .btns-container {
    height: inherit;
    /* height: 100%; */
  }
  .details {
    position: fixed;
    width: 100%;
    height: 87%;
    left: 0;
    transition: 1;
    background: red;
    z-index: 9000;
    padding: 0 !important;
  }

  .shown {
    top: 50px;
  }
  .hidden {
    top: 91.5%;
  }
  .details-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-top: 0 !important;
    margin-bottom: -2px !important;
    /* z-index: 9999; */
  }

  button {
    background: none;
    border: none;
    outline: none;
    height: 100%;
    padding: 0;
  }

  button focus {
    background: none !important;
  }

  button hover {
    background: #323B96;
    color: #F9FFFF;
    cursor: pointer;
  }

  button > i {
    font-size: 40px;
    margin: 0 10px;
    display: block;
    color: white;
    text-decoration: none;
  }

  .order-title {
    color: white;
    font-size: 2em;
  }

  .order-title > span {
    font-weight: 900;
  }
</style>
