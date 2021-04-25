function w3_open() {
    document.getElementById("mySidebar").style.width = "15%";
    document.getElementById("mySidebar").style.display = "inline-block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function new_event() {
    var e1 = document.getElementById('ename').value;
    var e2 = document.getElementById('edate').value;
    var e3 = document.getElementById('estime').value;
    var e4 = document.getElementById('eetime').value;
    var e5 = document.getElementById('elocation').value;
    var e6 = document.getElementById('edescription').value;
    var event_date = e2.split('-');
    var event_timing = e3+'-'+e4;
    var cal = document.getElementById('cal');
    var event = document.createElement('div');
    event.setAttribute("class","calender-event rounded");
    var span1 = document.createElement('span');
    span1.setAttribute("class","event-left");
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    div1.setAttribute('class','event-date rounded');
    div1.innerHTML = event_date[2];
    div2.setAttribute('class','event-month');
    switch(event_date[1]){
        case '01':  event_date[1] = "JAN";
                    break;
        case '02':  event_date[1] = "FEB";
                    break;
        case '03':  event_date[1] = "MAR";
                    break;
        case '04':  event_date[1] = "APR";
                    break;
        case '05':  event_date[1] = "MAY";
                    break;
        case '06':  event_date[1] = "JUN";
                    break;
        case '07':  event_date[1] = "JUL";
                    break;
        case '08':  event_date[1] = "AUG";
                    break;
        case '09':  event_date[1] = "SEPT";
                    break;
        case '10':  event_date[1] = "OCT";
                    break;
        case '11':  event_date[1] = "NOV";
                    break;
        case '12':  event_date[1] = "DEC";
                    break;
    }
    div2.innerHTML = event_date[1];
    span1.appendChild(div1);
    span1.appendChild(div2);
    event.appendChild(span1);
    var span2 = document.createElement('span');
    span2.setAttribute("class","event-right");
    var div3 = document.createElement('div');
    var div4 = document.createElement('div');
    var div5 = document.createElement('div');
    div3.setAttribute('class','event-month');
    div3.innerHTML = e1;
    div4.setAttribute('class','event-icons');
    var span41 = document.createElement('span');
    span41.setAttribute("class","bi bi-calendar");
    var span42 = document.createElement('span');
    span42.setAttribute("class","event-icon-label");
    span42.innerHTML = "Monday";
    div4.appendChild(span41);
    div4.appendChild(span42);
    var span43 = document.createElement('span');
    span43.setAttribute("class","bi bi-clock");
    var span44 = document.createElement('span');
    span44.setAttribute("class","event-icon-label");
    span44.innerHTML = event_timing;
    div4.appendChild(span43);
    div4.appendChild(span44);
    var span45 = document.createElement('span');
    span45.setAttribute("class","bi bi-geo-alt");
    var span46 = document.createElement('span');
    span46.setAttribute("class","event-icon-label");
    span46.innerHTML = e5;
    div4.appendChild(span45);
    div4.appendChild(span46);
    div5.setAttribute('class','event-description');
    div5.innerHTML = e6;
    span2.appendChild(div3);
    span2.appendChild(div4);
    span2.appendChild(div5);
    event.appendChild(span2);
    var span3 = document.createElement('span');
    span3.setAttribute('class','event-cancel');
    span3.innerHTML = 'x';
    span3.setAttribute('id',e1);
    span3.setAttribute('onclick','cancel_event(this)');
    event.appendChild(span3);
    cal.appendChild(event);
    var grp = get_group();
    var myJSON, text, obj;
    var flag = true;
    text = localStorage.getItem(grp+"_calendar");
    obj = JSON.parse(text);
    var new_obj = {name:e1, date:event_date[2]+'-'+event_date[1]+'-Monday', time:event_timing, location:e5, description:e6};
    obj.push(new_obj);
    var myJSON = JSON.stringify(obj);
    localStorage.setItem(grp+"_calendar",myJSON);
    closeForm();
}

function get_group() {
    var text = localStorage.getItem("curr_group");
    var obj = JSON.parse(text);
    return obj.curr_group_name;
}

function load_events() {
    var grp = get_group();
    var myJSON, text, obj;
    var flag = true;
    text = localStorage.getItem(grp+"_calendar");
    obj = JSON.parse(text);
    for(var i = 0; i<obj.length; i++){
        var cal = document.getElementById('cal');
        var event = document.createElement('div');
        event.setAttribute("class","calender-event rounded");
        var span1 = document.createElement('span');
        span1.setAttribute("class","event-left");
        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        var event_date = obj[i].date.split('-')
        div1.setAttribute('class','event-date rounded');
        div1.innerHTML = event_date[0];
        div2.setAttribute('class','event-month');
        div2.innerHTML = event_date[1];
        span1.appendChild(div1);
        span1.appendChild(div2);
        event.appendChild(span1);
        var span2 = document.createElement('span');
        span2.setAttribute("class","event-right");
        var div3 = document.createElement('div');
        var div4 = document.createElement('div');
        var div5 = document.createElement('div');
        div3.setAttribute('class','event-month');
        div3.innerHTML = obj[i].name;
        div4.setAttribute('class','event-icons');
        var span41 = document.createElement('span');
        span41.setAttribute("class","bi bi-calendar");
        var span42 = document.createElement('span');
        span42.setAttribute("class","event-icon-label");
        span42.innerHTML = event_date[2];
        div4.appendChild(span41);
        div4.appendChild(span42);
        var span43 = document.createElement('span');
        span43.setAttribute("class","bi bi-clock");
        var span44 = document.createElement('span');
        span44.setAttribute("class","event-icon-label");
        span44.innerHTML = obj[i].time;
        div4.appendChild(span43);
        div4.appendChild(span44);
        var span45 = document.createElement('span');
        span45.setAttribute("class","bi bi-geo-alt");
        var span46 = document.createElement('span');
        span46.setAttribute("class","event-icon-label");
        span46.innerHTML = obj[i].location;
        div4.appendChild(span45);
        div4.appendChild(span46);
        div5.setAttribute('class','event-description');
        div5.innerHTML = obj[i].description;
        span2.appendChild(div3);
        span2.appendChild(div4);
        span2.appendChild(div5);
        event.appendChild(span2);
        var span3 = document.createElement('span');
        span3.setAttribute('class','event-cancel');
        span3.innerHTML = 'x';
        span3.setAttribute('id',obj[i].name);
        span3.setAttribute('onclick','cancel_event(this)');
        event.appendChild(span3);
        cal.appendChild(event);
    }
}

function cancel_event(x) {
    var flag = confirm('Are you sure you want to delete ' + x.id);
    if(flag) {
        var grp = get_group();
        var obj = JSON.parse(localStorage.getItem(grp+'_calendar'));
        var i;
        for(i = 0; i<obj.length; i++){
            if(obj[i].name == x.id){
                break; 
            }
        }
        obj.splice(i,1);
        localStorage.setItem(grp+'_calendar',JSON.stringify(obj));
        alert('Event Deleted!!!');
        location.reload();
    }
}