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

//signup sign in and log out
const signupForm  = $("#signup-form");
const logOut = $("#logout");
const loginForm = $("#loginForm");

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
    }).catch(function(err){
        console.log(err.message);
        $("#signup-error").text("Password must be at least six (6) characters long");
    });
})

//logout method
logOut.on("click", function(e){
    e.preventDefault();
    auth.signOut();
})

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
        $("#loginForm")[0].reset();
    }).catch(function(err) {
        console.log(err.message);
        $("#login-error").text('Incorrect username or password');
        $("#loginForm")[0].reset();
    })
})

//listening to auth status changes
auth.onAuthStateChanged(function(user) {
    if (user) {
        //recipe favs
        db.collection("recipe-favorites").onSnapshot(function(snapshot) {
            $("#recipe-favorites").empty();
            recipeSetUp(snapshot.docs);
        })
        
        //restaurant faves
        db.collection("restaurant-favorites").onSnapshot(function(snapshot) {
            $("#restaurant-favorites").empty();
            restaurantSetUp(snapshot.docs);
        })

        //set UI
        setUI(user);

    } else {
        $("#recipe-favorites").empty();
        $("#restaurant-favorites").empty();
        setUI();
        recipeSetUp([]);
        restaurantSetUp([]);
    }
})


//set up restaurant favorites
function restaurantSetUp(data) {
    if(data.length) {
        $(".logInReq").hide();
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
        })
    } else {
        console.log(`Log in to see your favorites`);
    }
}

//set up recipe favorites
function recipeSetUp(data) {
    if(data.length) {
        $(".logInReq").hide();
        data.forEach(doc => {
            //search favorite obj is each object from restaurant collection
            const searchFav = doc.data();
            const name = searchFav.name;
            //button for each favorite
            let button = $("<button>");
            button.text(name);
            button.attr("class", "btn btn-outline-success text-center font-weight-bold mx-4 my-4 text-dark");
            //on click function for ajax call
            button.on("click", function() {
                recipeSearch(name);
            })
            $("#recipe-favorites").append(button);
        })
    } else {
        console.log(`Log in to see your favorites`);
    }
}


//add to recipe favorites function
function addRecipeFavorite(fav) {
    db.collection("recipe-favorites").add({name: fav}).then(function(){
        console.log(`${fav} added to recipes`);
    }).catch(function(err){
        console.log(err.message);
    });
}

//add to restaurant favorites function
function addRestaurantFavorite(fav) {
    db.collection("restaurant-favorites").add({city: fav}).then(function(){
        console.log(`${fav} added to restaurants`);
    }).catch(function(err){
        console.log(err.message);
    });
};

