<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Sei proprio sicuro di voler fare il logout?"
      md-confirm-text="CONFERMA"
      md-cancel-text="CANCELLA"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
    <p v-if="username">Ciao {{username}}!</p>
    <md-button v-if="username" class="md-primary md-raised" @click="active = true">Logout</md-button>
  </div>
</template>

<script>
import DataService from "../dataservice";
export default {
  name: "DialogConfirm",
  data: () => ({
    active: false,
    value: null,
    username: null
  }),
  methods: {
    onConfirm() {
      DataService.logout();
      this.$router.push({ path: "/Login" });
      /* this.value = "Conferma"; */
    },
    onCancel() {
      this.value = "Cancella";
    }
  },
  created: function() {
    this.username = DataService.whoIsAuthenticated();
  }
};
</script>