# ngCordovaOauth

이 플러그인은 [ng-cordova-oauh](https://github.com/nraboy/ng-cordova-oauth)를 기본으로하여 커스터마이징한 플러그인입니다.

자세한 사용법은 [ng-cordova-oauh](https://github.com/nraboy/ng-cordova-oauth)를 참조하시기 바랍니다.

## 설치 및 적용 방법

### Bower:

    $ bower install eland-cordova-oauth

설치 후 **www** 폴더에 있는 **index.html**파일을 찾습니다.
다음과 같이 추가합니다.

    <script src="../ng-cordova-oauth/dist/ng-cordova-oauth.min.js"></script>


### Injecting:

eland-cordova-oauth를 사용하기 위해서는 **app.js**에 eland-cordova-oauth를 injection를 해야합니다.:

    angular.module('starter', ['ionic', 'ngCordovaOauth'])

injection 후 부터 eland-cordova-oauth를 사용할 수 있습니다.


## Using ngCordovaOauth In Your Project


```javascript
$cordovaOauth.eland("CLIENT_ID_HERE", ["email","userName"]).then(function(result) {
    console.log("Response Object -> " + JSON.stringify(result));
}, function(error) {
    console.log("Error -> " + error);
});
```
$cordovaOauth.eland에서는 access_token, username, expires_in, refresh_token, token_type을 성공 콜백으로 결과 값을 반환합니다.
