<template lang="pug">
  .full-screen.card
    .header-cont
      .title
        h3 User profile
      .userdata
        h4 {{username}}
        p {{ email }}
    table
      thead
        tr
          th Total
          th Done
        tr
          td {{ total }}
          td {{ completed }}

</template>

<script>

export default {
  computed: {
    username() {
      return this.$store.state.user.username;
    },
    email() {
      return this.$store.state.user.email;
    },
    total() {
      return this.$store.state.tasks.list.length;
    },
    completed() {
      return this.$store.state.tasks.list
        .reduce((acc, task) => {
          return (task.isCompleted) ? acc + 1 : acc;
        }, 0);
    }
  },
  beforeCreate() {
    this.$store.dispatch('tasks/fetch');
  }
}

</script>

<style scoped>
  
.full-screen {
  margin-left: 2px !important;
  width: calc(100% - 4px);
  height: 100%;
  padding: 10px 20px;
}

.header-cont {
  display: flex;
  flex-wrap: wrap;
}
.header-cont * {
  min-width: 260px;
  flex-grow: 1;
  text-align: center;
}

h4 {
  color: palevioletred;
  font-weight: 700;
}

table {
  width: 60%;
  min-width: 260px;
  margin: 20px auto;
}

th, td {
  text-align: center;
}



</style>
