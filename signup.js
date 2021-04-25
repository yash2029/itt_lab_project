function new_user() {
	var t1 = document.getElementById('floatingInput');
	var t2 = document.getElementById('floatingPassword');
	var t3 = document.getElementById('floatingPassword2');
	var s1 = t1.value;
	var s2 = t2.value;
	var s3 = t3.value;

	var myJSON, text, obj;
	var flag = true;
	text = localStorage.getItem("creds");
	obj = JSON.parse(text);
	for(var i=0; i<obj.length; i++){
		if(obj[i].username == s1){
			flag = false;
			break;
		}
	}
	if(flag){
		if(s2 == s3){
			var new_obj = {username: s1, password: s2, groups:[]};
			obj.push(new_obj);
			myJSON = JSON.stringify(obj);
			localStorage.setItem("creds", myJSON);
			alert("Signup Complete!!")
			window.location.replace("./login.html"); 
		}
		else{
			alert("Passwords Don't Match!!");
		}
	}
	else{
		alert("Username Already Taken!!");
	}
}