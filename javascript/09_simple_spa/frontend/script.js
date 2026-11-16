var mode = 0;

window.onload = function() {
	createForm();
	getList();
}

const createForm = () => {
	const root = document.getElementById("root");
	const boundingDiv = document.createElement("div");
	boundingDiv.style.width="40%";
	boundingDiv.style.margin = "auto";
	boundingDiv.style.backgroundColor = "pink";
	boundingDiv.style.textAlign = "center";
	const form = document.createElement("form");
	form.setAttribute("class","m-3");
	
	//rype input and label
	const typeLabel = document.createElement("label");
	typeLabel.setAttribute("for","type");
	typeLabel.setAttribute("class","form-label");
	const typeLabelText = document.createTextNode("Type");
	typeLabel.appendChild(typeLabelText);
	const typeInput = document.createElement("input");
	typeInput.setAttribute("type","text");
	typeInput.setAttribute("id","type");
	typeInput.setAttribute("name","type");
	typeInput.setAttribute("class","form-control");

	//count input and label
	const countLabel = document.createElement("label");
	countLabel.setAttribute("for","count");
	countLabel.setAttribute("class","form-label");
	const countLabelText = document.createTextNode("Count");
	countLabel.appendChild(countLabelText);
	const countInput = document.createElement("input");
	countInput.setAttribute("type","number");
	countInput.setAttribute("id","count"),
	countInput.setAttribute("name","count");
	countInput.setAttribute("class","form-control");

	//price input and label
	const priceLabel = document.createElement("label");
	priceLabel.setAttribute("for","price");
	priceLabel.setAttribute("class","form-label");
	const priceLabelText = document.createTextNode("Price");
	priceLabel.appendChild(priceLabelText);
	const priceInput = document.createElement("input");
	priceInput.setAttribute("type","number");
	priceInput.setAttribute("id","price");
	priceInput.setAttribute("name","price");
	priceInput.setAttribute("step","0.01");
	priceInput.setAttribute("class","form-control");

	//submit Button
	const submitButton = document.createElement("input");
	submitButton.setAttribute("type","submit");
	submitButton.setAttribute("value","Add");
	submitButton.setAttribute("id","submitbutton");
	submitButton.setAttribute("class","btn btn-secondary");
	
	form.append(typeLabel,typeInput,countLabel,countInput,priceLabel,priceInput,submitButton);
	form.addEventListener("submit",function(e) {
		e.preventDefault();
		addItem();
	})
	
	boundingDiv.appendChild(form);
	root.appendChild(boundingDiv);
}

const addItem = async () => {
	const typeInput = document.getElementById("type");
	const countInput = document.getElementById("count");
	const priceInput = document.getElementById("price");
	
	let item = {
		"type":typeInput.value,
		"count":countInput.value,
		"price":priceInput.value
	}
	let url = "/api/shopping";
	let request = {
		method:"POST",
		"headers": {
			"Content-Type":"application/json"
		},
		"body":JSON.stringify(item)
	}
	if(mode) {
		url = "/api/shopping/"+mode;
		request.method = "PUT";
	}
	const response = await fetch(url,request);
	if(response.ok) {
		typeInput.value = "";
		countInput.value= "";
		priceInput.value = "";
		mode = 0;
		const submitButton = document.getElementById("submitbutton");
		submitButton.value = "Add";
		getList();
	} else {
		console.log("Server responded with a status "+response.status+" "+response.statusText);
	}
}

const getList = async () => {
	const response = await fetch("/api/shopping");
	if(response.ok) {
		const list = await response.json();
		if(list) {
			//populateTable(list);
		}
	} else {
		console.log("Server responded with a status "+response.status+" "+response.statusText);
	}
}

const removeItem = async (id) => {
	const url = "/api/shpping/"+id;
	const request = {
		"method":"DELETE"
	}
	const response = await fetch(url,request);
	if(response.ok) {
		getList();
	} else {
		console.log("Server responded with a status "+response.status+" "+response.statusText);
	}
}

const editItem = (item) => {
	const typeInput = document.getElementById("type");
	const countInput = document.getElementById("count");
	const priceInput = document.getElementById("price");
	mode = item.id;
	const submitButton = document.getElementById("submitbutton");
	submitButton.value = "Save";
	typeInput.value = item.type;
	countInput.value = item.count;
	priceInput.value = item.price;
}

const populateTable = (list) => {
	const root = document.getElementById("root");
	const oldTable = document.getElementById("table");
	if(oldTable) {
		root.removeChild(oldTable);
	}
	
	const table = document.createElement("table");
	table.setAttribute("class","table table-striped");
	table.setAttribute("id","table");

	//headers
	const header = document.createElement("thead");
	const headerRow = document.createElement("tr");
	
	//Type header
	const typeHeader = document.createElement("th");
	const typeHeaderText = document.createTextNode("Type");
	typeHeader.appendChild(typeHeaderText);

	//Count header
	const countHeader = document.createElement("th");
	const countHeaderText = document.createTextNode("Count");
	countHeader.appendChild(countHeaderText);
	
	//Price header
	const priceHeader = document.createElement("th");
	const priceHeaderText = document.createTextNode("Price");
	priceHeader.appendChild(priceHeaderText);
	
	//Remove header
	const removeHeader = document.createElement("th");
	const removeHeaderText = document.createTextNode("Remove");
	removeHeader.appendChild(removeHeaderText);
	
	//Edit header
	const editHeader = document.createElement("th");
	const editHeaderText = document.createTextNode("Edit");
	editHeader.appendChild(editHeaderText);
	
	headerRow.append(typeHeader,countHeader,priceHeader,removeHeader,editHeader);
	header.appendChild(headerRow);
	table.appendChild(header);
}