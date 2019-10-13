//firebase config object
var firebaseConfig = {
    apiKey: "AIzaSyAz6qAHwt5GHsRDIEpchfB1iqPy7og57AM",
    authDomain: "eatin-eatout.firebaseapp.com",
    databaseURL: "https://eatin-eatout.firebaseio.com",
    projectId: "eatin-eatout",
    storageBucket: "eatin-eatout.appspot.com",
    messagingSenderId: "447669395746",
    appId: "1:447669395746:web:931e5bf47bbecb4574457b",
    measurementId: "G-ZGZTN56T30"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.database();