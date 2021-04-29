function check_credentials() {
	console.log('a');

	var t1 = document.getElementById('floatingInput');
	var t2 = document.getElementById('floatingPassword');
	var s1 = t1.value;
	var s2 = t2.value;

	var myJSON, text, obj;
	var flag = true;
	text = localStorage.getItem("creds");
	obj = JSON.parse(text);
	for(var i=0; i<obj.length; i++){
		if(obj[i].username == s1){
			flag = false;
			if(obj[i].password == s2){
				var new_obj = {username: s1, password: s2};
				myJSON = JSON.stringify(new_obj);
				localStorage.setItem("curr_user", myJSON);
				window.location.replace("./groups.html");
			}
			else{
				alert("Invalid Password!!")
			}
			break;
		}
	}
	if(flag){
		alert("Invalid Username");
	}
}

function make_arrays() {
	var obj = JSON.parse(localStorage.getItem("creds"));
	if(obj == null){
		var ob1 = [];
		var ob2 = [];
		localStorage.setItem("creds",JSON.stringify(ob1));
		localStorage.setItem("groups",JSON.stringify(ob2));
	}
}