<!--Questa pagina necessita di un componente senza interfaccia che gestisca 
i dati, che chiamiamo dataservice.js

QUESTA PAGINA È LA PRIMA COSA CHE VOGLIAMO VENGA VISUALIZZATA QUANDO UN UTENTE SI PRESENTA SUL NOSTRO SITO, E QUESTO LO REALIZZIAMO NELLA PAGINA main.js tramite NAVIGATION GUARD, OVVERO A LIVELLO DI ROUTER -> tramite il controllo router.beforeEach()
-->
<template>
  <div class="container">
    <br>
    <br>
    <br>
    <div class="md-layout md-alignment-center-center">
      <md-card class="md-layout-item md-size-30 md-medium-size-50 md-xsmall-size-100">
        <md-card-media>
          <img
            class="md-size-30 md-medium-size-50 md-xsmall-size-100"
            src="https://zon.it/wp-content/uploads/2019/05/maxresdefault-25.jpg"
            alt="Rick and Morty"
          >
        </md-card-media>
        <md-card-header>
          <span class="md-title">Login</span>
        </md-card-header>
        <md-card-content>
          <md-field>
            <label>Username</label>
            <!-- abbiniamo input alla variabile 'username' tramite il comando v-model. deve quindi essere presente nei data di questa pagina 'Login' -->
            <md-input v-model="username"></md-input>
          </md-field>
        </md-card-content>
        <md-card-actions>
          <!-- messo così da solo non fa niente e quindi dobbiamo associargli un metodo che andiamo a scrivere nei methods della pagina - e lo associamo al poulsante tramite @click (ocio alle parentesi dopo le funzioni qui)-->
          <md-button class="md-primary md-raised" :disabled="!username" @click="signIn()">Accedi</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import DataService from "../dataservice";
export default {
  /* qui anche se semplicemente necessitiamo di dichiarare una variabile 'username' comunque dobbiamo scrivere function-return-ecc...si fa così! (forse per le pagine e non per i componenti?) - inoltre username è inizializzato a vuoto ma viene popolato successivamente tramite input dato che l'abbiamo collegato tramite v-model a riga 13*/
  data: function() {
    return {
      username: ""
    };
  },
  methods: {
    signIn: function() {
      /* Qui dobbiamo quindi chiamare dataservice.js e settare il nuovo username - MOLTO IMPORTANTE: PER CHIAMARE DATASERVICE DOBBIAMO PRIMA IMPORTARLO NELLA PAGINA e questo lo facciamo appena dopo <script>... e a quanto pare utilizzando il kebab-case - essendo un livello superiore si mettono due puntini davanti - quindi chiamiamo dataservice e gli passiamo this.username che al momento della chiamata del metodo signIn è appena stato inserito nel form (che essendo v-modellato alla variabile username, l'ha settata)*/
      DataService.login(this.username);
      /* fatto questo ho bisogno che il router mi reindirizzi alla dashboard - il router (non so come) è già abilitato in tutte le pagine - QUESTO è QUINDI L COMANDO PER SPOSTARSI DA UNA PAGINA ALL'ALTRA DOPO CHE ABBIAMO SCHIACCIATO UN PULSANTE - '/' è LA HOME */
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
</style>
