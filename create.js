let record = [];
let s=true;

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

let muteButton = document.getElementById("mute");
let submitButton = document.getElementById("submitButton");
let form = document.getElementById("music_name");
let deleteButton = document.getElementById("deleteButton")
// delete button
deleteButton.addEventListener("click",(event) =>{
	isPlaying = false; // stop preview
  if (record.length == 0){
    alert("The notes are empty."); return;
  }
  else{
    delete_note();
  }
});
//submit button
submitButton.addEventListener("click", (event) => {
  isPlaying = false; // stop preview
  event.preventDefault();
  music_name = form.value;
  form.value = "";
  if(music_name == ""){ 
	alert(`Please enter music name!`); return;
  }else if(record.length != 40){
  alert('Please enter 40 notes.');return;
  }else{
	create(music_name);
  }
});
//mute button
muteButton.addEventListener("click",(event) =>{
  if(s==true){
    muteButton.innerHTML="UNMUTE";
    s=false;
  }else{
    muteButton.innerHTML="MUTE";
    s=true;
  }
});

//rest button
function restbutton(){
	isPlaying = false; // stop preview
	if(record.length >= 40){ 
		alert('You have already input 40 notes!');
		isDown = false; return;  // reset mouse's behavior
	}
	record.push('_');
	updateDisplayText();
}

function updateDisplayText(){
	var recordText = document.getElementById('recordNotes');
	recordText.innerHTML = record.join(" ");
  var number_note=document.getElementById("number of note");
  var len = record.length;
  number_note.innerHTML = `number of note(s): ${len}/40`;
}

/* Piano */
function playSound(note){
	sound = new Audio('notes/'+note+'.ogg');
  if(s==true){
	  sound.play()
  } 
  record.push(note.toUpperCase())
	updateDisplayText();
}

function triggerKey(note){
	isPlaying = false; // stop preview
	if(record.length >= 40){ 
		alert('You have already input 40 notes!');
		isDown = false; return;  // reset mouse's behavior
	}
	playSound(note);
	document.getElementById(note).classList.add('active');
}

var isTypingMusicName;
var isDown;   // Tracks status of mouse button
/* Interactions */
$(document).ready(function(){
  //setInterval(function test(){console.log(isTypingMusicName);},1000)

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
    if (evt.keyCode == "32") {restbutton()};
}

window.addEventListener("keydown",deletePressed, false)
function deletePressed(evt) {
  if (evt.keyCode == '8'){
	  isPlaying = false; // stop preview
	if(isTypingMusicName) return;
    delete_note();
  }
}

function ResetTimeOut(){
	for (var j = 0; j < timeouts.length; j++) clearTimeout(timeouts[j]);
	timeouts = [];
}

/* Play Button */
var isPlaying; // prevent clicking play button again before music end
var msEl2 = document.getElementById("recordNotes");
var timeouts = [];
var playInterval = 500; // 500 ms per note
document.getElementById("play").addEventListener("click", function() {
	if(isPlaying) ResetTimeOut();
	if(record.length == 0){ alert('The notes are empty.'); return;} 
	isPlaying = true;
	var queueMusic = record.slice();
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

function PlaySingleNote(note){
	if(!s) return;
	if(note!='_'){
		var audio = new Audio('notes/'+note.toLowerCase()+'.ogg');
		audio.currentTime = 0;
		audio.play();
	}
}