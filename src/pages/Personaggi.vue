<template>
  <div class="containerz">
    <md-card class="cardona">
      <md-card-media>
        <img class="cardona-img" src="../assets/Personaggi.png" alt="People">
      </md-card-media>

      <md-card-header>
        <div class="md-title">Personaggi</div>
      </md-card-header>
      <md-card-content>
        Una raccolta di tutti i personaggi di Rick and Morty. Seleziona
        <b>"Esplora"</b>, per vedere i dettagli del personaggio, oppure
        <b>"Aggiungi"</b> per aggiungere il personaggio alla tua raccolta
        <b>Preferiti</b>.
        <div class="container" id="scroll_top">
          <!-- dopo MOLTI tentativi questo è il codice per allineare a destra gli items -->
          <div class="md-layout md-alignment-center-right">
            <div clas="md-layout-item md-size-50">
              <!-- vista griglia/lista -->
              <md-button
                class="md-icon-button"
                v-if="vistaGriglia"
                @click="vistaGriglia = !vistaGriglia"
              >
                <md-icon>view_list</md-icon>
                <md-tooltip>Vista Lista</md-tooltip>
              </md-button>
              <md-button
                class="md-icon-button"
                v-if="!vistaGriglia"
                @click="vistaGriglia =     !vistaGriglia"
              >
                <md-icon>view_module</md-icon>
                <md-tooltip>Vista cards</md-tooltip>
              </md-button>
              <!-- +++++++++++++++++++++++++++++++++++++++++++++++-->
              <!-- tasto cerca -->
              <md-button class="md-icon-button" @click="boxCerca = !boxCerca" v-if="!boxCerca">
                <md-icon>search</md-icon>
                <md-tooltip>Cerca personaggio</md-tooltip>
              </md-button>
            </div>
            <div
              class="md-layout-item md-large-size-33 md-medium-size-66 md-xsmall-size-100"
              v-if="boxCerca"
            >
              <!-- in input autocomplete prende selectedPersonaggio, che è la variabile che viene popolata, e md-options che sono invece le opzioni in cui cercare ciò che viene digitato. Option può esere sia un array che un promise, infatti nel nostro caso non possiamo sapere in anticipo i valori da cercare perchè i personaggi sono allocati dinamicamente -->
              <md-autocomplete
                md-layout="box"
                v-model="selectedPersonaggio"
                :md-options="raccoltaPersonaggi"
                @md-selected="select"
                @md-changed="trova"
                :md-fuzzy-search="false"
                :md-open-on-focus="false"
              >
                <!-- trova è un metodo che andrà a richiamare trovaPersonaggio nel DataService -->
                <label>Cerca personaggio</label>
              </md-autocomplete>
            </div>
            <!-- +++++++++++++++++++++++++++++++++++++++++++++++-->
          </div>
          <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
          <!-- button per navigazione -->
          <div class="navigation">
            <md-button class="md-icon-button" @click="paginaPrec()" :disabled="offset==1">
              <md-icon>navigate_before</md-icon>
            </md-button>
            <span class="id_align" v-if="offset>2">{{this.offset -2}}&nbsp&nbsp</span>
            <span class="id_align" v-if="offset>1">{{this.offset -1}}&nbsp&nbsp</span>
            <big class="id_align">
              <b>{{this.offset}}</b>&nbsp&nbsp
            </big>
            <span class="id_align">{{this.offset+1}}&nbsp&nbsp</span>
            <span class="id_align">{{this.offset+2}}</span>
            <md-button class="md-icon-button" @click="paginaSucc()">
              <md-icon>navigate_next</md-icon>
            </md-button>
          </div>
          <!-- +++++++++++++++++++++++++++++++++++++++++++++++-->
          <!--
      <!-- vista cards 
    <div class="md-layout md-alignment-center-center" v-if="vistaGriglia">
          <!-- md-layout-item rappresenta una colonna-->
          <!-- v-for richiede key che deve essere collegato ad un elemento UNIVOCO presente nella raccolta, per noi infatti è l'id 
      <div clas="md-layout-item md-large-size-33 md-medium-size-50 md-xsmall-size-100" v-for="p in personaggi" :key="p.id">
        <!-- <router-link :to="'/personaggio/' + p.id">  questo non va bene perché rende tutto il testo della card a mo di link(blu e sottolineato)
        <md-card>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{p.name}}</div>
              <div class="md-subhead">{{p.status}}</div>
            </md-card-header-text>

          <md-card-media md-medium>
            <img :src="p.image">
            </md-card-media>
          </md-card-header>
          <md-card-actions>
            <!-- <md-button class="md-icon-button">
              <md-icon>favorite</md-icon>
            </md-button> 
            <md-button>Aggiungi</md-button>
            <md-button @click="goTo(p.id)">Espplora</md-button>
          </md-card-actions>
        </md-card>
        <!-- </router-link> 
        <br>
      </div>
    </div>
          -->
          <!-- vista cards -->
          <!-- <span class="center-span"> -->
          <div class="md-layout md-alignment-center-center" v-if="vistaGriglia">
            <!-- md-layout-item rappresenta una colonna -->
            <!-- v-for richiede key che deve essere collegato ad un elemento UNIVOCO presente nella raccolta, per noi infatti è l'id -->
            <div
              class="md-layout-item md-large-size-33 md-medium-size-50 md-xsmall-size-100"
              v-for="p in personaggi"
              :key="p.id"
            >
              <!-- <router-link :to="'/personaggio/' + p.id">  questo non va bene perché rende tutto il testo della card a mo di link(blu e sottolineato)-->
              <md-card>
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-title">{{p.name}}</div>
                    <div class="md-subhead">{{p.status}}</div>
                  </md-card-header-text>

                  <md-card-media md-medium>
                    <img :src="p.image">
                  </md-card-media>
                </md-card-header>
                <md-card-actions>
                  <!-- <md-button class="md-icon-button">
              <md-icon>favorite</md-icon>
                  </md-button>-->
                  <md-button
                    class="md-icon-button"
                    v-if="prefCheck(p.name)"
                    @click="prefTrigger(p.name,1)"
                  >
                    <md-icon>favorite_border</md-icon>
                    <md-tooltip>Aggiungi preferito</md-tooltip>
                  </md-button>
                  <md-button
                    class="md-icon-button"
                    v-if="!prefCheck(p.name)"
                    @click="prefTrigger(p.name,0)"
                  >
                    <md-icon>favorite</md-icon>
                    <md-tooltip>Rimuovi preferito</md-tooltip>
                  </md-button>
                  <md-button class="md-icon-button" @click="goTo(p.id)">
                    <md-icon>find_in_page</md-icon>
                    <md-tooltip>Esplora</md-tooltip>
                  </md-button>
                </md-card-actions>
              </md-card>
              <!-- </router-link> -->
              <br>
            </div>
          </div>
          <!--  </span> -->
          <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
          <!-- vista lista -->
          <div class="md-layout md-alignment-center-center">
            <div class="md-layout-item md-large-size-50 md-medium-size-50 md-xsmall-size-100">
              <div v-if="!vistaGriglia">
                <md-list class="md-double-list">
                  <div v-for="p in personaggi" :key="p.id">
                    <md-list-item :to="'/personaggio/' + p.id">
                      <md-avatar>
                        <img :src="p.image">
                      </md-avatar>
                      <div class="md-list-item-text">
                        <span>{{p.name}}</span>
                        <span>{{p.status}}</span>
                      </div>
                      <md-button
                        class="md-icon-button md-list-action"
                        v-if="prefCheck(p.name)"
                        @click="prefTrigger(p.name,1)"
                      >
                        <md-icon>favorite_border</md-icon>
                        <md-tooltip>Aggiungi preferito</md-tooltip>
                      </md-button>
                      <md-button
                        class="md-icon-button md-list-action"
                        v-if="!prefCheck(p.name)"
                        @click="prefTrigger(p.name,0)"
                      >
                        <md-icon>favorite</md-icon>
                        <md-tooltip>Rimuovi preferito</md-tooltip>
                      </md-button>
                    </md-list-item>
                    <md-divider></md-divider>
                  </div>
                </md-list>
              </div>
            </div>
          </div>
          <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
          <!-- button per navigazione -->
          <div class="navigation">
            <md-button class="md-icon-button" @click="paginaPrec()" :disabled="offset==1">
              <md-icon>navigate_before</md-icon>
            </md-button>
            <span class="id_align" v-if="offset>2">{{this.offset -2}}&nbsp&nbsp</span>
            <span class="id_align" v-if="offset>1">{{this.offset -1}}&nbsp&nbsp</span>
            <big class="id_align">
              <b>{{this.offset}}</b>&nbsp&nbsp
            </big>
            <span class="id_align">{{this.offset+1}}&nbsp&nbsp</span>
            <span class="id_align">{{this.offset+2}}</span>
            <md-button class="md-icon-button" @click="paginaSucc()">
              <md-icon>navigate_next</md-icon>
            </md-button>
          </div>
          <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import DataService from "../dataservice";

