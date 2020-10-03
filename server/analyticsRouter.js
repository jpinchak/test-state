const express = require('express');
const router = express.Router();
const db = require('./models.js');
const traql = require('./traql.js');

router.post(
  '/',
  (req, res, next) => {
    // put aql into traql
    traql[req.body.mutationId].aqlsReceivedBack.push(req.body);
    console.log('traql from analytics router', traql);
    // check if expectedNumberOfAqls in Traql for mutation ID is eqal to length of expectedNumberOfAqls
    //if so, send all aqls to db
    //if not, check how much time has passed
    const queryString = `insert into Aql values ($1, $2, $3, $4, $5, $6, $7)`;
    console.log(req.body);
    const values = [
      req.body.id,
      req.body.mutationSendTime,
      req.body.mutationReceived,
      req.body.subscriberReceived,
      req.body.roundtripTime,
      req.body.mutationId,
      req.body.resolver,
    ];
    db.query(queryString, values, (err, res) => {
      if (err) {
        console.log(err);
        return next(err);
      } else return next();
    });
  },
  (req, res) => {
    res.sendStatus(200);
  }
);

module.exports = router;
