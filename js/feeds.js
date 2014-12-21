'use strict'

var feedCount = 0;
var totalfeeds = [];
var feed = function(id,type,timestamp,content){
	this._id = id;
	this._type = type;
	this.timestamp = timestamp;
	this._content = content;
}

feed.prototype.getId = function(){
	return this._id;
};

feed.prototype.getType = function(){
	return this._type;
};

function insertFeed(){
	var getPost = document.getElementById('postItem').value;
	if(getPost){
		var dateTime = new Date().toLocaleString();	
		var pattern = /(http:\/\/|www\.)\S+/i;	
		var typeOfPost = pattern.test(getPost);
		feedCount++;		
		if(typeOfPost){
			var newFeed = new feed(feedCount,"url",dateTime,getPost);
		}else{
			var newFeed = new feed(feedCount,"text",dateTime,getPost);
		}
		
	}else{
		return;
	}
		
	createFeed(newFeed);
}

function createFeed(newFeed){
	totalfeeds.push(newFeed);
	document.getElementById('postItem').value = '';
	showFeeds();
}

function showFeeds(){
	if(totalfeeds.length == 0){
		document.getElementById('feedContainer').innerHTML = '';
		return;
	}
	var feedLength = totalfeeds.length;
	var dataFeed = '';
	for(var i=0; i < feedLength;i++){
		var fContent;
		if(totalfeeds[i]._content == 'text'){
			fContent = totalfeeds[i]._content;
		}else{
			fContent = parseUrl(totalfeeds[i]._content);
		}
		
		var content = "<article class='feeds "+totalfeeds[i]._type+"' ><span class='profileIcon'></span><span class='feedcontent'>"+fContent+"</span><span class='close' onclick='deleteFeed("+totalfeeds[i]._id+")'>x</span><span class='time'>"+totalfeeds[i].timestamp +"</span></article> <br>";
		dataFeed = dataFeed.concat(content);		
	}
	document.getElementById('feedContainer').innerHTML = dataFeed;
}

function deleteFeed(feedId){
var len = totalfeeds.length;
	for(var i=0;i<len;i++){
		if(totalfeeds[i]._id == feedId){
			totalfeeds.splice(i,1);
			break;
		}
	}
	showFeeds();
}

function parseUrl(text){
var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return text.replace(urlRegex, function(url,b,c) {
        var url2 = (c == 'www.') ?  'http://' +url : url;
        return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
    });
}

function logout(){
	window.location = 'index.html';
}

function setPage(page){
	if(page == "showFeed"){
		document.getElementById('profile-section').style.display = 'none';
		document.getElementById('feed-section').style.display = 'block';
		document.getElementById('showProfile').removeAttribute('class');
		document.getElementById(page).setAttribute('class','active');
		showFeeds();		
	}else{
		document.getElementById('profile-section').style.display = 'block';
		document.getElementById('feed-section').style.display = 'none';	
		document.getElementById('showFeed').removeAttribute('class');
		document.getElementById(page).setAttribute('class','active');
		displayProfileInfo();
	}
}

