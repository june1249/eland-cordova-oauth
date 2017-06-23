(function() {
  'use strict';

  angular.module('oauth.eland', ['oauth.utils'])
    .factory('$ngCordovaEland', eland);

  function eland($q, $http, $cordovaOauthUtility) {
    return { signin: oauthEland };

    /*
     * Sign into the Eland service
     *
     * @param    string appId
     * @param    array appScope
     * @param    object options
     * @return   promise
     */
    function oauthEland(appId, appScope, options) {
      var deferred = $q.defer();
      if(window.cordova) {
        if($cordovaOauthUtility.isInAppBrowserInstalled()) {
          var redirect_uri = "http://localhost/callback";
          if(options !== undefined) {
            if(options.hasOwnProperty("redirect_uri")) {
              redirect_uri = options.redirect_uri;
            }
          }
          var flowUrl = "http://121.190.89.43/#/login?client_id=" + appId + "&redirect_uri=" + redirect_uri + "&responseType=code&scope=" + appScope.join(",");
          // var flowUrl = "http://10.252.226.242/#/login?client_id=" + appId + "&redirect_uri=" + redirect_uri + "&responseType=code&scope=" + appScope.join(",");
          console.log('eland-Url: ' + flowUrl);
          if(options !== undefined && options.hasOwnProperty("auth_type")) {
            flowUrl += "&auth_type=" + options.auth_type;
          }
          var browserRef = window.cordova.InAppBrowser.open(flowUrl, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
          browserRef.addEventListener('loadstart', function(event) {
            if((event.url).indexOf(redirect_uri) === 0) {
              browserRef.removeEventListener("exit",function(event){});
              browserRef.close();
              var callbackResponse = (event.url).split("#")[1];
              console.log('callbackResponse: ' + callbackResponse);
              var responseParameters = (callbackResponse).split("&");
              var parameterMap = [];
              for(var i = 0; i < responseParameters.length; i++) {
                parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
              }
              if(parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                deferred.resolve({ access_token: parameterMap.access_token, expires_in: parameterMap.expires_in, refresh_token: parameterMap.refresh_token, token_type: parameterMap.token_type, username: parameterMap.username });
              } else {
                if ((event.url).indexOf("error_code=100") !== 0) {
                  deferred.reject("Facebook returned error_code=100: Invalid permissions");
                } else {
                  deferred.reject("Problem authenticating");
                }
              }
            }
          });
          browserRef.addEventListener('exit', function(event) {
            deferred.reject("The sign in flow was canceled");
          });
        } else {
          deferred.reject("Could not find InAppBrowser plugin");
        }
      } else {
        deferred.reject("Cannot authenticate via a web browser");
      }
      return deferred.promise;
    }
  }

  eland.$inject = ['$q', '$http', '$cordovaOauthUtility'];
})();
