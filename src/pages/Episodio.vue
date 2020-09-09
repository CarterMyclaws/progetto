<template>
  <div class="container">
    <md-card class="cardona">
      <md-card-media>
        <img class="cardona-img" src="../assets/Rimg/S05.png" alt="img">
      </md-card-media>
      <button @click="getWiki()">
        getWiki
      </button>
      <md-card-header v-if="episodio">
        <div class="md-title">{{episodio.name}} - {{episodio.episode}}</div>
        <div class="md-subhead">Transmitted on {{episodio.air_date}}</div>
      </md-card-header>
      <md-card-content>
        <br>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut saepe eum. Dolorem quaerat corrupti natus voluptatibus fugit est totam, mollitia optio dolores magnam vitae sed dicta, quia soluta laborum.
          Corrupti incidunt nostrum nesciunt reiciendis pariatur tempora? Totam doloribus voluptatibus dolorem, cupiditate at perferendis debitis sit esse nisi ex pariatur adipisci beatae? Fugit, quo ducimus. Rem dicta deleniti dignissimos aspernatur?
          Similique laudantium aliquam natus odio quibusdam dolores itaque, sequi dolorum perspiciatis dicta provident rerum temporibus ex nisi ipsum! Minima repudiandae quisquam aspernatur id eos amet ullam, dolorem inventore ipsam perferendis!
        </p>
        <br>
        <br>
        <div class="md-title">Personaggi</div>
        <div class="md-subhead">In questo episodio sono presenti {{personaggi.length}} personaggi</div>
        <br>
        <!-- personaggi in questo episodio -->
        <div class="md-layout md-alignment-center-center">
          <div
            clas="md-layout-item md-large-size-33 md-medium-size-50 md-xsmall-size-100"
            v-for="p in personaggi"
            :key="p.id"
          >
            <!-- <router-link :to="'/personaggio/' + p.id">  questo non va bene perché rende tutto il testo della card a mo di link(blu e sottolineato)-->
            <md-card class="mycard">
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
                <md-button>Aggiungi</md-button>
                <md-button @click="goTo(p.id)">Esplora</md-button>
              </md-card-actions>
            </md-card>
            <!-- </router-link> -->
            <br>
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
      episodio: null,
      personaggi: [],
      id: ""
    };
  },
  methods: {
    prelevaId(url) {
      this.id = url.split("/").pop();
      DataService.getPersonaggioById(this.id).then(data => {
        this.personaggi.push(data.data);
      });
    },
    goTo(id) {
      this.$router.push({ path: "/personaggio/" + id });
    },
    getWiki(){
      DataService.getWiki();
    }
  },
  created: function() {
    DataService.getEpisodioById(this.$route.params.id).then(data => {
      this.episodio = data.data;
      /* popolazione di personaggi */
      this.episodio.characters.forEach(this.prelevaId);
    });
  },
  mounted: function() {
    document.getElementsByClassName("container")[0].scrollIntoView();
  }
};
</script>

<style scoped>
.mycard {
  width: 320px;
  margin: 20px 20px;
  display: inline-block;
  vertical-align: top;
}

.container {
  padding: 80px;
}
.md-card-header,
.md-card-content {
  padding-left: 30px;
  padding-right: 30px;
}
/* large */
@media (max-width: 1919px) {
  .container {
    padding: 70px;
    padding-top: 10px;
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
</style>
