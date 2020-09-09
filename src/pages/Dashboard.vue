<template>
  <div class="container">
    <div class="background" @mouseover="showByIndex = 1" @mouseout="showByIndex = 0">
      <img
        :class="[mobileScreen === false? 'img-dashboard': 'img-dashboard-mobile']"
        src="../assets/Background.jpg"
        alt="Background"
      >
      <div v-if="!mobileScreen">
        <md-button
          class="animate-flicker md-icon-button btn"
          @click="scroll"
          v-show="showByIndex === 1"
        >
          <!-- href="#content" -->
          <md-icon>expand_more</md-icon>
        </md-button>
      </div>
    </div>
    <br>
    <br>
    <br>
    <div id="content" class="contenuto">
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-large-size-40 md-medium-size-40 md-xsmall-size-100">
          <md-card :class="[mobileScreen === false? 'std-card': 'card-mobile']">
            <md-card-media-cover md-solid>
              <md-card-media md-ratio="16:9">
                <img class="overlay" src="../assets/Personaggi.png" alt="Personaggi">
              </md-card-media>

              <md-card-area>
                <md-card-header>
                  <span class="md-title">Personaggi</span>
                </md-card-header>

                <md-card-actions>
                  <md-button to="/Personaggi" class="md-raised" @click="scrollTop()">Vai</md-button>
                </md-card-actions>
              </md-card-area>
            </md-card-media-cover>
          </md-card>
        </div>
        <div class="md-layout-item md-large-size-40 md-medium-size-40 md-xsmall-size-100">
          <md-card>
            <md-card-media-cover md-solid>
              <md-card-media md-ratio="16:9">
                <img src="../assets/Episodi.jpg" alt="Episodi">
              </md-card-media>

              <md-card-area>
                <md-card-header>
                  <span class="md-title">Episodi</span>
                </md-card-header>

                <md-card-actions>
                  <md-button to="/Episodi" class="md-raised" @click="scrollTop()">Vai</md-button>
                </md-card-actions>
              </md-card-area>
            </md-card-media-cover>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../dataservice";
export default {
  data: function() {
    return {
      /* personaggi: DataService.getPersonaggi(), */
      mobileScreen: false,
      showByIndex: null,
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
    screenSize: function() {
      if (window.innerWidth < 1025) {
        console.log("mobile");
        this.mobileScreen = true;
      } else {
        console.log("not mobile");
        this.mobileScreen = false;
      }
    },
    scrollTop() {
      document.getElementsByClassName("container")[0].scrollIntoView();
    },
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
      DataService.getPersonaggi(this.offset).then(data => {
        this.personaggi = data.data.results;
      });
    },
    paginaPrec() {
      if (this.offset !== 1) {
        this.offset -= 1;
      }
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
    },
    scroll: function() {
      document.getElementById("content").scrollIntoView({ behavior: "smooth" });
    }
  },
  mounted() {
    // Register an event listener when the Vue component is ready
    window.addEventListener("resize", this.screenSize);
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
  }
};
</script>

<style scoped>
.std-card {
  margin-top: 25%;
  margin-bottom: 25%;
  margin: none;
}
.card-mobile {
  margin-top: 15%;
  margin-bottom: 15%;
  margin: none;
}
.container {
  -webkit-animation: fadein 4s;
}
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.container .btn {
  position: absolute;
  top: 91%;
  left: 50%;
  background-color: #555;
  justify-content: center;
}
@keyframes flickerAnimation {
  /* flame pulses */
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animate-flicker {
  opacity: 1;
  animation: flickerAnimation 2s infinite;
}
.contenuto {
  margin-bottom: 200px;
  -webkit-animation: fadein 6s;
}
.img-dashboard-mobile {
  object-fit: contain;
  margin-top: 0px !important;
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: auto;
  height: auto;
  margin-bottom: 0px;
}
/*.img-dashboard {
  display: inline-block;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
  width: 80%; 
  object-fit: cover;
  object-position: 30% 0;
  width: auto;
  height: 800px;
}*/
/* @media (min-width: 1280px) {
  .img-dashboard {
    display: block;
    margin-left: 0;
    margin-right: auto;
    width: 100%;
  }
} */
/* @media (max-width: 1000px) {
  .img-dashboard {
    object-fit: cover;
    object-position: 20% 0;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: auto;
    height: 530px;
  }
} */
</style>
/* background-image: url("../assets/Background.jpg"); */