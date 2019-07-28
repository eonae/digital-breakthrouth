<template lang="pug">

header.card-panel.indigo.darken-4
  a(href="#" class="brand-logo") {{ title }}
  main-menu
      //- //- div.btns-container(v-if="user.authorized")
      //- button#menu.waves-effect.waves-light
      //-   i.material-icons reorder
      //-   i.material-icons assignment_turned_in
      //- button#profile.waves-effect.waves-light(@click="profile()")
      //-   i.material-icons account_circle
      //- button#logout.waves-effect.waves-light(@click="logout()")
      //-   i.material-icons exit_to_app

</template>

<script>

import MainMenu from './MainMenu.vue'

export default {
  name: 'TodoHeader',
  components: {
    MainMenu
  },
  computed: {
    title() {
      console.log(this.$router);
      return 'Отслеживаю...'
    }
  }
}

</script>

<style scoped>

header {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  left: 0;
  top: 0;
  padding: 0;
  display: flex;
  align-items: center;
  margin: 0 !important;
  justify-content: space-between;
  z-index: 9999 !important;
}

#menu {
    background: none;
    border: none;
    outline: none;
    height: 100%;
    padding: 0;
    margin-right: 10px;
  }
#menu i {
  font-size: 2.6em;
}

.brand-logo {
  flex-grow: 1;
  margin-left: 80px;
  color: white;
  font-size: 1.6em;
}

@media (max-width: 640px) {
  header {
    justify-content: flex-end;
  }
}

@media (max-width: 500px) {
  .brand-logo span{
    display: none;
  }
}

</style>
