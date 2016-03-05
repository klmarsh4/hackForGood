function getAccessToken(){
  var url = window.location.href;
  var tokenIndex = url.indexOf("#access_token");
  if(tokenIndex == -1){
    window.location = "https://api.instagram.com/oauth/authorize/?client_id=63e5ba506c314fbe856734e0b8421191&redirect_uri=" +url+ "&response_type=token&scope=public_content";
  }
  else {
    var accessToken = url.substring(tokenIndex+14);
  }
  return accessToken;
}