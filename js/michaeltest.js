var accessToken = getAccessToken();

// The tag that we want
var tagName = "puppy";

var recentTagMediaUrl = "https://api.instagram.com/v1/tags/" + tagName + "/media/recent?access_token=" + accessToken ;

//var recentTagMedia = JSON.parse(text);


httpGetAsync(recentTagMediaUrl, displayImg);

function displayImg(myJson){
	
	var obj = parse(myJson);
	var imgUrl = obj.data[0].images.low_resolution.url;
	window.location = imgUrl;
}





function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


