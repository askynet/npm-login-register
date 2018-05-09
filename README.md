# npm-login-register

npm-login-register is handle all user related basic operations such as user registration,user login, check user token ,change user password and forgot password functionality in your own database.

This plugin is develop to cut development task for all above basic functionalities. 
And for all this you need to just install npm package and implement followings methods as per your need.

Currently this package is only for MongoDB users.

## Install
```
  npm install npm-login-register
```  
##### For Email Sending and Database setup

    For DB Host config and mail sending
    Change in node_modules/npm-login-register/config/default.json
    
## Import package and instantiate
```
const LoginRegister=require('npm-login-register');
var handler=new LoginRegister('mydb','users','mongodb');
```
## User Registration
```
userData={
    Email:'aahire@inspeero.com',
    Name:"aka",
    Password:123456,
    ......,
    ......
}
handler.userRegister(userData,function(result){
    console.log(result);
});
```
##### Result
  ```
  [1/0,'message']
  result[0] == 0 => error occur
  result[0] == 1 => success
  ```
## User Login
```
//for login
handler.userLogin(email,password,function(result){
    console.log(result);
});
```
##### Result
  ```
  [1/0,'message']
  result[0] == 0 => error occur
  result[0] == 1 => success
  ```
## Check User Token

```
//check for token

handler.checkToken(userid,usertoken,function(result){
    console.log(result);
});
```
##### Result
  ```
  [1/0,'message']
  result[0] == 0 => error occur
  result[0] == 1 => success
  ```
## Forgot Password
```
//forgotPassword

handler.forgotPassword(email,function(result){
    console.log(result);
});
```
##### Result
  ```
  [1/0,'message']
  result[0] == 0 => error occur
  result[0] == 1 => success
  ```
## Change Password

```
//change password

handler.changePassword(email,oldpass,newpass,function(result){
    console.log(result);
});
```
##### Result
  ```
  [1/0,'message']
  result[0] == 0 => error occur
  result[0] == 1 => success
  ```

