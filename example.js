const LoginRegister=require('./index');
//const handler=new LoginRegister('mydb','users','mongodb');
var handler=new LoginRegister('mydb','users2','mongodb');

//var handler=new LoginRegister('localhost:27017','','','mydb','users','mongodb');

//var handler=new LoginRegister('localhost','root','','mydb','users2','mysql');


/*handler.userLogin('aahire@asas.com',123456,function(result){
    console.log(result);
});*/

userData={
    Email:'aahire@inspeero.com',
    Name:"aka",
    Password:123456
}
//console.log(handler);
handler.userRegister(userData,function(result){
    console.log(result);
});