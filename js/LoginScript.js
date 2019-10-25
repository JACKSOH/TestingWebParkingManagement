

  
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    if(window.location.href === "dashboard.html"){
      window.location.href= "dashboard.html";
   }
      
   
   
    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      alert(email_id);
      document.getElementById("welcome").innerHTML = "You are using " + email_id;

    }

  } else {
    // No user is signed in.
   
    if(window.location.href === "stafflogin.html"){
      window.location.href= "stafflogin.html";
   }
   

  }
});

function login(){

  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}
