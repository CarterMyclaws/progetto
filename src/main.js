import Vue from "vue";
import App from "./App.vue";
//integriamo le librerie necessarie
import VueMaterial from "vue-material";
import VueRouter from "vue-router";
import DataService from "./dataservice";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "vue-material/dist/theme/default-dark.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Episodio from "./pages/Episodio";
import Personaggio from "./pages/Personaggio";
import Episodi from "./pages/Episodi";
import Personaggi from "./pages/Personaggi";
import Profilo from "./pages/Profilo";

/* ************************Personalizzazzione************************ */

/* ************************Personalizzazzione************************ */

//istruiamo Vue ad utilizzare le librerie importate
Vue.use(VueMaterial);
Vue.use(VueRouter);

Vue.config.productionTip = false;

//Vue-router prevede che ci sia un oggetto 'router'
//è inizialmente vuoto e viene popolato successivamente
const router = new VueRouter({
  mode: "history",
  /* dobbiamo importare in questa pagina anche Login se no il seguente comando da errore (Login not defined) */
  routes: [
    /* la prima rotta ad esempio punta al percorso Login utilizzando il componente Login*/
    { name: "Login", path: "/login", component: Login },
    { name: "Dashboard", path: "/dashboard", component: Dashboard },
    { name: "Episodio", path: "/episodio/:id", component: Episodio },
    { name: "Personaggio", path: "/personaggio/:id", component: Personaggio },
    { name: "Episodi", path: "/episodi", component: Episodi },
    { name: "Personaggi", path: "/personaggi", component: Personaggi },
    { name: "Profilo", path: "/profilo", component: Profilo },
    { path: "/", redirect: "/dashboard" }
  ]
});

/* Quest serve a fare le cose prima che tutto accada, quindi nel nostro caso far partire subito il controllo del login */
router.beforeEach((to, from, next) => {
  /* dobbiamo verificare che l'utente abbia fatto il login quando tenta di accedere a qualsiasi pagina diversa da login, quindi se andiamo su login non serve controllare, se è un'altra pagina allora si - to.name serve per controllare se il nome della 'rotta' è Login quindi appunto se siamo su quella pagina - mentre per && capire se l'utente è loggato chiamiamo il metodo isAuthenticated di dataservice MA DOBBIAMO IMPORTARLO SE VOGLIAMO USARNE UN METODO*/
  if (to.name !== "Login" && !DataService.isAuthenticated()) {
    /* quindi se utente non è loggato (successivamente) 'next' bisogna farlo andare ad una pagina che si chiama 'Login'- MA ATTENZIONE - bisogna anche dichiarare questa pagina nella const routes !!!!!!!!!!!*/
    next({ name: "Login" });
  } else {
    //qui significa altrimenti default
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
