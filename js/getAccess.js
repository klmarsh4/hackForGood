var url = window.location.href;
var tokenIndex = url.indexOf("#access_token");
if(tokenIndex == -1){
  window.location = "https://api.instagram.com/oauth/authorize/?client_id=63e5ba506c314fbe856734e0b8421191&redirect_uri=" +url+ "REDIRECT-URI&response_type=token";
}
else {
  var accessToken = url.substring()
}
accessToken
