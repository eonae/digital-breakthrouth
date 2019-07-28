<template lang="pug">

transition(name="modal")
  .modal-mask
    .modal-wrapper
      .modal-container
        h3(v-if="title") {{ title }}
        slot
            
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  min-width: 300px;
  max-width: 50%;
  margin: 0px auto;
  padding: 6vh 6vw;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-container > h3 {
  text-align: center;
  margin-top: 0;
  color: indigo;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
