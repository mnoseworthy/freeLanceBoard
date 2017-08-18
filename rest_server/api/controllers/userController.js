'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.add_new_user = function (req, res) {
  var new_user = new User(req.body)
  new_user.save(function(err, user){
    if (err){
      res.send(err)
    }else{
      res.json(user)
    }
  })     
}

exports.get_user_info = function (req, res){
  console.log(req.params.coinbase)
  User.findOne({coinbase: req.params.coinbase}, {}, function(err, user){
    if (err){
      res.send(err);
    }else{
      res.send(user);
    }
  })
}

exports.update_user_info = function (req, res){
  User.findOneAndUpdate({coinbase: req.params.coinbase}, req.body, {new: true}, function(err, user){
    if (err){
      res.send(err);
    }else{
      res.json(user);
    }
  })
}


