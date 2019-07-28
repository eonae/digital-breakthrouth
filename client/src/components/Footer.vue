<template lang="pug">

footer.card-panel.indigo.darken-4

</template>

<script>

export default {
  name: 'TodoFooter'
}

</script>

<style scoped>

footer {
  position: absolute;
  width: 100%;
  height: 25px;
  left: 0;
  top: 100%;
  transform: translateY(-100%);
  padding: 0;
  display: flex;
  align-items: center;
  margin: 0 !important;
}

.brand-logo {
  margin-left: 80px;
}

@media (max-width: 992px) {
  .brand-logo {
    margin: 0;
  }
}

</style>
