<template>
  <div id="app">
    <md-app class="md-fixed">
      <md-app-toolbar id="tb" class="md-dark md-dense" v-if="showToolbar">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <!-- button del menu che scompare su large screen -->
            <md-button class="md-icon-button" v-if="showmenu" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
            <!-- --------------------------------------------- -->
            <!-- logo -->
            <div v-if="!showmenu">
              <img class="toolbar_logo" src="./assets/R&M_logo.png" alt="logo">
            </div>
            <h3 class="md-title" v-if="showmenu">{{percorso}}</h3>
            <!-- --------------------------------------------- -->
          </div>
          <div class="md-toolbar-section-center">
            <div v-if="!showmenu">
              <md-button
                id="Dashboard"
                to="/Dashboard"
                :class="[togglePrimary() === 1? 'md-primary': '']"
              >Home</md-button>
              <!-- class="md-primary"  -->
              <md-button
                id="Personaggi"
                to="/Personaggi"
                :class="[togglePrimary() === 2? 'md-primary': '']"
              >Personaggi</md-button>
              <md-button
                id="Episodi"
                to="/Episodi"
                :class="[togglePrimary() === 3? 'md-primary': '']"
              >Episodi</md-button>
              <md-button
                id="Peronaggi"
                to="/Personaggi"
                :class="[togglePrimary() === 4? 'md-primary': '']"
              >Curiosità</md-button>
            </div>
          </div>
          <div class="md-toolbar-section-end">
            <md-button to="/Profilo" class="md-icon-button" v-if="!showmenu">
              <md-avatar>
                <img src="./assets/profile_pic_3.jpg" alt="#profile_pic">
              </md-avatar>
            </md-button>
          </div>
        </div>
      </md-app-toolbar>
      <!-- <md-app-toolbar class="md-primary">
        <span class="md-title">Rick & Morty Collection</span>
      </md-app-toolbar>-->
      <md-app-drawer :md-active.sync="menuVisible" v-if="authenticated">
        <md-toolbar class="md-transparent" md-elevation="0">Navigazione</md-toolbar>

        <md-list>
          <md-list-item to="/dashboard" @click="menuVisible = !menuVisible">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>

          <md-list-item to="/personaggi" @click="menuVisible = !menuVisible">
            <md-icon>group</md-icon>
            <span class="md-list-item-text">Personaggi</span>
          </md-list-item>

          <md-list-item to="/episodi" @click="menuVisible = !menuVisible">
            <md-icon>movie</md-icon>
            <span class="md-list-item-text">Episodi</span>
          </md-list-item>

          <md-list-item @click="menuVisible = !menuVisible">
            <!-- to="/curiosità" -->
            <md-icon>help</md-icon>
            <span class="md-list-item-text">Curiosità</span>
          </md-list-item>
          <br>
        </md-list>
        <md-divider></md-divider>
        <br>
        <md-list>
          <md-toolbar class="md-transparent" md-elevation="0">Personale</md-toolbar>
          <md-list-item to="/profilo" @click="menuVisible = !menuVisible">
            <md-icon>
              <img
                class="md-layout-item profile_pic"
                src="./assets/profile_pic_3.jpg"
                alt="#profile_pic"
              >
            </md-icon>
            <span class="md-list-item-text">Profilo</span>
          </md-list-item>

          <md-list-item @click="menuVisible = !menuVisible">
            <md-icon>favorite</md-icon>
            <span class="md-list-item-text">Preferiti</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import DataService from "./dataservice";
export default {
  name: "App",
  data: function() {
    return {
      authenticated: DataService.isAuthenticated(),
      menuVisible: false,
      showmenu: false,
      showToolbar: true,
      percorso: ""
    };
  },
  watch: {
    $route: function() {
      this.authenticated = DataService.isAuthenticated();
      if (
        this.$route.path === "/profilo" ||
        this.$route.path === "/dashboard" ||
        this.$route.path === "/personaggi" ||
        this.$route.path === "/episodi"
      ) {
        this.percorso =
          this.$route.path
            .slice(1)
            .charAt(0)
            .toUpperCase() + this.$route.path.slice(2);
      } else {
        this.percorso = "";
      }
      if (this.$route.path !== "/dashboard" && this.$route.path !== "/Login") {
        this.showToolbar = true;
      } else {
        this.showToolbar = false;
      }
    }
  },
  components: {},
  methods: {
    showMenu: function() {
      if (window.innerWidth < 1279) {
        this.showmenu = true;
      } else {
        this.showmenu = false;
      }
    },
    togglePrimary() {
      if (this.$route.path.includes("Dashboard")) {
        return 1;
      } else if (
        this.$route.path.includes("Personaggi") ||
        this.$route.path.includes("personaggio")
      ) {
        return 2;
      } else if (
        this.$route.path.includes("Episodi") ||
        this.$route.path.includes("episodio")
      ) {
        return 3;
      } else if (this.$route.path.includes("Personaggi")) {
        return 4;
      }
    }
  },
  mounted() {
    // Register an event listener when the Vue component is ready
    window.addEventListener("resize", this.showMenu);
  },
  created: function() {
    this.percorso =
      this.$route.path
        .slice(1)
        .charAt(0)
        .toUpperCase() + this.$route.path.slice(2);
    if (this.$route.path === "/dashboard" || this.$route.path === "/Login") {
      this.showToolbar = false;
    } else {
      this.showToolbar = true;
    }
  }
};
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    /* primary: md-get-palette-color(green, A200), // The primary color of your application
  accent: md-get-palette-color(pink, 500), // The accent or secondary color */
      /* accent: #88f257,
    primary: #24b0bf,*/ theme: dark
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
.md-app {
  max-height: 400px;
  border: 1px solid rgba(#000, 0.12);
  min-height: 100vh;
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
@media (max-width: 600px) {
  .md-display-1 {
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1;
  }
}
.profile_pic {
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  height: auto;
  border-radius: 50%;
}
.user_name {
  margin-left: auto;
  margin-right: auto;
  font-size: 2em;
}
.toolbar_logo {
  margin: 5px;
  width: 50%;
}
#app {
  scroll-behavior: smooth;
}
.md-toolbar-section-end,
.md-toolbar-section-start {
  display: flex;
  align-items: center;
  flex: 1;
}
@media (max-width: 600px) {
  .toolbar_logo {
    float: right;
  }
}
.md-app-content {
  padding: 0px !important;
}
</style>
