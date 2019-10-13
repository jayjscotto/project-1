//firebase config object
var firebaseConfig = {
    apiKey: "AIzaSyAz6qAHwt5GHsRDIEpchfB1iqPy7og57AM",
    authDomain: "eatin-eatout.firebaseapp.com",
    databaseURL: "https://eatin-eatout.firebaseio.com",
    projectId: "eatin-eatout",
    //storageBucket: "eatin-eatout.appspot.com",
    //messagingSenderId: "447669395746",
    appId: "1:447669395746:web:931e5bf47bbecb4574457b",
    measurementId: "G-ZGZTN56T30"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //make auth and firestore references
    //db firestore init
    const db = firebase.firestore();
    //auth init
    const auth = firebase.auth();

  const signupForm  = $("#signup-form");

  //signup form submit event listener
  signupForm.on("submit", function(e) {
    e.preventDefault();

    //get value of input fields
    const email = $("#email-signup").val();
    const password = $("#password-signup").val();

    auth.createUserWithEmailAndPassword(email, password).then(function(credential) {
        //log user cred from firebase
        console.log(credential.user);
        //grab modal
        const signUpModal = $("#signUpModalCenter")

        //close and reset the modal
        signUpModal.modal('hide');
        $("#signup-form")[0].reset();
      
    });
  })



//   const loginForm = $("#loginForm")
//   //login form submit event listener
//   loginForm.on("submit", function(e) {
//     e.preventDefault();

//     //get value of input fields
//     const email = $("#email-signup").val();
//     const password = $("#password-signup").val();
//     console.log(email, password);



//   })

