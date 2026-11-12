window.onload = function() {
	if(sessionStorage.getItem("message")) {
		const message = sessionStorage.getItem("message");
		const session = document.getElementById("session");
		session.textContent = "In session storage:"+message
	}
	if(localStorage.getItem("message")) {
		const message = localStorage.getItem("message");
		const local = document.getElementById("local");
		local.textContent = "In local storage:"+message;
	}
}

function storeToLocalStorage() {
	localStorage.setItem("message",document.getElementById("message").value);
}

function storeToSessionStorage() {
	sessionStorage.setItem("message",document.getElementById("message").value);
}