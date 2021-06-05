import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC85seUCNnjjTpNT4cm05xuRFDPMY_tU6Q",
    authDomain: "cadastrosimples-530da.firebaseapp.com",
    databaseURL: "https://cadastrosimples-530da-default-rtdb.firebaseio.com",
    projectId: "cadastrosimples-530da",
    storageBucket: "cadastrosimples-530da.appspot.com",
    messagingSenderId: "446550246455",
    appId: "1:446550246455:web:0b5b316f1a5349eccfabb2"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const cadastrosDB = firebaseApp.database().ref("cadastros");