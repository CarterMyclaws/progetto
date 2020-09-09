<template>
  <div class="Epcontainer">
    <md-card class="cardona">
      <md-card-media>
        <img class="cardona-img" src="../assets/Episodi.jpg" alt="img">
      </md-card-media>
      <button @click="favedere">ciao</button>
      <md-card-header>
        <div class="md-title">Episodi</div>
      </md-card-header>
      <md-card-content>
        Una raccolta di tutti gli Episodi di Rick and Morty. Seleziona
        <b>"Esplora"</b> per vedere i dettagli dell'episodio.
        <br>
        <br>
        <br>
        <div class="container">
          <div class="md-layout md-alignment-top-center">
            <!-- stagione 1 -->
            <md-card
              class="md-layout-item md-large-size-40 md-medium-size-40 md-xsmall-size-100"
              v-for="n in numStagioni"
              :key="n.id"
            >
              <!--<md-card-media v-if="selectedImage">
                <img :src="selectedImage" alt="Season">
              </md-card-media>-->
              <md-card-media>
                <img src="../assets/Rimg/S01.jpg" alt="People">
              </md-card-media>
              <md-card-header>
                <div class="md-title">Stagione {{n}}</div>
                <div class="md-subhead">{{epForSeasonName[n-1].episodi.length}} Episodi</div>
              </md-card-header>
              <md-card-content>
                <md-list class="md-layout-item">
                  <md-list-item
                    v-for="e in epForSeasonName[n-1].episodi"
                    :key="e.stagioni"
                    @click="goTo(e)"
                  >
                    <span>{{epForSeasonName[n-1].episodi.indexOf(e)+1}} - {{e}}</span>
                    <md-divider></md-divider>
                  </md-list-item>
                </md-list>
              </md-card-content>
            </md-card>

            <!-- <div
              class="md-layout-item md-large-size-33 md-medium-size-50 md-xsmall-size-100"
              v-for="p in personaggi"
              :key="p.id"
            >
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
              <br>
            </div>-->
          </div>
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
      epForSeason: [],
      epForSeasonName: [
        /* { stagione: 1, episodi: ["unone", "unonzo", "unello"] },
        { stagione: 2, episodi: ["duello", "duastro", "duedudu"] },
        { stagione: 3, episodi: ["trette", "treotto", "trento"] },
        { stagione: 4, episodi: ["quadro", "quastro", "quando"] } */
      ],
      episodi: [],
      numStagioni: [],
      images: [
        "../assets/Rimg/S01.jpg",
        "../assets/Rimg/S02.jpg",
        "../assets/Rimg/S03.jpg",
        "../assets/Rimg/S04.jpg",
        "../assets/Rimg/S05.jpg",
        "../assets/Rimg/S06.jpg"
      ],
      selectedImage: null
    };
  },
  methods: {
    goTo(nomeEpisodio) {
      let id = 0;
      for (let i = 0; i < this.episodi.length; i++) {
        if (this.episodi[i].name.includes(nomeEpisodio)) {
          id = i + 1;
        }
      }
      this.$router.push({ path: "/episodio/" + id });
    },
    favedere: function() {
      console.log("this.episodi =" + this.episodi.length);
    },
    whichSeason: function(episodio, stagione) {
      return true;
    },
    randomItem(items) {
      return this.images[0];
    }
  },
  /* utilizzo gli hook (eventi) del ciclo di vita per caricare i dati appena si carica la pagina */
  created: function() {
    this.selectedImage = "../assets/Rimg/S01.jpg";
    DataService.getPages().then(pages => {
      var name_temp = [];
      for (let j = 1; j <= pages; j++) {
        DataService.getEpisodiWithPage(j).then(data => {
          for (let i = 0; i < data.data.results.length; i++) {
            /* controllo fino alla sesta stagione al momento sono 4 */
            for (let z = 1; z < 6; z++) {
              if (data.data.results[i].episode.includes("S0" + z)) {
                name_temp.push(data.data.results[i].name);
                console.log("name_temp = " + name_temp);
                /* popolo this.episodi che contiene tutti gli episodi con la dicitura S01E01 - il nome dell'episodio - e la stagione */
                let episode_temp = {
                  name: data.data.results[i].name,
                  episode: data.data.results[i].episode,
                  season: z
                };
                this.episodi.push(episode_temp);
                /* popolo this.epForSeasonName che contiene degli oggetti (ad oggi 4) con primo elemento: stagione 
                e come secondo elemento: il nome degli episodi di quella stagione*/
                let elem = {
                  stagione: z,
                  episodi: name_temp
                };
                this.epForSeasonName[z - 1] = elem;
                if (
                  data.data.results[i + 1] !== undefined &&
                  !data.data.results[i + 1].episode.includes("S0" + z)
                ) {
                  console.log(data.data.results[i + 1].episode);
                  console.log(typeof data.data.results[i + 1].episode);
                  name_temp = [];
                }
                if (!this.numStagioni.includes(z)) {
                  this.numStagioni.push(z);
                }
              }
            }
          }
        });
      }
    });

    /* al caricamento della pagina devo controllare i likes corrispondenti all'utente corrente e salvare i
    personaggi in un array - poi in base al fatto che p.name sia presente o */
    DataService.getLikes(DataService.whoIsAuthenticated()).then(data => {
      /* getLikes mi passa i personaggi preferiti e io li metto nella variabile locale "preferiti[]" */
      this.preferiti = data;
    });
    document.getElementsByClassName("Epcontainer")[0].scrollIntoView();
  },
  mounted: function() {
    document.getElementsByClassName("Epcontainer")[0].scrollIntoView();
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
    object-position: 0% 25%;
  }
}
/* medium */
@media (max-width: 959px) {
  .container {
    padding: 5px;
  }
}
/* tablet */
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
  margin-top: 0px;
  margin-bottom: 50px;
}
</style>