export default {
  data: function() {
    return {
      /* personaggi: DataService.getPersonaggi(), */
      personaggi: [],
      vistaGriglia: true,
      offset: 1,
      selectedPersonaggio: null,
      raccoltaPersonaggi: [],
      tempPersonaggi: [],
      boxCerca: false,
      /* preferito: false,
      giaPreferito: true, */
      preferiti: [],
      dbDocs: ""
    };
  },
  methods: {
    prefCheck(name) {
      if (this.preferiti.length > 0) {
        if (!this.preferiti.includes(name)) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    prefTrigger(p, trigger) {
      /* favTrigger deve scrivere sul database un nuovo personaggio oppure se c'è già toglierlo */
      if (trigger === 0) {
        DataService.getDocs(DataService.whoIsAuthenticated(), p).then(data => {
          this.dbDocs = Object.values(data);
          DataService.removeLike(this.dbDocs);
        });
        /* togli da preferiti[] */
        const index = this.preferiti.indexOf(p);
        if (index > -1) {
          console.log(p + " RIMOSSO");
          this.preferiti.splice(index, 1);
        }
      } else {
        console.log(p + " aggiunto");
        DataService.setLike(DataService.whoIsAuthenticated(), p);
        /* aggiungi ai preferiti[] */
        this.preferiti.push(p);
      }
    },
    goTo(id) {
      this.$router.push({ path: "/personaggio/" + id });
    },
    paginaSucc() {
      this.offset += 1;
      console.log(this.offset);
      document
        .getElementById("scroll_top")
        .scrollIntoView({ behavior: "smooth" });
      DataService.getPersonaggi(this.offset).then(data => {
        this.personaggi = data.data.results;
        console.log(data);
      });
    },
    paginaPrec() {
      if (this.offset !== 1) {
        this.offset -= 1;
      }
      document
        .getElementById("scroll_top")
        .scrollIntoView({ behavior: "smooth" });
      DataService.getPersonaggi(this.offset).then(data => {
        this.personaggi = data.data.results;
      });
    },
    /* grazie a md-changed sappiamo che trova in questo caso prende in input in tempo reale ciò che l'utente scrive nell'autocomplete */
    trova(term) {
      if (!term || term.length < 3) {
        return;
      } else {
        for (let i = 1; i <= 3; i++) {
          DataService.getPersonaggi(i).then(data => {
            for (let j = 0; j < data.data.results.length; j++) {
              if (!this.tempPersonaggi.includes(data.data.results[j].name)) {
                this.tempPersonaggi.push(data.data.results[j].name);
              }
              /* else{return} */
            }
          });
        }
        this.raccoltaPersonaggi = this.tempPersonaggi;
      }
    },
    select(selected) {
      /* if (selected === this.$route.params.id) return;
      this.$router.push({ path: "/personaggio/" + selected }); */
      var index = this.raccoltaPersonaggi.indexOf(selected) + 1;
      if (index === this.$route.params.id) return;
      this.$router.push({ path: "/personaggio/" + index });
    }
  },
  /* utilizzo gli hook (eventi) del ciclo di vita per caricare i dati appena si carica la pagina */
  created: function() {
    /* gestiamo il promise della funzione tramite then */
    DataService.getPersonaggi().then(data => {
      this.personaggi = data.data.results;
    });
    /* al caricamento della pagina devo controllare i likes corrispondenti all'utente corrente e salvare i
    personaggi in un array - poi in base al fatto che p.name sia presente o */
    DataService.getLikes(DataService.whoIsAuthenticated()).then(data => {
      /* getLikes mi passa i personaggi preferiti e io li metto nella variabile locale "preferiti[]" */
      this.preferiti = data;
    });
  },
  mounted: function() {
    document.getElementsByClassName("containerz")[0].scrollIntoView();
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 80px;
}

.container {
  padding: 80px;
}
/* large */
@media (max-width: 1919px) {
  .container {
    padding: 30px;
  }
  .cardona-img {
    object-fit: cover;
    height: 420px;
  }
}
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
  .cardona-img {
    object-fit: cover;
    height: 200px;
  }
}

.cardona {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}

.md-card {
  width: 90%;
  margin: auto;
}
.md-layout-item {
  width: 80%;
  justify-content: center;
}
.id_align {
  vertical-align: -10px;
}
.navigation {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.center-span {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
</style>

