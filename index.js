var currentMusicName;
var currentMusic; // default music
var jsonMusic; // musics from JSON
let all_title=[];// all song title from backend

/*Load Musics from Backend*/
function GetMusicFromJSON(){
	fetch("http://158.108.182.8:3002/melody/list",{
        method: "GET",
        headers: {
			//"Access-Control-Allow-Origin": "*",
			//"Access-Control-Allow-Methods": "*",
			//"Access-Control-Allow-Credentials": true,
			"Content-Type": "application/json"},
    })
		.then(response => response.json())
		.then(response => response.result)
		.then((datas) => {
			jsonMusic = datas;
			console.log(jsonMusic);
			datas.forEach((data) => {
			console.log(data.name);
			all_title.push(data.name);
			var arr = data.notes;
			arr.forEach((data) => { // get single note from array
				console.log(data);
			});
			var doc =  document.getElementById("myDropdown");
			var newMusic = document.createElement("a");
			newMusic.classList.add('dropdown-item');
			newMusic.href = '#';
			newMusic.draggable = false;
			newMusic.innerHTML = data.name;
			doc.appendChild(newMusic);
			if(data.name == 'Default'){ // Choose default music
				currentMusic = data.notes;
				document.getElementById("musicNotes").innerHTML = currentMusic.join(" ");
			}
		  });
        });
}

/*Load Count from Backend*/
function GetCount(){
	fetch("http://158.108.182.8:3002/count",{
        method: "GET",
        headers: {
			//"Access-Control-Allow-Origin": "*",
			//"Access-Control-Allow-Methods": "*",
			//"Access-Control-Allow-Credentials": true,
			"Content-Type": "application/json"},
    })
		.then(response => response.json())
		.then(data => {
			var total = data.count;
			var reportText = document.getElementById('countReport');
			reportText.innerHTML = 'Total Hand Washed: '+'<span style="color: #8CEF74;font-weight:bold;font-size:120%;">'+total+'</span>';
		});
}

/*Title Wave Effect*/
function AnimateText(){
	// Wrap every letter in a span
	var textWrapper = document.querySelector('.anim1 .letters');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
	anime.timeline({loop: true})
	  .add({
		targets: '.anim1 .letter',
		translateY: ["1.1em", 0],
		translateZ: 0,
		duration: 1500,
		delay: (el, i) => 50 * i
	  }).add({
		targets: '.anim1',
		opacity: 0,
		duration: 500,
		easing: "easeOutExpo",
		delay: 2000
	  });
}

/* Dropdown */
function OpenDropdownContent() {
	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/*Start Event On Load*/
window.addEventListener('load', (event) => {
	console.log('page is fully loaded');
	GetMusicFromJSON();
	GetCount();
	AnimateText();
});

setTimeout(function(){AddCustomEventListener()}, 500); // 0.5 second delay for fetching

function ResetTimeOut(){
	for (var j = 0; j < timeouts.length; j++) clearTimeout(timeouts[j]);
	timeouts = [];
}

/* Play Button */
var isPlaying; // prevent clicking play button again before music end
var msEl1 = document.getElementById("musicName");
var msEl2 = document.getElementById("musicNotes");
var timeouts = [];
var playInterval = 500; // 500 ms per note
document.getElementById("play").addEventListener("click", function() {
	if(isPlaying) ResetTimeOut();
	if(!currentMusic){ alert('Please select a music before pressing this button!'); return;} 
	isPlaying = true;
	var queueMusic = currentMusic.slice();
	var rawText = queueMusic.join(" "); //reset notes
	var playIndex = 0;
	queueMusic.forEach((note, i) => { // get single note from array
	console.log("raw"+rawText);
		timeouts.push(setTimeout(function(){
			if(!isPlaying){ // stop music if user changed music and kill all timeouts
				ResetTimeOut(); return;
			}
			console.log("Playing Note: "+note);
			PlaySingleNote(note);
			// change note's color while playing
			playIndex += (note.length+1);
			msEl2.innerHTML ='<span style="color: #f73c02">'+rawText.substr(0,playIndex)+'</span>'+rawText.substr(playIndex,rawText.length);
			if(i == queueMusic.length-1) isPlaying = false;
		}, i * playInterval)); // i is needed for proper foreach delay
	});
});

/* Delete Button */
function delfunc() {
	if(!currentMusic){ alert('Please select a music before pressing this button!'); return;} 
	fetch(`http://158.108.182.8:3002/melody/delete?title=${currentMusicName}`, {
		method: "DELETE",
		headers: {
		 // "Access-Control-Allow-Origin": "*",
		 // "Access-Control-Allow-Credentials": true,
		  "Content-Type": "application/json"},
	  })
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
		//alert(currentMusicName+` has been deleted!`);
		setTimeout(function(){window.location.reload();},500)
}

function GetJSONMusic(musicName){
	for(var i=0; i<jsonMusic.length;i++) {
		var entry = jsonMusic[i];
		if(entry.name == musicName){
			console.log("Choose Music: "+entry.name+" Notes: "+entry.notes);
			return jsonMusic[i];
		}
	}
}

function ChooseMusic(musicName){
	var label = document.getElementById('dropLabel');
	label.innerHTML = musicName;
	var obj = GetJSONMusic(musicName);
	currentMusicName = obj.name;
	currentMusic = obj.notes;
	select(currentMusicName);
	MusicNameTypingEffect(musicName); 
	MusicNotesTypingEffect(currentMusic.join(" ")); 
}

/* Events Listener */
function AddCustomEventListener() {
	var elements = document.getElementsByClassName('dropdown-item');
		Array.from(elements).forEach((element) => {
		  element.addEventListener('click', (event) => {
			isPlaying = false; // stop current music if playing
			//alert(`Clicked ${event.target.innerText}!`);
			var musicName = event.target.innerText;
			ChooseMusic(musicName);
		  });
		});
}
    

/*TypeWriterEffects*/

var captionLength1 = 0;
var captionLength2 = 0;
var musicName = '';

function PlaySingleNote(note){
	if(note!='_'){
		var audio = new Audio('notes/'+note.toLowerCase()+'.ogg');
		audio.currentTime = 0;
		audio.play();
	}
}


function MusicNameTypingEffect(text) {
    TypeName(text);
}

function MusicNotesTypingEffect(text) {
    TypeNotes(text);
}

function TypeName(text) {
    msEl1.innerHTML = text.substr(0, captionLength1++);
    if(captionLength1 < text.length+1) {
        setTimeout(function(){TypeName(text)}, 50);
    } else {
        captionLength1 = 0;
        text = '';
    }
}

function TypeNotes(text) {
    msEl2.innerHTML = text.substr(0, captionLength2++);
    if(captionLength2 < text.length+1) {
        setTimeout(function(){TypeNotes(text)}, 3);
    } else {
        captionLength2 = 0;
        text = '';
    }
}

function select(title){
	fetch(`http://158.108.182.8:3002/melody/select?title=${title}`,{
	method: "PATCH",
	headers: {
		//"Access-Control-Allow-Origin": "*",
		//"Access-Control-Allow-Methods": "*",
		//"Access-Control-Allow-Credentials": true,
		"Content-Type": "application/json"},
})

}
// Random Music From Hardware
document.getElementById("random").addEventListener("click",function(){
	if(isPlaying) ResetTimeOut();
	ram = Math.floor(Math.random() * all_title.length);
	var randomMusicName = all_title[ram];
	ChooseMusic(randomMusicName);
	select(randomMusicName);
});