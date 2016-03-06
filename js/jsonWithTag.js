var accessToken = getAccessToken();
// The tag that we want
var tagname = null;
if(tagname == null){
tagName = prompt("Please enter the tag you'd like to search for", "<tag goes here>");
}
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
		 var tagMatch = false;
		while (tagCount>0){
			
			//Looks to see if there is a matching tag, if not tagMatch stays false
			
			if (obj.data[dataCount-1].tags[tagCount-1] == tagName){
				tagMatch = true;
			}
			
			tagCount=tagCount-1;
		}
		//deletes data if there was no matching tag
		if (tagMatch == false){
			
			obj.data.splice(dataCount-1,1);
			dataCount = dataCount - 1;
		}
		else{
		dataCount = dataCount - 1;
		}
	
	}
	console.log(obj);
	// CALL YOUR FUNCTION WITH NEW obj HERE
	
}
		
	