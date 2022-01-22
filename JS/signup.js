const firebaseConfig = {
  apiKey: "AIzaSyBHdNR7I1ikWJALD99PpFjjGwRinZ96OLU",
  authDomain: "game-room-dca9f.firebaseapp.com",
  databaseURL: "https://game-room-dca9f-default-rtdb.firebaseio.com",
  projectId: "game-room-dca9f",
  storageBucket: "game-room-dca9f.appspot.com",
  messagingSenderId: "25450111935",
  appId: "1:25450111935:web:5350ab9a04d21ca0dbf70a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

function bota_data(){
  let r = document.getElementById("year")
  let now = new Date()
  let this_year = now.getFullYear()
  r.innerHTML = `${this_year}`
}

function show_pass(){
  let type = document.getElementById("signup_pass")
  let icon1 = document.querySelector("i#icon1")
  if (type.type == "password"){
    type.type = "text"
    icon1.removeAttribute("class")
    icon1.setAttribute("class", "fas fa-eye")
  }else{
    type.type = "password"
    icon1.removeAttribute("class")
    icon1.setAttribute("class", "fas fa-eye-slash")
  }
}

function show_pass2(){
  let type2 = document.getElementById("pass_confirmation")
  let icon2 = document.querySelector("i#icon2")
  if (type2.type == "password"){
    type2.type = "text"
    icon2.removeAttribute("class")
    icon2.setAttribute("class", "fas fa-eye")
  }else{
    type2.type = "password"
    icon2.removeAttribute("class")
    icon2.setAttribute("class", "fas fa-eye-slash")
  }
}
//CHeca se usuário já está logado
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    document.getElementById("message").style.display = "block"
    document.getElementById("signup_section").style.display = "none"
    setTimeout(function() {
      window.location.href = "index.html"
    }, 5000)
    const user = firebase.auth().currentUser;
    if(user != null){
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid
    }
    // ...
  } else {
    // User is signed out
    // ...
    document.getElementById("message").style.display = "none"
    document.getElementById("signup_section").style.display = "block"
  }
});

function signup(){
  let signName = document.getElementById("signup_name").value
  let signEmail = document.getElementById("signup_email").value
  let signPass = document.getElementById("signup_pass").value
  let signPassConfirm = document.getElementById("pass_confirmation").value
  let signCPF = document.getElementById("signup_cpf").value
  let signProf = document.getElementById("prof_pic").value
  let data_regist = new Date()
  let dia = String(data_regist.getDate())
  let mes = String(data_regist.getMonth() + 1)
  let ano = data_regist.getFullYear()
  let dataAtual = dia + '/' + mes + '/' + ano
  if(signPass == signPassConfirm && signName.length > 0 && signEmail.length > 0 && signPass.length > 0 && signPassConfirm.length > 0 && signCPF.length > 0 && signProf.length > 0){
    firebase.auth().createUserWithEmailAndPassword(signEmail, signPass)
    .then((userCredential) => {
      // Signed in
      window.alert("usuário cadastrado e logado com sucesso")
      var user = userCredential.user
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const user = firebase.auth().currentUser;
          if(user != null){
            const uid = user.uid
            var firebaseRef = firebase.database().ref(`user ${uid}`)
            firebaseRef.set({
              id: uid,
              name: signName,
              cpf: signCPF,
              fav_numb: 0,
              regist_date: dataAtual,
              prof_pic: signProf
            }
            )
          }
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(`Erro: ${errorMessage}`)
      // ..
    });
  }else{
    if(signPass != signPassConfirm){
      window.alert("Senha da confirmação está diferente da senha declarada")
    }else{
      if(signName.length == 0 || signEmail.length == 0 || signPass.length == 0 || signPassConfirm.length == 0 || signCPF.length == 0){
        window.alert("Erro: Preencha todos os campos corretamente.")
      }
    }
  }
  setTimeout(function() {
    window.location.href = "index.html"
  }, 5000)
}
