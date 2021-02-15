window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  fetch("https://raw.githubusercontent.com/lazycodex/xyz/main/record_sample.json")
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
			newMusic.innerHTML = '<a href="#" onclick="return false;">'+data.name+'</a>';
			doc.appendChild(newMusic);
		  });
        });
});

function AddCustomEventListener() {
	(function ($) {
		"use strict";
		// Change text when select an item from dropdown-menu
		$(function(){
		  $(".dropdown-menu li a").click(function(){
			
			$(".btn:first-child").text($(this).text());
			 $(".btn:first-child").val($(this).text());
			 document.getElementById("musicName").innerHTML = "Music Name: " + $(this).text();
		  });
		});
		
		$(function(){
			
		});
	})(jQuery);
	
}
    
setTimeout(function(){AddCustomEventListener()}, 1000); // 1 second delay for fetching
