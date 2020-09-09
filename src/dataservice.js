/* QUESTA MODALITÀ DI GESTIONE DEL LOGIN È GROSSOLANA E UTILE SOLO A SCOPO DI MOCKUP, IN UNA SITUAZIONE REALISTICA NON ANDREBBE BENE */
import axios from "axios";
import firebase from "@firebase/app";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6165Y5tRdwsr_cU-EhWL--0fqXbdDmF0",
  authDomain: "rick-and-morty-5bffc.firebaseapp.com",
  databaseURL: "https://rick-and-morty-5bffc.firebaseio.com",
  projectId: "rick-and-morty-5bffc",
  storageBucket: "rick-and-morty-5bffc.appspot.com",
  messagingSenderId: "244352340884",
  appId: "1:244352340884:web:a2a511b056c9f948c73581"
};

!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();

var db = firebase.firestore();

var user = localStorage.getItem("username");

var utentiRef = db.collection("Utenti");
var query = utentiRef.where("username", "==", user);

export default {
  whoIsAuthenticated() {
    /* getItem quindi va a leggere localStorage e vedere cosa c'è dentro e ritorna 'true' se è presente qualcosa - '!!' davanti serve a convertire la stringa false in 0 e true in 1*/
    return localStorage.getItem("username");
  },
  /* metodo che restituisce true or false se l'utente è loggato o meno e utilizza la cash del browser quindi finchè questa non viene cancellata, l'utente rimane loggato. Questo "mini-database" si chiama 'localstorage' */
  isAuthenticated() {
    /* getItem quindi va a leggere localStorage e vedere cosa c'è dentro e ritorna 'true' se è presente qualcosa - '!!' davanti serve a convertire la stringa false in 0 e true in 1*/
    return !!localStorage.getItem("username");
  },
  //funzione che prende il termine passato e lo inserisce come username
  login(username) {
    // quindi in localstorage verrà settato ad esempio 'username:Giacomo'
    localStorage.setItem("username", username);
    /* this.storedUsername(username); */
  },
  /* il logout nel mio caso andrà posizionato nel menù a tendina a destra di fianco all'immaginina del profilo - dovrà rimandare poi direttamente alla pagina di login */
  logout() {
    localStorage.removeItem("username");
  },
  getPersonaggi(offset) {
    /* return[
        {id:"1", name: "Rick Sanchez", status: "Alive", image:"https://rickandmortyapi.com/api/character/avatar/1.jpeg"},
        {id:"2", name: "Morty Smith", status: "Alive", image:"https://rickandmortyapi.com/api/character/avatar/2.jpeg"},
        {id:"3", name: "Summer Smith", status: "Dead", image:"https://rickandmortyapi.com/api/character/avatar/3.jpeg"},
        {id:"4", name: "Summer Smith", status: "Dead", image:"https://rickandmortyapi.com/api/character/avatar/3.jpeg"},
        {id:"5", name: "Summer Smith", status: "Dead", image:"https://rickandmortyapi.com/api/character/avatar/3.jpeg"},
        {id:"6", name: "Summer Smith", status: "Dead", image:"https://rickandmortyapi.com/api/character/avatar/3.jpeg"},
        {id:"7", name: "Summer Smith", status: "Dead", image:"https://rickandmortyapi.com/api/character/avatar/3.jpeg"} 
      ];*/

    /* non possiamo restrituire direttamente da questo metodo e quindi dobbiamo usare una promise di axios */
    return axios.get(
      "https://rickandmortyapi.com/api/character/?page=" + offset
    );
  },
  getPersonaggioById(id) {
    /*     return this.getPersonaggi().filter(p => p.id === id)[0];*/

    return axios.get("https://rickandmortyapi.com/api/character/" + id);
  },
  /* attenzione!!!! getEpisodi da soltanto i primi 20 episodi per il discorso della paginazione di merda */
  getEpisodi() {
    return axios.get("https://rickandmortyapi.com/api/episode/");
  },
  getEpisodioById(id) {
    return axios.get("https://rickandmortyapi.com/api/episode/" + id);
  },
  getEpisodiWithPage(page) {
    return axios.get("https://rickandmortyapi.com/api/episode?page=" + page);
  },
  getPages() {
    return axios.get("https://rickandmortyapi.com/api/episode").then((data) => {
      return data.data.info.pages;
    });
  },
  prefMedia(nome) {
    return axios
      .get("https://rickandmortyapi.com/api/character/?page=1")
      .then((data) => {
        return data.data.results;
      });
  },
  /*  getWiki() {
    return axios({
      url: "/jsonp"
    })
      .get(
        "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&format=json&search=Rick_and_Morty"
      )
      .then((data) => {
        console.log(data);
      });
  }, */
  //Questa serviva per far si che venisse messo nel database il nuovo utente appena avesse fatto il login,
  //ma in realtà alla fine ho optato per inserire utente e personaggio likato insieme e creare un sacco di singoli file
  //con questi due campi
  /* storedUsername(name) {
    return db
      .collection("Utenti")
      .where("username", "==", name)
      .get()
      .then(data => {
        console.log(data.docs.length);
        console.log("pre-if");
        if (data.docs.length === 0) {
          console.log("post-if");
          this.setUsername(name);
        } else {
          console.log("già presente");
        }
      });
  }, */
  // qui si carica l'utente
  /* setUsername(name) {
    return db
      .collection("Utenti")
      .doc()
      .set({
        username: name
      });
  }, */
  getLikes(name) {
    return db
      .collection("Utenti")
      .where("username", "==", name)
      .get()
      .then(function (data) {
        if (data.size >= 1) {
          var pref = [];
          data.forEach(function (doc) {
            pref.push(doc.data().personaggio);
          });
        }
        return pref;
      })
      .catch(function (error) {
        console.log("Errore: ", error);
      });
  },
  setLike(name, p) {
    return db.collection("Utenti").doc().set({
      username: name,
      personaggio: p
    });
  },
  removeLike(doc) {
    /* qui viene passato un oggetto e non sono riuscito a fare di meglio quindi la variabile a ne prende il valore
    che è una stringa, altrimenti ERRORE: non si può passare un oggetto a .doc() */
    var a = Object.values(doc)[0];
    return db.collection("Utenti").doc(a).delete();
  },
  getDocs(name) {
    return (
      db
        .collection("Utenti")
        /* .where("personaggio", "==", p) */
        .where("username", "==", name)
        .get()
        .then((data) => {
          return data.docs.map((doc) => doc.Vd.key.path.segments[6]);
        })
    );
  }
};

/* 
var votiCollection = db.collection("Utenti");
var query = votiCollection.where("user", "==", user).where("pokemon", "==", data.name); 



findIdDoc(name, p) {
    return db
      .collection("Utenti")
      .where("username", "==", name)
      .where("personaggio", "==", p)
      .get()
      .then(function(data) {
        if (data.size >= 1) {
          var idDoc = "ciao";
          data.forEach(function(doc) {
            console.log("doc.id= " + doc.id);
            console.log("doc.id è di tipo= " + typeof doc.id);
            idDoc = doc.id;
          });
          console.log("l'ultimo idDoc è = " + idDoc);
          return idDoc;
        }
      });
  }


*/
