let record = [];

//record algorithm
record.push(0);
record.push(1);
record.push(2);
record.push(3);
record.push(4);
record.push(5);
record.push(6);
console.log(record);

//post to backend
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
  author = form.elements["name"].value;
  form.elements["name"].value = "";
  create(name);
});