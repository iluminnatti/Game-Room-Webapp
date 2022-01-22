//FAZ A CHAMADA DO JSON EXTERNO
var requestURL = 'https://iluminnatti.github.io/dataBD/db.json'
var request = new XMLHttpRequest()
request.open('GET', requestURL)
request.responseType = 'json'
request.send()
request.addEventListener("readystatechange", function () {
	if(request.readyState === 4 && request.status === 200){
		var answer = request.response
		novidades(answer)
		destaques(answer)
	}
})
/*request.onload = function(){
	var answer = request.response
  teste(answer)
}*/
//INSERE OS ITENS DO OBJETO "NOVIDADES" NA PÁGINA
function novidades(data){
  var nov = document.getElementById("novidades")
	var nov_s = document.querySelector("div#nov_slider")
	var novidades = data['novidades']
	for(var i = 0; i < novidades.length; i++){
		var item_nov = document.createElement("div")
		item_nov.setAttribute("id", "item_novidades")
		var item_nov_link = document.createElement("a")
		item_nov_link.setAttribute("href", "#")
		var item_nov_img = document.createElement("img")
		item_nov_img.setAttribute("src", novidades[i]['capa'])
		item_nov_img.setAttribute("id", "item_novidades_imagem")
		var item_nov_name = document.createElement("p")
		item_nov_name.innerHTML = `<a href="#" style="color: black;">${novidades[i]['nome']}</a>`
		item_nov_name.setAttribute("id", "item_novidades_nome")
		var item_nov_price = document.createElement("span")
		item_nov_price.innerHTML = `<a href="#" style="color: #4F4F4F;">R$ ${novidades[i]['preço'].replace(".", ",")}</a>`
		item_nov_price.setAttribute("id", "item_novidades_preço")
		nov_s.appendChild(item_nov)
		item_nov.appendChild(item_nov_link)
		item_nov_link.appendChild(item_nov_img)
		item_nov.appendChild(item_nov_name)
		item_nov.appendChild(item_nov_price)
	}
}
//CRIA O SLIDER SIMPLESCARROUSEL
let simpleCarrousel = document.querySelector(".glider")
new Glider(simpleCarrousel, {
	slidesToShow: 2,
	slidesToScroll: 2,
	draggable: true,
})
//CRIA O SLIDER CAROUSEL_SEC
let carousel_sec = document.querySelector(".glider_secondary")
new Glider(carousel_sec, {
	slidesToShow: 2,
	slidesToScroll: 2,
	draggable: true,
})
//CRIA O SLIDER DEST
let offer_slider = document.querySelector(".offer")
const dest = new Glider(offer_slider, {
	slidesToShow: 1,
	SlidesToScroll: 1,
	duration: .5,
	arrows: {
		next: document.querySelector(".next")
	},
	rewind: true,
})
//FAZ O SLIDER DEST ROLAR AUTOMATICAMENTE
let autoplayDelay = 5000;

let autoplay = setInterval(() => {
    dest.scrollItem('next')
}, autoplayDelay);
//INSERE OS ITENS DO OBJETO 'DESTAQUES' NA PÁGINA
function destaques(data){
	var destaques = data['destaques']
	var dest = document.getElementById("destaques")
	var dest_s = document.querySelector("div#dest_slider")
	for(var x = 0; x < destaques.length; x++){
		var item_dest = document.createElement("div")
		item_dest.setAttribute("id", "item_destaques")
		var item_dest_link = document.createElement("a")
		item_dest_link.setAttribute("href", "#")
		var item_dest_img = document.createElement("img")
		item_dest_img.setAttribute("src", destaques[x]['capa'])
		item_dest_img.setAttribute("id", "item_destaques_imagem")
		var item_dest_name = document.createElement("p")
		item_dest_name.innerHTML = `${destaques[x]['nome']}`
		item_dest_name.style.color = "black"
		item_dest_name.setAttribute("id", "item_destaques_nome")
		var item_dest_price = document.createElement("span")
		item_dest_price.innerHTML = `R$ ${destaques[x]['preço'].replace(".", ",")}`
		item_dest_price.style.color = "#4F4F4F"
		item_dest_price.setAttribute("id", "item_destaques_preço")
		dest_s.appendChild(item_dest_link)
		item_dest_link.appendChild(item_dest)
		item_dest.appendChild(item_dest_img)
		item_dest.appendChild(item_dest_name)
		item_dest.appendChild(item_dest_price)
		/*dest_s.appendChild(item_dest)
		item_dest.appendChild(item_dest_link)
		item_dest_link.appendChild(item_dest_img)
		item_dest.appendChild(item_dest_name)
		item_dest.appendChild(item_dest_price)*/
	}
}
//VERIFICA SE USUÁRIO ESTÁ LOGADO E CRIA O BOTÃO COM A FOTO DO PERFIL DO USUÁRIO
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    document.getElementsByClassName("login_icon")[0].style.display = "none"
    document.getElementsByClassName("login_icon")[1].style.display = "none"
		let profile_menu = document.getElementById("profile_menu")
		let profile_pic = document.getElementById("profile_pic")
		let prof_text = document.getElementById("prof_text")
		let screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if(screen_width > 460){
			profile_menu.style.display = "inline-block"
		}
		const user = firebase.auth().currentUser;
		if(user != null){
			const uid = user.uid
			var firebaseRef = firebase.database().ref(`user ${uid}`)
			firebaseRef.once("value", function(snapshot){
				let data = snapshot.val()
				let img_prof = document.createElement("img")
				img_prof.setAttribute("src", data['prof_pic'])
				img_prof.setAttribute("id", "profile_picture")
				profile_pic.appendChild(img_prof)
				let name_prof = document.createElement("p")
				let desc_prof = document.createElement("span")
				name_prof.innerText = `${data['name']}`
				desc_prof.innerText = `${data['fav_numb']} Favoritos`
				prof_text.appendChild(name_prof)
				prof_text.appendChild(desc_prof)

			})
		}


  } else {
    // User is signed out
    // ...

  }
});
//FUNÇÃO QUE CONTROLA O DARK THEME
/*function dark_theme(){
outra hora eu resolvo
	let dt_check = document.querySelector("input#dark_theme_check")
	let item_dest_name = document.querySelectorAll("p#item_destaques_nome")
	let item_dest_preco = document.querySelectorAll("p#item_destaques_preço")
	document.body.classList.toggle("dark")
	for(var i = 0; i < item_dest_name.length; i++){
		item_dest_name[i].style.color = "white"
	}
	for(var x = 0; x < item_dest_preco; x++){
		item_dest_preco[i].style.color = "#DCDCDC"
	}
}*/
//FUNÇÃO QUE CONTROLA A ROLAGEM DO MENU LATERAL(SÓ FUNCIONA COM ESSA FUNÇÃO)
