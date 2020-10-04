const express = require('express');
const router = express.Router();

router.post(
  '/',
  (req, res, next) => {
    // put aql into traql
    console.log('request: ', req.body);
    req.traql[req.body.mutationId].aqlsReceivedBack.push(req.body);
    return next();
  },
  (req, res) => {
    res.sendStatus(200);
  }
);

module.exports = router;
