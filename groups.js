function get_user() {
	var text = localStorage.getItem("curr_user");
	var obj = JSON.parse(text);
	return obj.username;
}

function load_groups() {
	var text = localStorage.getItem('creds');
	var obj = JSON.parse(text);
	var usr = get_user();
	for(var i = 0; i<obj.length; i++){
		if(obj[i].username == usr){
			for(var j = 0; j<obj[i].groups.length; j++){
				var y = document.getElementById('group-list');
				var li = document.createElement('li');
				li.setAttribute('class','list-group-item dropdown-item');
				li.setAttribute('style','cursor: pointer;');
				li.setAttribute('onclick','select_group(this)');
				li.innerHTML = obj[i].groups[j];
				y.appendChild(li);
			}
		}
	}
}

function create_join_group() {
	var usr = get_user();
	var x = prompt("Group Name: ");
	if(x == null){
		return;
	}
	var myJSON, text, obj, obj2;
	var flag = true;
	text = localStorage.getItem("creds");
	obj = JSON.parse(text);
	text = localStorage.getItem("groups");
	obj2 = JSON.parse(text);
	var flag = true;
	for(var i = 0; i<obj2.length; i++){
		if(obj2[i] == x){
			flag = false;
			break;
		}
	}
	if(flag){
		var group_name = x;
		var n1,n2,n3;
		n1 = group_name+"_calendar";
		n2 = group_name+"_images";
		n3 = group_name+"_todo";
		var ob1,ob2,ob3;
		ob1 = []
		ob2 = []
		ob3 = []
		// ob1 = [{name:'event',date: '1-JAN-Monday',time:'12am-12pm',location:'none',description:'none'}];
		// ob2 = ['img_url'];
		// ob3 = [{name:'task',dueDate:'1-JAN',assignedTo:'abc',assignedBy:'xyz'}];
		myJSON = JSON.stringify(ob1);
		localStorage.setItem(n1, myJSON);
		myJSON = JSON.stringify(ob2);
		localStorage.setItem(n2, myJSON);
		myJSON = JSON.stringify(ob3);
		localStorage.setItem(n3, myJSON);
		console.log('done');
		obj2.push(x);
	}
	//obj2 = [...new Set(obj2)];
	myJSON = JSON.stringify(obj2);
	localStorage.setItem("groups", myJSON);
	for(var i=0; i<obj.length; i++){
		if(obj[i].username == usr){
			obj[i].groups.push(x);
			obj[i].groups = [...new Set(obj[i].groups)]
			myJSON = JSON.stringify(obj);
			localStorage.setItem("creds", myJSON);
			var y = document.getElementById('group-list');
			var li = document.createElement('li');
			li.setAttribute('class','list-group-item dropdown-item');
			li.setAttribute('style','cursor: pointer;');
			li.setAttribute('onclick','select_group(this)');
			li.innerHTML = x;
			y.appendChild(li);
			break;
		}
	}
}


function select_group(x) {
	var myJSON, text, obj;
	var group_name = x.innerHTML;
	obj = {curr_group_name: group_name};
	myJSON = JSON.stringify(obj);
	localStorage.setItem("curr_group", myJSON);
	window.location.replace('./calendar.html')
}

function leave_group() {
	var usr = get_user();
	var obj = JSON.parse(localStorage.getItem('creds'));
	var x = prompt("Group Name: ");
	if(x == null){
		return;
	}
	var flag = true;
	for(var i = 0; i<obj.length; i++){
		if(obj[i].username = usr){
			if(obj[i].groups.includes(x)){
				obj[i].groups.splice(obj[i].groups.indexOf(x),1);
				localStorage.setItem('creds',JSON.stringify(obj));
				alert('You Left ' + x + "!!")
				location.reload();
			}
			else{
				alert('Not of Member of this Group: ' + x);
			}
			break;
		}
	}
}