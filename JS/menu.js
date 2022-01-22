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

function checado(){
	let check  = document.getElementById("check")
	let cancel = document.getElementById("cancel")
	let menu_box = document.getElementById("menu-box")
	let container = document.getElementById("container-menu")
	let screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	check.onclick = function(){
		menu_box.style.left = "0px"
		document.body.style.background = "rgba(0, 0, 0, 0.3)"
		document.body.style.transition = "background .2 linear"
		if(screen_width <= 460){
			container.style.background = "rgba(0, 0, 0, 0)"
		}
	}
	cancel.onclick = function(){
		menu_box.style.left = "-360px"
		document.body.style.background = "rgba(0, 0, 0, 0)"
		document.body.style.transition = "background .2 linear"
		if(screen_width <= 460){
			container.style.background = "white"
		}
	}
}
//RESETA AS MODIFICAÇÕES QUE A PUXADA DO MENU LATERAL FAZ NO BODY  (EVITA E CONSERTA ERROS)
function reset(){
	let screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	let menu_box = document.getElementById("menu-box")
	let container = document.getElementById("container-menu")
	if(screen_width > 1000){
		document.body.style.background = "rgba(0, 0, 0, 0)"
		menu_box.style.left = "-360px"
	}
	if(screen_width > 460){
		container.style.background = "#003F5D"
	}else{
		if(screen_width <= 460){
			container.style.background = "rgba(0, 0, 0, 0)"
		}
	}
}
//IDENTIFICA HORA DO SISTEMA PARA CUMPRIMENTAR COM BOM DIA/TARDE/NOITE
function greet(){
	let greet = document.getElementById("hi")
	let date = new Date()
	let hour = date.getHours()
	if(hour >= 0 && hour < 12){
		greet.innerHTML = `Bom Dia. Faça Login`
	}else{
		if(hour >= 12 && hour < 18){
			greet.innerHTML = `Boa Tarde. Faça Login`
		}else{
			if(hour >= 18 && hour <= 23){
				greet.innerHTML = `Boa Noite. Faça Login`
			}
		}
	}
	//bota o ano na footer conforme a data da internet
	let r = document.getElementById("year")
	let now = new Date()
	let this_year = now.getFullYear()
	r.innerHTML = `${this_year}`
}

function logout(){
  firebase.auth().signOut().then(() => {
    window.location.href = "signin.html"
  // Sign-out successful.
  }).catch((error) => {
    window.alert("Erro ao desconectar usuário")
    // An error happened.
  });
}
