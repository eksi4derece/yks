var kitaplik = document.getElementById("kitaplik");
var goruntuleyici = document.getElementById("goruntuleyici");
var bilgi = document.getElementById("bilgi");
var pdf = document.getElementById("pdf");
var sayfalar = document.getElementById("sayfalar");
var pageloader = 0;
var sayfa = 0;
var dirname = "";

function viewbook(file_name) {
	var kitap = document.getElementById(file_name);
	sayfa = kitap.getAttribute("data-pages");
	var boyut = kitap.getAttribute("data-size");
	dirname = file_name.split(".pdf")[0];
	bilgi.innerHTML = sayfa + " sayfa / " + boyut;
	pdf.href = "./kutuphane/" + dirname + "/" + file_name;
	sayfalar.innerHTML = "";
	kitaplik.style.display = "none";
	goruntuleyici.style.display = "block";
	pageloader = 1;
	loadpages();
}

function loadpages() {
	for (var i=0;pageloader<=sayfa && i<20;pageloader++,i++){
		sayfalar.innerHTML += `<img class="item" style="width: 100%;" src="./kutuphane/${dirname}/page_${pageloader.toString().padStart(4,"0")}.webp">`
	}
}

function kapat(){
	pageloader = 0;
	sayfa = 0;
	dirname = "";
	goruntuleyici.style.display = "none";
	kitaplik.style.display = "grid";
}

async function loadbooks(){
	let promise = new Promise(function (resolve) {
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "./kutuphane/kitaplar.json");
	xhttp.onload = function () {
		if (xhttp.status != 200) resolve("ERRORR");
		else resolve(xhttp.responseText);
	}
	xhttp.send();
	});
	let books_pt = await promise;
    books_pt = JSON.parse(books_pt);
	for (var book of books_pt) {
		kitaplik.innerHTML += '<button class="item" onclick="viewbook(\'' + book.file_name + '\')" id="' + book.file_name + '" data-pages="' + book.pages + '" data-size="' + book.size + '">' + book.file_name + "</button>";
	}
}

window.addEventListener('scroll', function() {
	// Get the height of the document
	const documentHeight = document.documentElement.scrollHeight;
	
	// Get the height of the viewport
	const viewportHeight = window.innerHeight;
	
	// Get the current scroll position
	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	
	// Check if the user has scrolled to the bottom
	if (pageloader && scrollTop + viewportHeight >= documentHeight - 5000) {
		console.log("geldik")
		loadpages();
	}
});


loadbooks()