'use strict';
var mongoose = require('mongoose'),
    Contract = mongoose.model('Contracts');

exports.get_contracts = function (req, res){
    Contract.find({}, function(err, contracts){
        if(err){
            res.send(err)
        }else{
            res.json(contracts)
        }
    })
}

exports.add_new_contract = function (req, res) {
  var new_contract = new Contract(req.body)
  new_contract.save(function(err, user){
    if (err){
      res.send(err)
    }else{
      res.json(user)
    }
  })     
}

exports.get_contract_info = function (req, res){
  console.log(req.params.address)
  Contract.findOne({address: req.params.address}, {}, function(err, contract){
    if (err){
      res.send(err);
    }else{
      res.send(contract);
    }
  })
}

exports.update_contract_info = function (req, res){
  Contract.findOneAndUpdate({address: req.params.address}, req.body, {new: true}, function(err, contract){
    if (err){
      res.send(err);
    }else{
      res.json(contract);
    }
  })
}


