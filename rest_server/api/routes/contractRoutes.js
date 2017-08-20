'use strict';
module.exports = function(app) {
  var contract = require('../controllers/contractController');

  // User Routes
  app.route('/contract')
    .get(contract.get_contracts)
    .post(contract.add_new_contract);

  app.route('/contract/:coinbase')
    .get(contract.get_contract_info)
    .post(contract.update_contract_info);
};
