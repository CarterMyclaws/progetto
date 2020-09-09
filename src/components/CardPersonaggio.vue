<template>
  <md-card>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{p}}</div>
        <div class="md-subhead">{{p}}</div>
      </md-card-header-text>

      <!-- <md-card-media md-medium>
        <img :src="p.image">
      </md-card-media>-->
    </md-card-header>
    <md-card-actions>
      <!-- <md-button class="md-icon-button">
              <md-icon>favorite</md-icon>
      </md-button>-->
      <!-- <md-button class="md-icon-button" v-if="prefCheck(p.name)" @click="prefTrigger(p.name,1)">
        <md-icon>favorite_border</md-icon>
        <md-tooltip>Aggiungi preferito</md-tooltip>
      </md-button>
      <md-button class="md-icon-button" v-if="!prefCheck(p.name)" @click="prefTrigger(p.name,0)">
        <md-icon>favorite</md-icon>
        <md-tooltip>Rimuovi preferito</md-tooltip>
      </md-button>
      <md-button class="md-icon-button" @click="goTo(p.id)">
        <md-icon>find_in_page</md-icon>
        <md-tooltip>Esplora</md-tooltip>
      </md-button>-->
    </md-card-actions>
  </md-card>
</template>

<script>
import DataService from "../dataservice";
export default {
  data: function() {
    return {
      personaggio: null
    };
  },
  props: ["p"],
  methods: {
    controllaPersonaggio(pers) {
      if (this.p === pers) {
        return pers;
      } else {
        console.log("errore, personaggio non trovato");
      }
    }
  },
  created: function() {
    DataService.getPersonaggi().then(data => {
      data.data.results.forEach(this.controllaPersonaggio);
    });
  }
};
</script>

<style>
</style>
