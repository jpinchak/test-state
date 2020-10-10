const express = require('express');
const router = express.Router();

function analyticsRouter(traql) {

  return router.post(
    '/',
    (req, res, next) => {
      // put aql into traql
      console.log('request: ', req.body);
      traql[req.body.mutationId].aqlsReceivedBack.push(req.body);
      return next();
    },
    (req, res) => {
      res.sendStatus(200);
    }
  );
}

module.exports = analyticsRouter;
