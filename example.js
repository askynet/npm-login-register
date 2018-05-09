const LoginRegister=require('./index');
//const handler=new LoginRegister('mydb','users','mongodb');
//var handler=new LoginRegister('mydb','users2','mongodb');

var handler=new LoginRegister('mydb','users','mongodb');


//for login
handler.userLogin('aahire@inspeero.com','qwerty',function(result){
    console.log(result);
});


/*
//for register
 userData={
    Email:'aahire@inspeero.com',
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

handler.forgotPassword('aahire@inspeero.com',function(result){
    console.log(result);
});

*/

/*
//change password

handler.changePassword('aahire@inspeero.com','123456','qwerty',function(result){
    console.log(result);
});

*/