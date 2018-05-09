# npm-login-register

npm-login-register is handle all users operation such as user registration,user login, check user token ,change user password and forgot password functionality in your own database.

This plugin is develop to cut development task for all above basic functionalities. 
And for all this you need to just install npm package and implement followings methods as per your need.

Currently this package is only for MongoDB users.

## Install
```
  npm install npm-login-register
```  
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

## User Login
```
//for login
handler.userLogin(email,password,function(result){
    console.log(result);
});
```

## Check User Token

```
//check for token

handler.checkToken(userid,usertoken,function(result){
    console.log(result);
});
```

## Forgot Password
```
//forgotPassword

handler.forgotPassword(email,function(result){
    console.log(result);
});
```
## Change Password

```
//change password

handler.changePassword(email,oldpass,newpass,function(result){
    console.log(result);
});
```
