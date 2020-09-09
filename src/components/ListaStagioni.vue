<template>
  <div class="md-layout">
    <div class="md-layout-item md-large-size-33 md-medium-size-50 md-xsmall-size-100">
      <md-table md-card>
        <md-table-toolbar>
          <h1 class="md-title">Prima stagione</h1>
        </md-table-toolbar>
        <md-table-row>
          <md-table-cell>Gino Pino</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <br>
    <div class="md-layout-item md-large-size-33 md-medium-size-50 md-xsmall-size-100">
      <md-table md-card>
        <md-table-toolbar>
          <h1 class="md-title">Prima stagione</h1>
        </md-table-toolbar>
        <md-table-row>
          <md-table-cell>Gino Pino</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import DataService from "../dataservice";
export default {
  data: function() {
    return {
      S1: [],
      S2: []
    };
  },
  methods: {
    controllaStagione(p) {
      /* codice che prende i preferiti e ne controlla la stagione tramite
      split() e pop() come in episodio.vue - dopodiché popola i due array S1 e S2
       e infine con v-if="S1",v-if="S2"ecc.. facciamo visualizzare le due liste, 
       e con v-for="S1" lo popoliamo */
    }
  },
  created: function() {
    DataService.getPersonaggi().then(data => {
      data.data.results.forEach(this.controllaStagione);
    });
  }
};
</script>

<style>
</style>
