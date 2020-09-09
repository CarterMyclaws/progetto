<template>
  <div class="page-container" id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary md-size-dense">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" v-if="showmenu" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-display-1">Rick & Morty</span>
          </div>

          <div class="md-toolbar-section-end md-layout-item md-size-50">
            <md-autocomplete
              class="searchbar"
              md-layout="box"
              v-model="selectedId"
              :md-options="searchOptions"
              @md-changed="search"
              @md-selected="select"
            >
              <label>Personaggio</label>
            </md-autocomplete>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full" :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
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
import Toolbar from "./components/Toolbar";
import Drawer from "./components/Drawer";
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  data: function() {
    return {
      selectedPokemon: null,
      searchOptions: [],
      selectedId: null,
      menuVisible: false,
      showmenu: false,
    };
  },
  components: {
    Toolbar,
    HelloWorld,
    Drawer
  },
  methods: {
    onResize(event) {
    console.log('window has been resized', event) 
    },
    showMenu: function() {
        if (window.innerWidth< 600) {
          this.showmenu = true;
        } else {
          this.showmenu = false;
        }
      },
      search: function(term) {
        this.searchOptions = DataService.searchPokemon(term);
        this.selectedId = DataService.searchId(term);
      },
      select: function(selected) {
        //if (selected === this.$route.params.name) return;
        this.$router.push({ path: "/character/" + selected });
      }
    },
    mounted() {
    // Register an event listener when the Vue component is ready
      window.addEventListener('resize', this.showMenu)
    }
};
</script>

<style lang="scss" scoped>
.searchbar {
  max-width: 200px;
}
.md-app {
  max-height: 400px;
  border: 1px solid rgba(#000, 0.12);
  min-height: 100vh;
}

.md-app-toolbar {
  /*   height: 100px;  */
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

@media (max-width: 600px) {
  //Manage Display Headers for Mobile Devices
  .md-display-1 {
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1;
  }
}
</style>
