var config = require('./config/default');
var sendMail =config.sendMail;
var sendPass=config.sendPass;
var mail = require('mail').Mail({
    host: 'smtp.gmail.com',
    username: sendMail,
    password: sendPass
  });
  
  class Mailer{ 
     
     sendMail(to,subject,msg,callback) {
       /*** ***/
  var email 	= require("emailjs/email");
  var server 	= email.server.connect({
     user:    sendMail, 
     password:sendPass, 
     host:    "smtp.gmail.com", 
     ssl:     true
  });
  
  // send the message and get a callback with an error or details of the message that was sent
  server.send({
     text:    msg, 
     from:    sendMail, 
     to:      to,
     cc:      "",
     subject: subject
  }, function(err, message) { if(!err){ callback(true)}else{ callback(false)} });
  
  /*** ****/
      }
  }
  
  module.exports = new Mailer();