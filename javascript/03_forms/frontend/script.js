window.onload = function() {
	let form = document.getElementById("form");
	form.addEventListener("submit",submit);
}

function submit(event) {
	event.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const user = {
		"username":username,
		"password":password
	}
	login(user);
}

async function login(user) {
	const request = {
		method:"POST",
		headers: {
			"Content-Type":"application/json"
		},
		body:JSON.stringify(user)
	}
	const response = await fetch("/login",request);
	if(!response) {
		console.log("No response");
		return;
	}
	if(response.ok) {
		console.log("Logged in");
	} else {
		console.log("Unauthorized");
	}
}