//FAZ A CHAMADA DO JSON EXTERNO
var requestURL = 'https://iluminnatti.github.io/dataBD/db.json'
var request = new XMLHttpRequest()
request.open('GET', requestURL)
request.responseType = 'json'
request.send()
request.addEventListener("readystatechange", function () {
	if(request.readyState === 4 && request.status === 200){
		var answer = request.response
	}
})
//SLIDER DO TOPO DA BODY
let top_carousel = document.querySelector(".top_glider")
const t_carousel = new Glider(top_carousel, {
  slidesToShow: 3,
  SlidesToScroll: 1,
  draggable: true,
})
//CREATE
//READ
//UPDATE
//DELETE
