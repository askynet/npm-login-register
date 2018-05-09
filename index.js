
var config = require('./config/default');
var mongo = require('mongodb').MongoClient;
var host = config.Database.dbConfig.host;
var port = config.Database.dbConfig.port;
var db_user = config.Database.dbConfig.port;
var db_password = config.Database.dbConfig.port;
var sendMail =config.sendMail;
var sendPass=config.sendPass;
var email_validator = require('email-validator');
var getHashPWD=require('./getHashPWD');
var mailer=require('./mailer');
const mysql = require('mysql');
var mongodb = require('mongodb');

module.exports =class LoginRegister{
	constructor(dbName,userTable,dbType){
		if(dbType=='mongodb')
		{
			this.dbName=dbName;
			this.database='';
			this.userTable=userTable;
			this.dbType=dbType;
		}
		if(dbType=='mysql'){
		this.dbName=dbName;
		this.userTable=userTable;
		}
		this.dbType=dbType;
	}
	getDbConnect(callback){
		if(this.dbType=='mongodb'){
			const URL="mongodb://" + host + ":" + port + "/" + this.dbName;
		    mongo.connect(URL, function (err, db) {
			////console.log(err);
			  if (!err) {
			////console.log('hey there!! i am using mongodb');
			callback(db);
			  } else {
			////console.log('db connection error');
			callback(null);
			  }
		    });
		}else{
			var con = mysql.createConnection({
				host: host,
				user: db_user,
				password: db_password,
				database: this.dbName
			  });
			  
			  con.connect(function(err) {
				if (err) {
					callback(null)
				}else{
					console.log("Connected!");
					callback(con);
				}
				
			  });
		}

	}
	userLogin(email,password,callback)
	{
	 var thisVar=this;
		this.getDbConnect(function(database1){
			////console.log(database1);
			//console.log(thisVar.userTable);
			if(database1!=null){
				switch(thisVar.dbType){
					case 'mongodb':
					database1.collection(thisVar.userTable).findOne({ "Email": email }).then(function (result) {
					
						if (result==null)
						   callback(new Array(0,'email or password is wrong'));
						else{
							var hash = result.Password;
						//////console.log(result);
						var checkPWD = getHashPWD.validateHash(hash, password);
						if (checkPWD) {
							callback(new Array(1,Array(result)));
						} else {
							callback(new Array(0,'email or password is wrong'));
						}
						}
						//  res.status(200).json({"msg":"at end"});
					});
					break;

					case 'mysql':

					break;
				}
			}else{
				callback(new Array(0,'db connection problem')); 
			}
		})
		
	}

	userRegister(userData,callback){
		if(userData.Email!=undefined&&email_validator.validate(userData.Email) && userData.Password.toString().length>5 && userData.Name.length>2){
			var currentDate=new Date();
			var email=(userData.Email!=undefined)?userData.Email:'';
			var password=(userData.Password!=undefined)?userData.Password:'';
			var userName=(userData.Name!=undefined)?userData.Name:'';
			var hash=getHashPWD.createHash(password);
			userData['Password']=hash.hash;
			userData['Token']=hash.token;
			userData['DelStatus']=false;
			userData['CreateOn']=currentDate;
			userData['UpdateOn']=currentDate;

			var thisVar=this;
		    this.getDbConnect(function(database1){
			if(database1!=null){
			//	console.log(thisVar.dbType)
				switch(thisVar.dbType){
					case 'mongodb':
				database1.collection(thisVar.userTable).findOne({ "Email": email }).then(function (result) {
					if (result == null) {
						database1.collection(thisVar.userTable).insertOne(userData, function (error, response) {
							if(error) {
							  //  //console.log('Error occurred while inserting');
							  callback(new Array(0,'Error occurred while registration'));
							} else {
								callback(new Array(1,Array(response.ops[0])));
							}
						});
					}else{
						callback(new Array(0,'Already register'));
					}
				});
				break;
				 case 'mysql':
				 var userString="SELECT * FROM "+thisVar.userTable+" WHERE Email="+email;
				 database1.query(userString, function (err, result) {
					if (err) {

					}else{
						console.log(result);
					}
					
				  });
				 break;
			  }
			}else{
				callback(new Array(0,'db connection problem')); 
			}
		});
			
		}else{
			var msg="Invalid parameters";
			if(userData.Name.length<3){
				msg="Name should be greater than 3 char long"
			}
			if(userData.Password.toString().length<6){
				msg="Password should be greater than 6 char long";
			}
			if(userData.Email==undefined || !email_validator.validate(userData.Email)){
				msg="Invalid email address";
			}
			
			
			callback(new Array(0,msg)); 
		}
	}
	checkToken(userId,token,callback){
		var thisVar=this;
		this.getDbConnect(function(database1){
			if(database1!=null){
				try{
					switch(thisVar.dbType){
						case 'mongodb':
					var _userId=new mongodb.ObjectId(userId);
				    database1.collection(thisVar.userTable).findOne({ "_id": _userId ,Token:token }).then(function (result) {
					  if (result==null){
						callback(new Array(0,'authentication failed')); 
					  }else{
						callback(new Array(1,'valid user')); 
					  }
					});
					break;

					case 'mysql':
					callback(new Array(0,'db connection problem')); 
					break;
				}
				}catch(e){
					//console.log(e);
					callback(new Array(0,'invalid userid')); 
				}
			}else{
				callback(new Array(0,'db connection problem')); 
			}
		});
	}
	forgotPassword(email,callback){
		var thisVar=this;
		this.getDbConnect(function(database1){
			if(database1!=null){
				try{
					switch(thisVar.dbType){
						case 'mongodb':
				    database1.collection(thisVar.userTable).findOne({ "Email":email }).then(function (result) {
					  if (result==null){
						callback(new Array(1,'if your email id is present in db then we will sent you latest password on your mailbox')); 
					  }else{
						var password = Math.random().toString(36).slice(-8);
						var hash=getHashPWD.createHash(password);
						var newPass=hash.hash;
						var newToken=hash.token;
						database1.collection(thisVar.userTable).updateOne({Email:email},{ $set: {"Password":newPass,"Token":newToken}}, function(err, result) {
							if (err) {
								callback(new Array(0,'something went wrong..please try again later')); 
							}else{
								mailer.sendMail(email,'Forgot Password','Your new password is = '+password,function(isSend){
									if(isSend){
										callback(new Array(1,'if your email id is present in db then we will sent you latest password on your mailbox'));
									}else{
										callback(new Array(0,'something went wrong..please check email id')); 
									}
								});
								}
						});
						 
					  }
					});
					
					break;
					case 'mysql':
					callback(new Array(0,'db connection problem')); 
					break;
				 }
				}catch(e){
					console.log(e);
					callback(new Array(0,'something went wrong..please check email id')); 
				}
			}else{
				callback(new Array(0,'db connection problem')); 
			}
		});
	}

	changePassword(email,oldpass,newpass,callback){
		var thisVar=this;
		if(oldpass!=newpass && oldpass.toString().length>5 && newpass.toString().length>5){
			this.userLogin(email,oldpass,function(result){
				if(parseInt(result[0])==1){
					thisVar.getDbConnect(function(database1){
					var hash=getHashPWD.createHash(newpass);
						var newPass=hash.hash;
						var newToken=hash.token;
						switch(thisVar.dbType){
							case 'mongodb':
						database1.collection(thisVar.userTable).updateOne({Email:email},{ $set: {"Password":newPass,"Token":newToken}}, function(err, result) {
							if (err) {
								callback(new Array(0,'something went wrong..please try again later')); 
							}else{
								callback(new Array(1,'password changed successfully')); 	
							}
						});
						break;
					case 'mysql':
					callback(new Array(0,'db connection problem')); 
					break;
					  }
					});
				}else{
					callback(new Array(0,'invalid old password'));
				}
			});
		}else{
			if(oldpass.toString().length<6 || newpass.toString().length<6){
				callback(new Array(0,'password length should be 6 char long'));
			}
			else{
				if(oldpass==newpass){
					callback(new Array(0,'new password and old password must be different'));
				}
			}
		}
	}
}

