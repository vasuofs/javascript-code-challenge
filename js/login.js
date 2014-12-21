'use strict'

function init(){
	document.getElementById('username').value = '';
	document.getElementById('password').value = '';
}

function doValidate(){
	var uname = document.getElementById('username').value;
	var pass =  document.getElementById('password').value;
	if(uname === '' && pass === ''){
		alert('Please Enter username and password !');
	}else if(uname.length > 8){
		alert('Username should be equal or less 8 character !');
	}else if(pass.length < 6){
		alert('Password should be minimum 6 character !');
	}else{
		window.location = 'feeds.html';
	}

}

window.onload = function(){
	init();
};