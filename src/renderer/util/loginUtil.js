import RndNum from "./ranNum";
var querystring = require('querystring')

/* 
  response_type：表示授权类型，必选项，此处的值固定为"code"
  client_id：表示客户端的ID，必选项
  redirect_uri：表示重定向URI，可选项
  scope：表示申请的权限范围，可选项
  state：表示客户端的当前状态，可以指定任意值，认证服务器会原封不动地返回这个值。
 */
var loginUtil ={
  login:function (vue) {
    vue.$config.code = RndNum(4);
    var authorUrl = vue.$config.userAuthorizationUri;
    authorUrl = authorUrl + ('?' + vue.$querystring.stringify({
      client_id:vue.$config.clientId,
      response_type:vue.$config.response_type,
      scope:vue.$config.scope,
      state:vue.$config.state,
      redirect_uri:vue.$config.redirect_uri, 
    }))
    window.location.href = authorUrl;
  },
  logout:function (vue,return_url) {
    vue.$router.push('/logout'+"?return_url="+return_url)
  },
  checkLogin:function(vue){
    var tokenInfo = vue.$token.loadToken();
    if (tokenInfo.access_token===null ||tokenInfo.access_token==="null" ){
      return false;
    }
    return true;
  }
} 

export default loginUtil;
