var crypto = require('crypto');

var SaltLength = 9;

class getPWDSalt{
    createHash(password) {
        var salt = this.generateSalt(SaltLength);
        var salt2 = this.generateSalt(SaltLength);
        var hash = this.md5(password + salt);
        var token =this.md5(salt2+salt+hash);
        return {
          "hash":salt + hash,
          "token":token
        };
      }
      
       validateHash(hash, password) {
        var salt = hash.substr(0, SaltLength);
        var validHash = salt + this.md5(password + salt);
        return hash === validHash;
      }
      
       generateSalt(len) {
         var set = '0123456789abcdefghijklmnopabcdefghiq789abcdefghijklmurabcdefghistuvwxyzABCDEFGHIJ3456789abcdefghKLMN789abcdefghijkl3456789abcdefghmOPQURSTUVWXYZ',
            setLen = set.length,
            salt = '';
        for (var i = 0; i < len; i++) {
          var p = Math.floor(Math.random() * setLen);
          salt += set[p];
        }
        return salt;
      }
      
       md5(string) {
        return crypto.createHash('md5').update(string).digest('hex');
      }

       newToken() {
         var chars = "0123STUVWXTZab4567STUVWXTZab89ABCDEFGHIJKLMNOPQRSTUVWXTZabcd0123456789ABCDEFG23456789ABCDEFGHIJKLMNOPQRSTUVWXTZabHIJKLMefghiklmnopqrstuvwxyzCDEFGHIJKLMNOPQRefghiklmnopqrstuvwxyzCDEFGHIJKLMSTUVWXTZabcdefghiklmndOPQRSTUVWXT";
         var string_length = 30;
         var randomstring = '';
         for (var i = 0; i < string_length; i++) {
           var rnum = Math.floor(Math.random() * chars.length);
           randomstring += chars.substring(rnum, rnum + 1);
         }
         return randomstring;
       }
}
module.exports = new getPWDSalt();
