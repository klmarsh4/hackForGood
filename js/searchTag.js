var accessToken = getAccessToken();
// The tag that we want
var tagName = "bob";


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


function searchForTag(obj){
	var dataCount=obj.data.length;
	while (dataCount>0){
		 var tagCount=obj.data[dataCount - 1].tags.length
		while (tagCount>0){
			if (obj.data[dataCount-1].tags[tagCount-1] == tagName){

				document.write(obj.data[dataCount-1].link + "<br>")
			}
		tagCount=tagCount-1;
		}
		
		dataCount = dataCount - 1;
	}
		
	
}

/*
function displayImg(obj){
	//console.log(myJson);
	//var obj = JSON.parse(myJson);
	var imgUrl = obj.data[0].images.low_resolution.url;
	window.location = imgUrl;
}
*/