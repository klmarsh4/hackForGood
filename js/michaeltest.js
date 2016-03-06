var accessToken = getAccessToken();
// The tag that we want
var tagName = null;
function newTag(){
    //if(tagName == null){
    //tagName = prompt("Please enter the tag you'd like to search for", "<tag goes here>");
    //}
    tagName = document.getElementById("tag").value;
    var recentTagMediaUrl = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + accessToken;

    $.ajax({
        method: "GET",
        url: recentTagMediaUrl,
        dataType: "jsonp",
        jsonp : "callback",
        jsonpCallback: "jsonpcallback",
        success: searchForTag,
        error: function(){console.log("error");},
        complete: function(){console.log("complete");}
    });
}






function displayImg(obj){
	//console.log(myJson);
	//var obj = JSON.parse(myJson);
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


