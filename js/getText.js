function getText(obj){
  var caption = obj.data[0].caption.text;
  var mediaId = obj.data[0].id;
  var accessToken = getAccessToken();
  document.getElementById("p").innerHTML = caption
  $.ajax({
    method: "GET",
    url: "https://api.instagram.com/v1/media/"+mediaId+"/comments?access_token=" + accessToken,
    dataType: "jsonp",
    jsonp : "callback",
    jsonpCallback: "jsonpcallback",
    success: function(obj){
      //var comments[];
      console.log(obj);
      for(var i=0; i<obj.data.length;i++){
        //comments.push(comment.text);
        document.getElementById("p").innerHTML += ("<br>" + obj.data[i].text);
      }
    },
    error: function(){console.log("error");},
    complete: function(){console.log("complete");}
});
}