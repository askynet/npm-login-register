const LoginRegister=require('./index');
var handler=new LoginRegister('mydb','users','mongodb');


//for login
handler.userLogin('youremail@host.com','qwerty',function(result){
    console.log(result);
});


/*
//for register
 userData={
    Email:'youremail@host.com',
    Name:"aka",
    Password:123456
}
//console.log(handler);
handler.userRegister(userData,function(result){
    console.log(result);
});
*/

/*
//check for token

handler.checkToken('5af2bfafb94355549e7e1b28','249a1bfc0bc60df3629eb4ac8a88a7ff',function(result){
    console.log(result);
});

*/
/*
//forgotPassword

handler.forgotPassword('youremail@host.com',function(result){
    console.log(result);
});

*/

/*
//change password

handler.changePassword('youremail@host.com','123456','qwerty',function(result){
    console.log(result);
});

*/