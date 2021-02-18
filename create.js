let record = [];

// record algorithm
// record.push('E4');
// record.push('D4');
// record.push('C4');
// record.push('E4');
// record.push('C4');
// record.push('C4');
// record.push('E4');
// record.push('D4');
function showRecord(){
  console.log(record)
}
// setInterval(showRecord,1000)

// post to backend
function create(name) {
	fetch("http://158.108.182.8:50006/create", {
		method: "POST",
		headers: {
		 // "Access-Control-Allow-Origin": "*",
		 // "Access-Control-Allow-Credentials": true,
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ name: name, notes: record }),
	  })
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
		alert(name+` has been added!`);
}
function delete_note(){
  record.pop()
}

let submitButton = document.getElementById("submitButton");
let form = document.getElementById("music_name");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  music_name = form.value;
  form.value = "";
  if(music_name == ""){ 
	alert(`Please enter music name!`); return;
  }else{
	create(music_name);
  }
});


/* Piano */
function playSound(note){
	sound = new Audio('notes/'+note+'.ogg');
	sound.play() 
  record.push(note.toUpperCase())
}

function triggerKey(note){
	playSound(note);
	document.getElementById(note).classList.add('active');
}

$(document).ready(function(){
  var isDown = false;   // Tracks status of mouse button

  $(".white,.black").mousedown(function() { // play sound when mousedown on a key & change active class
    isDown = true;
	triggerKey(this.id);
  }).mouseleave(function(){ // cursor leaves current key, remove its active class
    if(isDown) { // User hover to a key without releasing mouse
       document.getElementById(this.id).classList.remove('active');
    }
  }).mouseover(function(){ // cursor is now pointing to new key, play new note & change active class
    if(isDown) { // User hover to a key without releasing mouse
	   triggerKey(this.id);
    }
  }).mouseup(function(){ // release mouse on piano, remove active class
    if(isDown) { // User hover to a key without releasing mouse
       document.getElementById(this.id).classList.remove('active');
    }
  });
  
  $(document).mouseup(function() { // release mouse outside piano
    isDown = false;
  });
});
//Sample Key pressed (fix and mapping later)
window.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(evt,note,key_code) {
    if (evt.keyCode == "65") {
        triggerKey('f4')
    }
}

