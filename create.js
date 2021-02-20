let record = [];

function showRecord(){
  console.log(record)
}
 setInterval(showRecord,1000)

// post to backend
function create(name) {
	fetch("http://158.108.182.8:3002/melody/create", {
		method: "POST",
		headers: {
		 // "Access-Control-Allow-Origin": "*",
		 // "Access-Control-Allow-Credentials": true,
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ title: name, note: record }),
	  })
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
		alert(name+` has been added!`);
}
function delete_note(){
  record.pop();
  updateDisplayText();
}

let submitButton = document.getElementById("submitButton");
let form = document.getElementById("music_name");
let deleteButton = document.getElementById("deleteButton")
deleteButton.addEventListener("click",(event) =>{
  if (record.length == 0){
    alert("The notes are empty."); return;
  }
  else{
    delete_note();
  }
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  music_name = form.value;
  form.value = "";
  if(music_name == ""){ 
	alert(`Please enter music name!`); return;
  }else if(record.length!=40){
  alert(`Please enter 40 note`);return;
  }else{
	create(music_name);
  }
});

function updateDisplayText(){
	var recordText = document.getElementById('recordNotes');
	recordText.innerHTML = record.join(" ");
  var number_note=document.getElementById("number of note");
  var len = record.length;
  number_note.innerHTML = `number of note(s): ${len}`;
}

/* Piano */
function playSound(note){
	sound = new Audio('notes/'+note+'.ogg');
	sound.play() 
    record.push(note.toUpperCase())
	updateDisplayText();
}

function triggerKey(note){
	playSound(note);
	document.getElementById(note).classList.add('active');
}

var isTypingMusicName;
/* Interactions */
$(document).ready(function(){
  //setInterval(function test(){console.log(isTypingMusicName);},1000)

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
  $(document).mouseup(function(e) { // release mouse outside piano
    isDown = false;
	
	var container = jQuery('#music_name');
	if(!container.is(e.target)){
		isTypingMusicName = false;
		//console.log('Click Outside TextBox!');
	}
  });
  /* Input Name */
  $("#music_name").mousedown(function() { // release mouse outside piano
    isTypingMusicName = true;
	//console.log('Click Inside TextBox!');
  });
  
});
//Sample Key pressed (fix and mapping later)
function keypressNote(note){
  triggerKey(note)
  setTimeout(() => {
  document.getElementById(note).classList.remove('active');
  }, 100);
}
window.addEventListener("keydown", checkKeyPressed, false);
function checkKeyPressed(evt) {
	if(isTypingMusicName) return; // prevent recording a new note while typing music name
    if (evt.keyCode == "81") {keypressNote('f3')};
    if (evt.keyCode == "50") {keypressNote('f-3')};
    if (evt.keyCode == "87") {keypressNote('g3')};
    if (evt.keyCode == "51") {keypressNote('g-3')};
    if (evt.keyCode == "69") {keypressNote('a3')};
    if (evt.keyCode == "52") {keypressNote('a-3')};
    if (evt.keyCode == "82") {keypressNote('b3')};
    if (evt.keyCode == "84") {keypressNote('c4')};
    if (evt.keyCode == "54") {keypressNote('c-4')};
    if (evt.keyCode == "89") {keypressNote('d4')};
    if (evt.keyCode == "55") {keypressNote('d-4')};
    if (evt.keyCode == "85") {keypressNote('e4')};
    if (evt.keyCode == "73") {keypressNote('f4')};
    if (evt.keyCode == "57") {keypressNote('f-4')};
    if (evt.keyCode == "79") {keypressNote('g4')};
    if (evt.keyCode == "48") {keypressNote('g-4')};
    if (evt.keyCode == "80") {keypressNote('a4')};
    if (evt.keyCode == "189") {keypressNote('a-4')};
    if (evt.keyCode == "219") {keypressNote('b4')};
    if (evt.keyCode == "90") {keypressNote('c5')};
    if (evt.keyCode == "83") {keypressNote('c-5')};
    if (evt.keyCode == "88") {keypressNote('d5')};
    if (evt.keyCode == "68") {keypressNote('d-5')};
    if (evt.keyCode == "67") {keypressNote('e5')};
    if (evt.keyCode == "86") {keypressNote('f5')};
    if (evt.keyCode == "71") {keypressNote('f-5')};
    if (evt.keyCode == "66") {keypressNote('g5')};
    if (evt.keyCode == "72") {keypressNote('g-5')};
    if (evt.keyCode == "78") {keypressNote('a5')};
    if (evt.keyCode == "74") {keypressNote('a-5')};
    if (evt.keyCode == "77") {keypressNote('b5')};
    if (evt.keyCode == "188") {keypressNote('c6')};
    if (evt.keyCode == "76") {keypressNote('c-6')};
    if (evt.keyCode == "190") {keypressNote('d6')};
    if (evt.keyCode == "186") {keypressNote('d-6')};
    if (evt.keyCode == "191") {keypressNote('e6')};
}

window.addEventListener("keydown",deletePressed, false)
function deletePressed(evt) {
  if (evt.keyCode == '8'){
	if(isTypingMusicName) return;
    delete_note();
  }
}
