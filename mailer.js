var mail = require('mail').Mail({
    host: 'smtp.gmail.com',
    username: 'inspeerodev@gmail.com',
    password: 'Insper160113'
  });
  
  class Mailer{ 
     
     sendMail(to,subject,msg,callback) {
       /*** ***/
  var email 	= require("emailjs/email");
  var server 	= email.server.connect({
     user:    "inspeerodev@gmail.com", 
     password:"Insper160113", 
     host:    "smtp.gmail.com", 
     ssl:     true
  });
  
  // send the message and get a callback with an error or details of the message that was sent
  server.send({
     text:    msg, 
     from:    "inspeerodev@gmail.com", 
     to:      to,
     cc:      "",
     subject: subject
  }, function(err, message) { if(!err){ callback(true)}else{ callback(false)} });
  
  /*** ****/
      }
  }
  
  module.exports = new Mailer();