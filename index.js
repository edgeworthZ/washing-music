var currentMusic; // default music
var jsonMusic; // musics from JSON

/*Load Data from Backend*/
function GetMusicFromJSON(){
	fetch("https://raw.githubusercontent.com/lazycodex/xyz/main/samples-record-v2.json")
		.then(response => response.json())
		.then((datas) => {
			jsonMusic = datas;
			console.log(jsonMusic);
			datas.forEach((data) => {
			console.log(data.name);
			var arr = data.val;
			arr.forEach((data) => { // get single note from array
				console.log(data);
			});
			var doc =  document.getElementById("myDropdown");
			var newMusic = document.createElement("a");
			newMusic.classList.add('dropdown-item');
			newMusic.href = '#';
			newMusic.innerHTML = data.name;
			doc.appendChild(newMusic);
			if(data.name == 'Default'){ // Choose default music
				currentMusic = data.val;
				document.getElementById("musicNotes").innerHTML = currentMusic.join(" ");
			}
		  });
        });
}

/*Title Wave Effect*/
/*function AnimateText(){
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
}*/

/* Dropdown */
function myFunction() {
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

/*Events Listener*/
function AddCustomEventListener() {
	var elements = document.getElementsByClassName('dropdown-item');
		Array.from(elements).forEach((element) => {
		  element.addEventListener('click', (event) => {
			//alert(`Clicked ${event.target.innerText}!`);
			var label = document.getElementById('dropLabel');
			var musicName = event.target.innerText;
			label.innerHTML = musicName;
			for(var i=0; i<jsonMusic.length;i++) {
				var obj = jsonMusic[i];
				if(obj.name == musicName){
					console.log("Choose Music: "+obj.name+" Notes: "+obj.val);
					currentMusic = obj.val;
				}
			}
			MusicNameTypingEffect(musicName); 
			MusicNotesTypingEffect(currentMusic.join(" ")); 
		  });
		});
}
    
setTimeout(function(){AddCustomEventListener()}, 500); // 0.5 second delay for fetching

/*Preview Button*/
msEl1 = document.getElementById("musicName");
msEl2 = document.getElementById("musicNotes");
document.getElementById("preview").addEventListener("click", function() {
	var rawText = currentMusic.join(" "); //reset notes
	currentMusic.forEach((note, i) => { // get single note from array
		setTimeout(function(){
			console.log("Playing Note: "+note);
			PlaySingleNote(note.toLowerCase());
			// change note's color while playing (each note uses 3 chars)
			msEl2.innerHTML ='<span style="color: #ff0000">'+rawText.substr(0,(i+1)*3)+'</span>'+rawText.substr((i+1)*3,rawText.length);
		}, i * 500); // i is needed for proper foreach delay
	});
});

/*TypeWriterEffects*/

var captionLength1 = 0;
var captionLength2 = 0;
var musicName = '';

function PlaySingleNote(note){
    var audio = document.getElementById(note);
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
        setTimeout(function(){TypeNotes(text)}, 15);
    } else {
        captionLength2 = 0;
        text = '';
    }
}