function GetMusicFromJSON(){
	fetch("https://raw.githubusercontent.com/lazycodex/xyz/main/record-samples.json")
		.then(response => response.json())
		.then((datas) => {
			
			datas.forEach((data) => {
			console.log(data.name);
			var arr = data.val;
			arr.forEach((data) => {
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
		// Change text when select an item from dropdown-menu
		$(function(){
		  $(".dropdown-menu li a").click(function(){
			
			$(".btn:first-child").text($(this).text());
			 $(".btn:first-child").val($(this).text());
			 document.getElementById("musicName").innerHTML = "Playing: " + $(this).text();
		  });
		});
		
		$(function(){
			
		});
	})(jQuery);
	
}
    
setTimeout(function(){AddCustomEventListener()}, 1000); // 1 second delay for fetching