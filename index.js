var currentMusic = ['A','A','A','A','A','A','A','A'] // default music
var jsonMusic; // musics from JSON

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
		  });
        });
}

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


window.addEventListener('load', (event) => {
	console.log('page is fully loaded');
	GetMusicFromJSON();
	AnimateText();
});

function AddCustomEventListener() {
	(function ($) {
		"use strict";
		// Select a music from dropdown-menu
		$(function(){
		  $(".dropdown-menu li a").click(function(){
			$(".btn:first-child").text($(this).text());
			 $(".btn:first-child").val($(this).text());
			//document.getElementById("musicName").innerHTML = "Playing: " + $(this).text();
			for(var i=0; i<jsonMusic.length;i++) {
				var obj = jsonMusic[i];
				if(obj.name == $(this).text()){
					console.log("Choose Music: "+obj.name+" Notes: "+obj.val);
					currentMusic = obj.val;
				}
			}
			 TypingEffect($(this).text()); // Use above line to set text without animation instead
		  });
		});
		
		$(function(){
			
		});
	})(jQuery);
	
}
    
setTimeout(function(){AddCustomEventListener()}, 500); // 0.5 second delay for fetching


var captionLength = 0;
var musicName = '';

$(document).ready(function() {
    captionEl = $('#musicName');
    /*$('#test-typing').click(function(){
        TypingEffect("Test");
    });*/
});

function TypingEffect(text) {
    musicName = $('input#user-musicName').val();
    type(text);
}

function type(text) {
    captionEl.html(text.substr(0, captionLength++));
    if(captionLength < text.length+1) {
        setTimeout(function(){type(text)}, 50);
    } else {
        captionLength = 0;
        text = '';
    }
}