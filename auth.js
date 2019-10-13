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

//signup
const signupForm  = $("#signup-form");

//signup method
signupForm.on("submit", function(e) {
    e.preventDefault();

    //get value of signup input fields
    const email = $("#email-signup").val();
    const password = $("#password-signup").val();

    //auth method to create account in firebase
    auth.createUserWithEmailAndPassword(email, password).then(function(credential) {
        //grab modal
        const signUpModal = $("#signUpModalCenter")

        //close and reset the modal
        signUpModal.modal('hide');
        $("#signup-form")[0].reset();
    });
})


const logOut = $("#logout");

//logout method
logOut.on("click", function(e){
    e.preventDefault();
    auth.signOut();
})

//login method
const loginForm = $("#loginForm")
//login form submit event listener
loginForm.on("submit", function(e) {
    e.preventDefault();

    //get value of user login input fields
    const email = $("#email-login").val();
    const password = $("#password-login").val();

    auth.signInWithEmailAndPassword(email, password).then(function(credential) {
        //close modal and reset form
        const logInModal = $("#logInModalCenter");
        logInModal.modal('hide');
        $("#loginForm").reset();
    })

})

//listening to auth status changes
auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log("user logged in", user);
    } else {
        console.log("user logged out");
    }
})

db.collection("recipe-favorites").get().then(function(snapshot) {
    console.log(snapshot.docs)
})

db.collection("restaurant-favorites").get().then(function(snapshot) {
    restaurantSetUp(snapshot.docs);
})

//set up restaurant favorites
function restaurantSetUp(data) {
    data.forEach(doc => {
        //search favorite obj is each object from restaurant collection
        const searchFav = doc.data();

        //button for each favorite
        let button = $("<button>");
        button.text(searchFav.city);
        button.attr("class", "btn btn-outline-success text-center font-weight-bold mx-4 my-4 text-dark");
        
        //on click for ajax call
        button.on("click", function() {
            restaurantSearch(searchFav.city);
        })

        //add button to favorites section
        $("#restaurant-favorites").append(button)

        console.log(searchFav.city);
     })
}

function recipeSetUp(data) {
    data.forEach(doc => {
        //search favorite obj is each object from restaurant collection
        const searchFav = doc.data();

        //button for each favorite
        let button = $("<button>");
        button.text(searchFav.city);
        button.attr("class", "btn btn-outline-success text-center font-weight-bold mx-4 my-4 text-dark");
        //on click function for ajax call
        button.on("click", function() {
            recipeSearch(searchFav.city);
        })

        $("#restaurant-favorites").append(button);
     })
}