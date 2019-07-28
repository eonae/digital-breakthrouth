import Vue from 'vue';

const bus = new Vue({
  data() {
    return {
      loggedIn: false
    }
  },
  methods: {
    login() {
      this.loggedIn = true;
    },
    logout() {
      this.loggedIn = false;
    }
  }
});

export default bus;


