const firebaseConfig = {
  apiKey: "AIzaSyBHdNR7I1ikWJALD99PpFjjGwRinZ96OLU",
  authDomain: "game-room-dca9f.firebaseapp.com",
  projectId: "game-room-dca9f",
  storageBucket: "game-room-dca9f.appspot.com",
  messagingSenderId: "25450111935",
  appId: "1:25450111935:web:5350ab9a04d21ca0dbf70a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function show_pass(){
  let type = document.getElementById("login_pass")
  let icon = document.querySelector("i#icon")
  if (type.type == "password"){
    type.type = "text"
    icon.removeAttribute("class")
    icon.setAttribute("class", "fas fa-eye")
  }else{
    type.type = "password"
    icon.removeAttribute("class")
    icon.setAttribute("class", "fas fa-eye-slash")
  }
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    document.getElementById("logout_btn").style.display = "block"
    document.getElementById("login_section").style.display = "none"
    document.getElementById("login_message").style.display = "block"
    const user = firebase.auth().currentUser;
    if(user != null){
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
    }
    // ...
  } else {
    // User is signed out
    // ...
    document.getElementById("logout_btn").style.display = "none"
    document.getElementById("login_section").style.display = "block"
  }
});

function login(){
  let userEmail = document.getElementById("login_email").value
  let userPass = document.getElementById("login_pass").value
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location.href = "index.html"
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(`Error: ${errorMessage}`)
  });
}
function logout(){
  firebase.auth().signOut().then(() => {
    document.getElementById("login_pass").value = ""
    window.alert("usuário desconectado com sucesso")
  // Sign-out successful.
  }).catch((error) => {
    window.alert("Erro ao desconectar usuário")
    // An error happened.
  });
}
