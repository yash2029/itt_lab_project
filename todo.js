function w3_open() {
    document.getElementById("mySidebar").style.width = "15%";
    document.getElementById("mySidebar").style.display = "inline-block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function load_heading() {
	var d = new Date();
	var n = d.getDay();
	var x = document.getElementById('todo-heading');
	var mssgs = [	"Just Relax, It's a Sunday...",
					"Let's go, It's a Monday!!",
				 	"Come on, It's a Tuesday!",
				 	"It's a Long Wednesday.",
				 	"It's Thursday Already??",
				 	"Thank God it's Friday!!!",
				 	"Saturday more like Party-day!!"
				];
	x.innerHTML = mssgs[n];
}

function load_list() {
	load_heading();
	var grp = get_group();
	var obj = JSON.parse(localStorage.getItem(grp+'_todo'));
	for(var i = 0; i<obj.length; i++){
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		if(obj[i].status == 'Completed'){
			tr.setAttribute('class','table-success');
			td1.setAttribute('style','text-decoration: line-through;');
		}
		td1.innerHTML = obj[i].task;
		td2.innerHTML = obj[i].status;
		var b1 = document.createElement('button');
		b1.setAttribute('type','button');
		b1.setAttribute('class','btn btn-danger');
		b1.setAttribute('id',obj[i].task);
		b1.setAttribute('onclick','delete_task(this)');
		b1.innerHTML = 'Delete';
		var b2 = document.createElement('button');
		b2.setAttribute('type','button');
		b2.setAttribute('class','btn btn-success');
		b2.setAttribute('id',obj[i].task);
		b2.setAttribute('onclick','complete_task(this)');
		b2.innerHTML = 'Finished';
		b2.setAttribute('style','margin-left: 50px;');
		td3.appendChild(b1);
		td3.appendChild(b2);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		document.getElementById('todo-list-body').appendChild(tr);
	}
}

function add_task() {
	var x = document.getElementById('todo-name-input').value;
	var tr = document.createElement('tr');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');
	td1.innerHTML = x;
	td2.innerHTML = 'In Progress';
	var b1 = document.createElement('button');
	b1.setAttribute('type','button');
	b1.setAttribute('class','btn btn-danger');
	b1.setAttribute('id',x);
	b1.setAttribute('onclick','delete_task(this)');
	b1.innerHTML = 'Delete';
	var b2 = document.createElement('button');
	b2.setAttribute('type','button');
	b2.setAttribute('class','btn btn-success');
	b2.setAttribute('id',x);
	b2.setAttribute('onclick','complete_task(this)');
	b2.innerHTML = 'Finished';
	b2.setAttribute('style','margin-left: 50px;');
	td3.appendChild(b1);
	td3.appendChild(b2);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	document.getElementById('todo-list-body').appendChild(tr);
	var grp = get_group();
	var obj = JSON.parse(localStorage.getItem(grp+'_todo'));
	var new_obj = {task: x, status: 'In progress'};
	obj.push(new_obj);
	localStorage.setItem(grp+'_todo',JSON.stringify(obj));
}

function delete_task(x) {
	var grp = get_group();
	var obj = JSON.parse(localStorage.getItem(grp+'_todo'));
	var i;
    for(i = 0; i<obj.length; i++){
        if(obj[i].task == x.id){
            break; 
        }
    }
    obj.splice(i,1);
	localStorage.setItem(grp+'_todo',JSON.stringify(obj));
	location.reload();
}

function complete_task(x) {
	var grp = get_group();
	var obj = JSON.parse(localStorage.getItem(grp+'_todo'));
	var i;
    for(i = 0; i<obj.length; i++){
        if(obj[i].task == x.id){
            obj[i] = {task:obj[i].task, status:'Completed'};
            break;
        }
    }
	localStorage.setItem(grp+'_todo',JSON.stringify(obj));
	location.reload();	
}

function get_group() {
    var text = localStorage.getItem("curr_group");
    var obj = JSON.parse(text);
    return obj.curr_group_name;
}