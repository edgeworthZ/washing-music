var currentMusicName;
var currentMusic; // default music
var jsonMusic; // musics from JSON

/*Load Data from Backend*/
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
	AnimateText();
});

setTimeout(function(){AddCustomEventListener()}, 500); // 0.5 second delay for fetching

/* Preview Button */
var isPlaying; // prevent clicking preview button again before music end
var msEl1 = document.getElementById("musicName");
var msEl2 = document.getElementById("musicNotes");
var timeouts = [];
var playInterval = 555;
document.getElementById("preview").addEventListener("click", function() {
	if(isPlaying) return;
	isPlaying = true;
	var queueMusic = currentMusic.slice();
	var rawText = queueMusic.join(" "); //reset notes
	var playIndex = 0;
	queueMusic.forEach((note, i) => { // get single note from array
	console.log("raw"+rawText);
		timeouts.push(setTimeout(function(){
			if(!isPlaying){ // stop music if user changed music and kill all timeouts
				for (var j = 0; j < timeouts.length; j++) clearTimeout(timeouts[j]);
				timeouts = []; return;
			}
			console.log("Playing Note: "+note);
			if(note != "0") PlaySingleNote(note);
			// change note's color while playing
			playIndex += (note.length+1);
			msEl2.innerHTML ='<span style="color: #f73c02">'+rawText.substr(0,playIndex)+'</span>'+rawText.substr(playIndex,rawText.length);
			if(i == queueMusic.length-1) isPlaying = false;
		}, i * 750)); // i is needed for proper foreach delay
	});
});

/* Delete Button */
document.getElementById("delete").addEventListener("click", function() {
	fetch("http://158.108.182.8:50006/delete", {
		method: "DELETE",
		headers: {
		 // "Access-Control-Allow-Origin": "*",
		 // "Access-Control-Allow-Credentials": true,
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ name: currentMusicName}),
	  })
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
		alert(name+` has been deleted!`);
	window.location.reload(false); 
});

/* Events Listener */
function AddCustomEventListener() {
	var elements = document.getElementsByClassName('dropdown-item');
		Array.from(elements).forEach((element) => {
		  element.addEventListener('click', (event) => {
			isPlaying = false; // stop current music if playing
			//alert(`Clicked ${event.target.innerText}!`);
			var label = document.getElementById('dropLabel');
			var musicName = event.target.innerText;
			label.innerHTML = musicName;
			for(var i=0; i<jsonMusic.length;i++) {
				var obj = jsonMusic[i];
				if(obj.name == musicName){
					console.log("Choose Music: "+obj.name+" Notes: "+obj.notes);
					currentMusicName = obj.name;
					currentMusic = obj.notes;
					select(currentMusicName);
				}
			}
			MusicNameTypingEffect(musicName); 
			MusicNotesTypingEffect(currentMusic.join(" ")); 
		  });
		});
}
    

/*TypeWriterEffects*/

var captionLength1 = 0;
var captionLength2 = 0;
var musicName = '';

function PlaySingleNote(note){
    //var audio = document.getElementById(note);
	var audio = new Audio('notes/'+note.toLowerCase()+'.ogg');
    audio.currentTime = 0;
    audio.play();
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
	fetch("http://158.108.182.8:3002/melody/create", {
		method: "POST",
		headers: {
		 // "Access-Control-Allow-Origin": "*",
		 // "Access-Control-Allow-Credentials": true,
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ title: "Random", note: -1 }),
	  }).then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
		alert('Random Music From Harware');
});