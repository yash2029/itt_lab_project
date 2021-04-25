function w3_open() {
    document.getElementById("mySidebar").style.width = "15%";
    document.getElementById("mySidebar").style.display = "inline-block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function change_pic(x){
    var a = document.getElementById("main-display-img");
    a.src = x.src;
    a.alt = x.alt;
    var b = document.getElementById('caption-div');
    var grp = get_group();
    var text = localStorage.getItem(grp+'_images');
    var obj = JSON.parse(text);
    for(var i = 0; i<obj.length; i++){
        // console.log(obj[i].url+' '+x.alt)
        if(obj[i].url == x.alt){
            b.innerHTML = obj[i].caption;
            break;
        }
    }
}

function delete_picture() {
    var a = document.getElementById("main-display-img");
    console.log(a.alt);
    if(a.alt == './images/broken-image.png'){
        return;
    }
    var flag = confirm('Are you sure you want to delete the picture?');
    if(flag == false){
        return;
    }
    var grp = get_group();
    var text = localStorage.getItem(grp+'_images');
    var obj = JSON.parse(text);
    var i;
    for(i = 0; i<obj.length; i++){
        if(obj[i].url == a.alt){  
            break;
        }
    }
    console.log(i);
    obj.splice(i,1);
    localStorage.setItem(grp+'_images',JSON.stringify(obj));
    location.reload();
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function get_group() {
    var text = localStorage.getItem("curr_group");
    var obj = JSON.parse(text);
    return obj.curr_group_name;
}

var img_url;
var flag = 0;
function loadFile(input){
    flag = 1;
    //img_url = URL.createObjectURL(event.target.files[0]);
    img_url = "./images/"+input.files[0].name;
}


function upload_pic(){
    if(flag == 1){
        flag = 0;
        var x = document.getElementById("scroll-div");
        var new_div = document.createElement("div");
        new_div.setAttribute("class","gallery");
        var new_img = document.createElement("img");
        new_img.src = img_url;
        new_img.setAttribute("class","gallery-img inner-img");
        new_img.setAttribute('style','cursor: pointer;');
        new_img.setAttribute('alt',img_url);
        new_img.setAttribute("onclick","change_pic(this)");
        new_div.appendChild(new_img);
        x.appendChild(new_div);
        closeForm();
        var a = document.getElementById("main-display-img");
        a.src = img_url;
        a.alt = img_url;
        var y = document.getElementById('caption-input').value;
        var b = document.getElementById('caption-div');
        b.innerHTML = y;
        var grp = get_group();
        var text = localStorage.getItem(grp+'_images');
        var obj = JSON.parse(text);
        var new_obj = {url: img_url, caption: y};
        obj.push(new_obj);
        text = JSON.stringify(obj);
        localStorage.setItem(grp+'_images',text);
    }
}

function load_images() {
    var grp = get_group();
    var text = localStorage.getItem(grp+'_images');
    var obj = JSON.parse(text);
    var x = document.getElementById('scroll-div');
    for(var i = 0; i<obj.length; i++){
        var d = document.createElement('div');
        d.setAttribute('class','gallery');
        var im = document.createElement('img');
        im.setAttribute('class','gallery-img inner-img');
        im.setAttribute('style','cursor: pointer;');
        im.setAttribute('onclick','change_pic(this)');
        im.setAttribute('alt',obj[i].url);
        im.setAttribute('src',obj[i].url);
        d.appendChild(im);
        x.appendChild(d);
    }
    if(obj.length > 0){
        var a = document.getElementById("main-display-img");
        a.src = obj[0].url;
        a.alt = obj[0].url;
        var b = document.getElementById('caption-div');
        b.innerHTML = obj[0].caption;
    }
}