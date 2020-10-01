const express = require('express');
const router = express.Router();
const db = require('./models.js');


router.post('/', (req, res, next) => {
  const queryString = `insert into Aql values ($1, $2, $3, $4, $5)`
  console.log(req.body)
  const values = [ req.body.id, req.body.mutationSendTime, req.body.mutationReceived, req.body.subscriberReceived, req.body.roundtripTime ]
  db.query(queryString, values, (err, res) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    else return next()
  })
}, (req, res) => {
  res.sendStatus(200)
})

module.exports = router 