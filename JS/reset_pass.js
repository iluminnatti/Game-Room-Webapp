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

const auth = firebase.auth()
function send_resetpass_email(){
  const email = document.getElementById("email_for_reset").value
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    window.alert("Email de redefinição de senha enviado com sucesso")
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(`Erro: ${errorMessage}`)
    // ..
  });
}
