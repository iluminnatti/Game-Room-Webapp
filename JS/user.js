//RESETA AS MODIFICAÇÕES QUE A PUXADA DO MENU LATERAL FAZ NO BODY  (EVITA E CONSERTA ERROS)
function resetar(){
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
			container.style.background = "#253541"
		}
	}
}
function checked(){
	let check  = document.getElementById("check")
	let cancel = document.getElementById("cancel")
	let menu_box = document.getElementById("menu-box")
	let container = document.getElementById("container-menu")
	let screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	check.onclick = function(){
		menu_box.style.left = "0px"
		menu_box.style.transition = "background .2 linear"
		if(screen_width <= 460){
			container.style.background = "#253541"
		}
	}
	cancel.onclick = function(){
		menu_box.style.left = "-360px"
		menu_box.style.transition = "background .2 linear"
		if(screen_width <= 460){
			container.style.background = "#253541"
		}
	}
}
function show_pass(){
  let type = document.getElementById("old_pass")
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
  let type2 = document.getElementById("new_pass")
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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    document.getElementsByClassName("login_icon")[0].style.display = "none"
    document.getElementsByClassName("login_icon")[1].style.display = "none"
		//let profile_menu = document.getElementById("profile_menu")
		let img_user_top = document.getElementById("img_user_top")
		let name_user_top = document.getElementById("name_user_top")
		const user = firebase.auth().currentUser;
		if(user != null){
			const uid = user.uid
			var firebaseRef = firebase.database().ref(`user ${uid}`)
			firebaseRef.once("value", function(snapshot){
				let data = snapshot.val()
				let img_user = document.createElement("img")
				img_user.setAttribute("src", data['prof_pic'])
				img_user.setAttribute("id", "img_user")
				img_user_top.appendChild(img_user)
				name_user_top.innerText = `${data['name']}`
        let fav_numb = document.getElementById("fav_qtd")
        fav_numb.innerHTML = `<h3>Favoritos</h3>${data['fav_numb']}`
        let data_cad = data['regist_date']
				let data_split = data_cad.split('/')
				let cad_day = data_split[0]
				let cad_month = data_split[1]
				let cad_year = data_split[2]
				let cadastro_date = new Date(cad_year, cad_month - 1, cad_day)
				let hoje = new Date()
				const diff = Math.abs(cadastro_date.getTime() - hoje.getTime())
				const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
				let days_here = document.getElementById("days_here")
				days_here.innerHTML = `<h3>Dias Aqui</h3>${days} dia(s)`
        // let desc_prof = document.createElement("span")

			})
		}


  } else {
    // User is signed out
    // ...

  }
});

function popup(){
	document.getElementById("update_account_section").style.visibility = "visible"
	document.getElementById("update_account_section").style.opacity = "1"
	document.getElementById("update_account_section").style.transition = "opacity .2s linear"
}
function fechar(){
	document.getElementById("update_account_section").style.opacity = "0"
	document.getElementById("update_account_section").style.transition = "opacity .2s linear"
	setTimeout(function() {
		document.getElementById("update_account_section").style.visibility = "hidden"
	}, 200)
}
function update(){
	firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;

		let new_name = document.getElementById("new_name").value
		let new_pass = document.getElementById("new_pass").value
		let old_pass = document.getElementById("old_pass").value
		let new_cpf = document.getElementById("new_cpf").value
		let new_prof_pic = document.getElementById("new_prof_pic").value
		let updates = {};
		function reautenticar(old_pass){
			const user = firebase.auth().currentUser;
			const credential = firebase.auth.EmailAuthProvider.credential(
			 user.email,
			 old_pass
		 );
		 return user.reauthenticateWithCredential(credential)
		}
		if(new_name.length != 0){
		  updates[`user ${uid}/name`] = new_name;
			if(new_cpf.length != 0){
				updates[`user ${uid}/cpf`] = new_cpf;
				 if(new_pass.length != 0){
					 reautenticar(old_pass).then(() => {
			 		  // User re-authenticated.
			 			// window.alert("usuário reautenticado")
						user.updatePassword(new_pass).then(() => {
 					 // Update successful.
 					 window.alert("senha alterada com sucesso")
 					 }).catch((error) => {
 						 window.alert(`Erro: ${error}`)
 						// An error ocurred
 						// ...
 					 });
			 		}).catch((error) => {
			 		  // An error ocurred
			 			window.alert(error)
			 		  // ...
			 		});
					 if(new_prof_pic.length != 0){
						 updates[`user ${uid}/prof_pic`] = new_prof_pic;
					 }
				 }else{

				 }
			}else{
				if(new_pass.length != 0){
					reautenticar(old_pass).then(() => {
					  // User re-authenticated.
						// window.alert("usuário reautenticado")
						user.updatePassword(new_pass).then(() => {
 					 // Update successful.
 					 window.alert("senha alterada com sucesso")
 					 }).catch((error) => {
 						 window.alert(`Erro: ${error}`)
 						// An error ocurred
 						// ...
 					 });
					}).catch((error) => {
					  // An error ocurred
						window.alert(error)
					  // ...
					});
					if(new_prof_pic.length != 0){
						updates[`user ${uid}/prof_pic`] = new_prof_pic;
					}
				}else{
					if(new_prof_pic.length != 0){
						updates[`user ${uid}/prof_pic`] = new_prof_pic;
					}
				}
			}
		}else{
			if(new_cpf.length != 0){
					updates[`user ${uid}/cpf`] = new_cpf;
				 if(new_pass.length != 0){
					 reautenticar(old_pass).then(() => {
			 		  // User re-authenticated.
			 			// window.alert("usuário reautenticado")
						user.updatePassword(new_pass).then(() => {
 					 // Update successful.
 					 window.alert("senha alterada com sucesso")
 					 }).catch((error) => {
 						 window.alert(`Erro: ${error}`)
 						// An error ocurred
 						// ...
 					 });
			 		}).catch((error) => {
			 		  // An error ocurred
			 			window.alert(error)
			 		  // ...
			 		});
					 if(new_prof_pic.length != 0){
						 updates[`user ${uid}/prof_pic`] = new_prof_pic;
					 }
				 }else{
							 }
			}else{
				if(new_pass.length != 0){
					reautenticar(old_pass).then(() => {
					  // User re-authenticated.
						// window.alert("usuário reautenticado")
						user.updatePassword(new_pass).then(() => {
 					 // Update successful.
 					 window.alert("senha alterada com sucesso")
 					 }).catch((error) => {
 						 window.alert(`Erro: ${error}`)
 						// An error ocurred
 						// ...
 					 });
					}).catch((error) => {
					  // An error ocurred
						window.alert(error)
					  // ...
					});
					if(new_prof_pic.length != 0){
						updates[`user ${uid}/prof_pic`] = new_prof_pic;
					}
				}else{
					if(new_prof_pic.length != 0){
						updates[`user ${uid}/prof_pic`] = new_prof_pic;
					}
				}
			}
		}
		return firebase.database().ref().update(updates);
    // ...
  } else {
    // User is signed out
    // ...
  }
});
fechar()
setTimeout(function() {
	new_name.value = ""
	new_pass.value = ""
	new_cpf.value = ""
	new_prof_pic.value = ""
}, 1000)
}
