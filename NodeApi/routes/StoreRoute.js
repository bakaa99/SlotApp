const express = require('express');
const app = express();
const router = express.Router();

const Store = require('../models/Store');

router.route('/add').post(function (req, res) {
    const store = new Store(req.body);
    store.save()
      .then(course => {
      res.status(200).json({'Store': 'Store added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save the Store into database");
      });
  });

  router.route('/').get(function (req, res) {
    Store.find(function (err, Stores){
      if(err){
        console.log(err);
      }
      else {
        res.json(Stores);
      }
    });
  });

module.exports = router;