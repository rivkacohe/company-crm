const express = require('express');
const router = express.Router();
const cm = require('../controllers/customers');

  router.get   ('/', cm.customersList);
  router.get   ('/find', cm.findCustomer);
  router.patch ('/', cm.updateCustomer);
  router.post  ('/', cm.addCustomer);
  router.delete('/', cm.deleteCustomer);
  
  module.exports=router;