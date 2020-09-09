<template>
  <div class="container">
    <div>
      <md-card class="md-primary md-card-profile not-top">
        <div>
          <!-- <img class="profile_pic" src="../assets/profile_pic_3.jpg" alt="Avatar"> -->
          <img class="profile_pic" src="../assets/profile_pic_3.jpg" alt="Avatar">
        </div>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{username}}</div>
          </md-card-header-text>
        </md-card-header>

        <!-- <md-card-actions class="md-layout-item md-size-100">
          <md-button>Action</md-button>
          <md-button>Action</md-button>
        </md-card-actions>-->
        <!-- tabs -->
        <md-tabs class="md-primary" md-alignment="centered">
          <md-tab id="tab-gestione" md-label="Gestione">
            <div class="md-layout md-alignment-center-center">
              <div class="md-layout-item">
                <br>
                <DialogConfirm></DialogConfirm>
                <br>
              </div>
            </div>
          </md-tab>
          <md-tab id="tab-preferiti" md-label="Preferiti">
            <br>
            <div v-if="preferiti" class="md-layout md-alignment-center-center">
              <div class="cont-card" v-for="pers in preferiti" :key="pers.id">
                <div @click="goTo(index[preferiti.indexOf(pers)])">
                  <!-- <md-card
                    class="card-pref md-layout-item md-large-size-33 md-medium-size-66 md-xsmall-size-100"
                    md-with-hover
                  >
                    <md-card-media>
                      <img :src="media[preferiti.indexOf(pers)]" alt="pers">
                    </md-card-media>
                    <md-card-header>{{name[preferiti.indexOf(pers)]}}</md-card-header>
                  </md-card>-->
                  <md-card class="card-pref" md-with-hover>
                    <md-card-header>
                      <md-card-header-text>
                        <div class="md-title">{{name[preferiti.indexOf(pers)]}}</div>
                      </md-card-header-text>

                      <md-card-media md-medium>
                        <img :src="media[preferiti.indexOf(pers)]" alt="pers">
                      </md-card-media>
                    </md-card-header>
                  </md-card>
                  <br>
                </div>
              </div>
            </div>
          </md-tab>
          <md-tab id="tab-stats" md-label="Stats"></md-tab>
        </md-tabs>
      </md-card>
    </div>
  </div>
</template>

<script>
import DataService from "../dataservice";
import DialogConfirm from "../components/DialogConfirm";
import ListaStagioni from "../components/ListaStagioni";
import CardPersonaggio from "../components/CardPersonaggio";
export default {
  data: function() {
    return {
      username: DataService.whoIsAuthenticated(),
      preferiti: [],
      media: [],
      index: [],
      name: []
    };
  },
  components: {
    DialogConfirm,
    ListaStagioni,
    CardPersonaggio
  },
  created: function() {
    this.username = DataService.whoIsAuthenticated();
    DataService.getLikes(DataService.whoIsAuthenticated()).then(data => {
      /* console.log(data); */
      this.preferiti = data;
      //setto immagini
      DataService.prefMedia("ciao").then(datas => {
        datas.forEach(doc => {
          if (this.preferiti !== undefined) {
            if (this.preferiti.includes(doc.name)) {
              /* console.log("doc" + doc.image); */
              this.media.push(doc.image);
              this.index.push(doc.id);
              this.name.push(doc.name);
            } else {
              console.log("shao");
            }
          }
        });
      });
    });
  },
  methods: {
    goTo(id) {
      console.log("id" + id);
      this.$router.push({ path: "/personaggio/" + id });
    }
  }
};
</script>

<style scoped>
@media (max-width: 1919px) {
  .container {
    padding: 230px 80px 0 80px;
  }
  .profile_pic {
    width: 20%;
    height: auto;
    margin: -15% auto 0;
    border-radius: 50%;
    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.561);
  }
}
/* medium */
@media (max-width: 959px) {
  .container {
    padding: 110px 80px 0 80px;
  }
  .profile_pic {
    width: 25%;
    height: auto;
    margin: -17% auto 0;
    border-radius: 50%;
    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.561);
  }
}
/* xsmall */
@media (max-width: 600px) {
  .container {
    padding: 80px 10px 0 10px;
  }
  .profile_pic {
    width: 25%;
    height: auto;
    margin: -17% auto 0;
    border-radius: 50%;
    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.561);
  }
}

/* .profile_pic {
  width: 20%;
  height: auto;
  margin: 0% auto 0;
  border-radius: 50%;
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.561);
} */
.md-card-profile {
  margin-top: 30px;
  text-align: center;
}
.center-btn {
  text-align: center;
  margin-left: auto;
  margin-right: 50px;
}
.card-pref {
  width: 300px;
  height: 150px;
  margin: 20px;
  margin-top: 0px;
}
/* .card-pref {
  width: 300px;
  height: 200px;
  margin: auto;
  padding-top: 10px;
} */
/* .md-card-media img {
  height: 100px;
  width: auto;
} */
</style>
