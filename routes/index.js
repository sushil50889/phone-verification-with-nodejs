var express = require('express');
// var localStorage = require('node-localstorage');
var localStorage = require('localStorage');
var router = express.Router();
var randomstring = require('randomstring');
var msg91 = require("msg91")("184440A82EtqhxWxEB5a117fce", "NODE7777", "4" );
// var otp = 5698;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/sendVerifyCode', async function(req, res, next) {
  var mobNumber = req.body.mobileNumber;
  var otp = await randomstring.generate( {length: 4, charset: '1234567890'});
  await localStorage.setItem('otp', otp);
  var message = `Your verification code is ${otp}. Thanks for your testing.`;

  msg91.send(mobNumber, message, function(err, response){
      console.log(err);
      console.log(response);
  });

  res.redirect('/verifyOtp');
});


router.get('/verifyOtp', function(req, res, next) {
  res.render('verifyOtpForm');
});


router.post('/verifyOtp', async function(req, res, next) {
  var userOtp = req.body.userOtp;

  // console.log(userOtp);
  // console.log(otp);
  var otp = await localStorage.getItem('otp');

  if (userOtp == otp){
    console.log('OTP Match.');
    res.render('verifiedPage');
  } else {
    console.log('OTP Did not Match.');
    res.render('verifyErrorPage');
  }
});



module.exports = router;