/* DataService.getPages().then(pages => {
      var count = 0;
      var newcount = 1;
      for (let j = 1; j <= pages; j++) {
        DataService.getEpisodiWithPage(j).then(data => {
          for (let i = 0; i < data.data.results.length; i++) {
            if (j === 1) {
              for (let z = 1; z < 6; z++) {
                if (data.data.results[i].episode.includes("S0" + z)) {
                  let episode_temp = {
                    name: data.data.results[i].name,
                    episode: data.data.results[i].episode,
                    season: z
                  };
                  this.episodi[i] = episode_temp;
                  /* popolo epForSeason */
                  if (!this.epForSeason[z - 1]) {
                    this.epForSeason[z - 1] = 0;
                  }
                  this.epForSeason[z - 1]++;
                  /* console.log(this.epForSeason); */
                  /* controllo se numStagioni[] contiene già la stagione z altrimenti la inserisco  */
                  if (!this.numStagioni.includes(z)) {
                    this.numStagioni.push(z);
                  }
                }
              }
              /* -------------- */
              count++;
            } else if (j !== 1) {
              /* popolo episodi[] */
              for (let z = 1; z < 6; z++) {
                if (data.data.results[i].episode.includes("S0" + z)) {
                  let episode_temp = {
                    name: data.data.results[i].name,
                    episode: data.data.results[i].episode,
                    season: z
                  };
                  this.episodi[count] = episode_temp;
                  /* popolo epForSeason */
                  if (!this.epForSeason[z - 1]) {
                    this.epForSeason[z - 1] = 1;
                  }
                  this.epForSeason[z - 1]++;

                  /* controllo se numStagioni[] contiene già la stagione z altrimenti la inserisco  */
                  if (!this.numStagioni.includes(z)) {
                    this.numStagioni.push(z);
                  }
                }
              }
              /* -------------- */
              count += newcount;
            }
          }
        });
      }
    }); */