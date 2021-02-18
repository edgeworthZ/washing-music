let record = [];

// record algorithm
record.push('E');
record.push('D');
record.push('C');
record.push('E');
record.push('C');
record.push('C');
record.push('E');
record.push('D');
console.log(record);

// post to backend
function create(name) {
	fetch("", {
		method: "POST",
		headers: {
		  // "Access-Control-Allow-Origin": "*",
		  // "Access-Control-Allow-Credentials": true,
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ name: name, value: record }),
	  })
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));
}

let form = document.getElementById("submitButton");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  //id = someUniqueID
  music_name = form.elements["music_name"].value;
  form.elements["music_name"].value = "";
  create(music_name);
});

