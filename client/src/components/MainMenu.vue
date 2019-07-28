<template lang="pug">
  .menu
    div.btns-container
      button#menu.waves-effect.waves-light(@click="toggleMenu()")
        i.material-icons reorder
    div.card-panel.indigo.open-menu(v-if="open")
      button.waves-effect.waves-light
        div
          i.material-icons account_circle
          div Профиль
      button.waves-effect.waves-light
        div
          i.material-icons assignment_turned_in
          div Завершённые заказы
      button.waves-effect.waves-light
        div
          i.material-icons exit_to_app
          div Выход
      //- button#tasks.waves-effect.waves-light(@click="tasks()")
      //- //-   i.material-icons assignment_turned_in
      //- //- button#profile.waves-effect.waves-light(@click="profile()")
      //- //-   i.material-icons account_circle
      //- //- button#logout.waves-effect.waves-light(@click="logout()")
      //- //-   i.material-icons exit_to_app

    //- div.btns-container(v-else)
    //-   button#login.waves-effect.waves-light.btn.red(@click="login()")
    //-     | Sign In
    //-   button#register.waves-effect.waves-light.btn.yellow.darken-3(@click="register()")
    //-     | Register

</template>

<script>

import bus from '../EventBus';

export default {
  data() {
    return {
      open: false
    }
  },

  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  
  methods: {    
    toggleMenu () {
      this.open = !this.open
    },
    profile () {
      this.$router.push('/profile');
    }
  }
}
</script>

<style>

  .open-menu button {
    display: block;
    width: 100%;
    height: 50px !important;
    color: white;
  }
  .open-menu button > div {
    display: flex;
        align-content: center;
  }
  .open-menu button i {
    margin: 0 30px;
    font-size: 1.4em;
  }
  .open-menu button > div {
    font-size: 1.5em;
  }
  .open-menu {
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    z-index: 9998;
    padding: 0 !important;
  }
  #login, #register {
    font-weight: 700;
    padding: 0 20px;
    height: 56px;
    box-shadow: none;
    border-radius: 0;
  }
  .btns-container {
    height: 100%;
    z-index: 9998;
  }
  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .menu button {
    background: none;
    border: none;
    outline: none;
    height: 100%;
    padding: 0;
  }

  .menu button:focus {
    background: none;
  }

    .menu button:hover {
    background: #323B96;
    color: #F9FFFF;
    cursor: pointer;
  }


  .menu button > i {
    font-size: 40px;
    margin: 0 10px;
    display: block;
    color: white;
    text-decoration: none;
  }

  @media (max-width: 500px) {
    .menu button > i {
      margin: 0 10px;
      font-size: 30px;
    }
    .user {
      font-size: .7em;
      margin-bottom: 7px;
    }
  }
  .user {
    line-height: 1em;
    margin-right: 10px;
    margin-bottom: 5px;
    /* hack */
  }
</style>
