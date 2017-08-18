'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  // User Routes
  app.route('/user')
    .post(user.add_new_user);

  app.route('/user/:coinbase')
    .get(user.get_user_info)
    .post(user.update_user_info);
};
