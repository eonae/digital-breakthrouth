<template lang="pug">

  div#app
  
    todo-header

    .content-wrapper
      transition(name="router" appear)
        router-view

    todo-footer

</template>

<script>

import Vue from 'vue'

import TodoHeader from './components/Header.vue'
import TodoFooter from './components/Footer.vue'

export default {
  name: 'app',

  components: {
    TodoHeader,
    TodoFooter
  },
  beforeCreate() {
    // this.$store
    //   .dispatch('user/require')
  }
}
</script>

<style>

body {
  background: #FCFCFC;
  height: 100vh;
}

#app {
  max-width: 1140px;
  padding: 0 2%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
}

.content-wrapper {
  padding-top: calc(56px + 2vh);
  padding-bottom: calc(25px + 2vh);
  height: 100vh;
  overflow: hidden;
}
.content-wrapper > .card {
  margin: 0;
}

.router-enter-active, .router-leave-active {
  transition: 2s !important;
}

.router-enter, .router-leave {
  opacity: 0;
}



</style>
