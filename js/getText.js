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

  var taggedPics = [];
  var picRatings = [];
function orderPics(taggedPicObjs){
  for(var i=0; i<taggedPicObjs.data.length;i++){
    taggedPics.push(taggedPicObjs.data[i]);
  }
  taggedPicObjs.data.forEach(function(data){$.post("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment",
    "apikey=9b6a97c25e1c0a3b5a2989591629d81aefabd14c&text="+data.caption.text+"&outputMode=json&showSourceText=1",
    setRating);});
  sortPics();
}

function setRating(obj){
  console.log(obj);
  for (var i=0; i<taggedPics.length && obj.text != taggedPics[i].caption.text;i++);
  picRatings[i] = obj.docSentiment;
}

function sortPics(){
    if(taggedPics.length == picRatings.length){
    var zipped = _.zip(taggedPics,picRatings);
    zipped.sort(function(a, b) {return a[1].score - b[1].score})
    console.log(zipped);
	//put array into html list
	//var urls = "", ratings = "";
  var html = "  <tr><th>Sentiment</th><th>Caption</th><th>Image</th></tr>";
	for (var i =0; i < zipped.length; i++) {
    var photo = zipped[i][0];
    var rating = zipped[i][1];
		if (rating.score<0){
      html += "<tr style=\"background-color: rgba(255,0,0,"+(-1*rating.score)+")\"> <td>" + rating.type + ":<br>" + rating.score;
    }
    else {
      html += "<tr style=\"background-color: rgba(0,255,0,"+rating.score+")\"> <td>" + rating.type + ":<br>" + rating.score;
    }
    html += "</td><td> <a href=" + photo.link + ">" + photo.caption.text + "</a> </td>"
    html += "<td> <img src=" + photo.images.thumbnail.url + "alt=" + photo.caption.text + " </td></tr>";
    //ratings += "<li>" + zipped[i][1].type + "</li>";
	}
	document.getElementById("table").innerHTML = html;
  //document.getElementById("ratings").innerHTML = ratings;
	
  } else{
    setTimeout(sortPics, 500);
  }
  
}


