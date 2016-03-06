function getText(obj){
  var k = 4;
  var caption = obj.data[k].caption.text;
  var mediaId = obj.data[k].id;
  var accessToken = getAccessToken();
  //document.getElementById("p").innerHTML = caption
  var text = caption;
  $.ajax({
    method: "GET",
    url: "https://api.instagram.com/v1/media/"+mediaId+"/comments?access_token=" + accessToken,
    dataType: "jsonp",
    jsonp : "callback",
    jsonpCallback: "jsonpcallback",
    success: function(obj){
      //var comments[];
      //console.log(obj);
      for(var i=0; i<obj.data.length;i++){
        //comments.push(comment.text);
        //document.getElementById("p").innerHTML += ("<br>" + obj.data[i].text);
        text += (" " + obj.data[i].text);
      }
    },
    error: function(){console.log("error");},
    complete: function(){$.post("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment",
    "apikey=9b6a97c25e1c0a3b5a2989591629d81aefabd14c&text="+text+"&outputMode=json",
    function(obj){console.log(obj);});}
  });
}