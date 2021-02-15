var currentMusic; // default music
var jsonMusic; // musics from JSON

/*Load Data from Backend*/
function GetMusicFromJSON(){
	fetch("https://raw.githubusercontent.com/lazycodex/xyz/main/samples-record.json")
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
			var doc =  document.getElementById("musicList");
			var newMusic = document.createElement("li");
			//newMusic.id = 'div_id';
			newMusic.innerHTML = '<a class="dropdown-item" href="#">'+data.name+'</a>';
			doc.appendChild(newMusic);
			if(data.name == 'Default'){ // Choose default music
				currentMusic = data.val;
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


/*Start Event On Load*/
window.addEventListener('load', (event) => {
	console.log('page is fully loaded');
	GetMusicFromJSON();
	AnimateText();
});

/*Dropdown Click Event*/
function AddCustomEventListener() {
	(function ($) {
		"use strict";
		// Select a music from dropdown-menu
		$(function(){
		  $(".dropdown-menu li a").click(function(){
			$(".btn:first-child").text($(this).text());
			 $(".btn:first-child").val($(this).text());
			//document.getElementById("musicName").innerHTML = "Playing: " + $(this).text(); // set text without animation
			for(var i=0; i<jsonMusic.length;i++) {
				var obj = jsonMusic[i];
				if(obj.name == $(this).text()){
					console.log("Choose Music: "+obj.name+" Notes: "+obj.val);
					currentMusic = obj.val;
				}
			}
			MusicNameTypingEffect($(this).text()); 
			MusicNotesTypingEffect(currentMusic.join(" ")); 
		  });
		});
		
		$(function(){
			
		});
	})(jQuery);
	
}
    
setTimeout(function(){AddCustomEventListener()}, 500); // 0.5 second delay for fetching

/*TypeWriterEffects*/

var captionLength1 = 0;
var captionLength2 = 0;
var musicName = '';

$(document).ready(function() {
    msEl1 = $('#musicName');
	msEl2 = $('#musicNotes');
    /*$('#test-typing').click(function(){ MusicNameTypingEffect("Test"); });*/
});

function MusicNameTypingEffect(text) {
    TypeName(text);
}

function MusicNotesTypingEffect(text) {
    TypeNotes(text);
}

function TypeName(text) {
    msEl1.html(text.substr(0, captionLength1++));
    if(captionLength1 < text.length+1) {
        setTimeout(function(){TypeName(text)}, 50);
    } else {
        captionLength1 = 0;
        text = '';
    }
}

function TypeNotes(text) {
    msEl2.html(text.substr(0, captionLength2++));
    if(captionLength2 < text.length+1) {
        setTimeout(function(){TypeNotes(text)}, 50);
    } else {
        captionLength2 = 0;
        text = '';
    }
}