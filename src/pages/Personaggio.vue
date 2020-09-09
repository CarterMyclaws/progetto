<template>
  <div class="container">
    <div class="md-layout">
      <md-card class="md-layout-item md-size-100" v-if="personaggio">
        <md-card-header>
          <md-card-header-text>
            <span class="md-title">{{personaggio.name}}</span>
          </md-card-header-text>
          <md-card-media md-big>
            <img :src="personaggio.image">
          </md-card-media>
        </md-card-header>
        <md-card-content>
          <md-table>
            <md-table-row>
              <md-table-cell>
                <b>Status</b>
              </md-table-cell>
              <md-table-cell>{{personaggio.status}}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>
                <b>Specie</b>
              </md-table-cell>
              <md-table-cell>{{personaggio.species}}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>
                <b>Gender</b>
              </md-table-cell>
              <md-table-cell>{{personaggio.gender}}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>
                <b>Provenienza</b>
              </md-table-cell>
              <md-table-cell>{{personaggio.location.name}}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>
      </md-card>
    </div>
    <br>
    <!-- cardona episodi -->
    <md-card class="md-layout-item md-size-100" v-if="personaggio">
      <md-card-header>
        <md-card-header-text>
          <span class="md-title">Episodi</span>
          <p class="md-header">
            <b>{{personaggio.name}}</b> è presente in questi episodi:
          </p>
        </md-card-header-text>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-alignment-center-center">
          <div
            class="md-layout-item md-large-size-33 md-medium-size-50 md-xsmall-size-100"
            v-for="e in episodi"
            :key="e.id"
            @click="goTo(e.id)"
          >
            <md-card md-with-hover class="mie-cards">
              <md-ripple>
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-title">{{e.episode}}</div>
                    <div class="md-subhead">{{e.air_date}}</div>
                  </md-card-header-text>
                </md-card-header>
              </md-ripple>
            </md-card>
            <br>
          </div>
        </div>
      </md-card-content>
    </md-card>
    <!-- --------------- -->
  </div>
</template>

<script>
import DataService from "../dataservice";
export default {
  data: function() {
    return {
      personaggio: null,
      episodi: [],
      presente: false
    };
  },
  methods: {
    popolaEpisodi(episodio) {
      episodio.characters.forEach(this.contienePersonaggio);
      if (this.presente === true) {
        this.episodi.push(episodio);
        this.presente = false;
      }
    },
    contienePersonaggio(personaggiEpisodio) {
      if (personaggiEpisodio === this.personaggio.url) {
        this.presente = true;
      }
    },
    goTo(id) {
      this.$router.push({ path: "/episodio/" + id });
    }
  },
  /* metodo che popola le cards degli episodi */
  created: function() {
    DataService.getPersonaggioById(this.$route.params.id).then(data => {
      this.personaggio = data.data;
      DataService.getEpisodi().then(data => {
        data.data.results.forEach(this.popolaEpisodi);
      });
    });
  },
  mounted: function() {
    document.getElementsByClassName("container")[0].scrollIntoView();
  }
};
</script>

<style scoped>
.container {
  padding: 80px;
}
/* large */

/* medium */
@media (max-width: 959px) {
  .container {
    padding: 5px;
  }
}
/* xsmall */
@media (max-width: 600px) {
  .container {
    padding: 10px;
  }
}
</style>
