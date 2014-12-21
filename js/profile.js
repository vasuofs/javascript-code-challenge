'use strict'

 function setProfileImage(getFile){
	var purl = document.getElementById('imgUrl').value;
        var files = getFile.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /image.*/;
            if (!file.type.match(imageType)) {
                continue;
            }
            var img=document.getElementById("profileImg");
            img.file = file;
            var reader = new FileReader();
            reader.onload = (function(aImg) {
                return function(e) {
                    aImg.src = e.target.result;
                };
            })(img);
            reader.readAsDataURL(file);
        }
 }
 
 function User(name, age, phone, email, address, imageurl) {
	this.name = name;
	this.age = age;
	this.phone = phone;
	this.email = email;
	this.address = address;
	this.imageurl= imageurl;
}

function saveProfile(){
	var n = document.getElementById("name").value;
	var a = document.getElementById("age").value;
	var p = document.getElementById("tel").value;
	var mail = document.getElementById("email").value;
	var ph = document.getElementById("add").value;
	var imgurl = document.getElementById("imgUrl").value
	var user = new User(n,a,p,mail,ph,imgurl);
	localStorage.setItem("profile", JSON.stringify(user));
	return true;
}

function displayProfileInfo(){
	try {
	var userData = localStorage.getItem("profile");
	var user = JSON.parse(userData);
	if(user != undefined || user != null) {
		document.getElementById("name").value = user.name;
		document.getElementById("age").value = user.age;
		document.getElementById("tel").value = user.phone;
		document.getElementById("email").value = user.email;
		document.getElementById("add").value = user.address;
		document.getElementById("imgUrl").value = user.imageurl;
	}
	} catch (e) {
		console.log(e);
	}	
}
