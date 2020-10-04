const db = require('./models.js');

function traqlAudit(traql) {
  if (Object.keys(traql).length > 1) {
    for (let key in traql) {
      if (key !== 'subResolvers') {
        if (traql[key].expectedNumberOfAqls === traql[key].aqlsReceivedBack.length) {
          //loop through aqls in mutation Id
          for (let aql of traql[key].aqlsReceivedBack) {
            const queryString = `insert into Aql (id, mutation_send_time, mutation_received_time, subscriber_received_time, latency, mutation_id, resolver, expected_subscribers, successful_subscribers) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
            
            const values = [
              aql.id,
              aql.mutationSendTime,
              aql.mutationReceived,
              aql.subscriberReceived,
              aql.roundtripTime,
              aql.mutationId,
              aql.resolver,
              traql[key].expectedNumberOfAqls,
              traql[key].aqlsReceivedBack.length,
            ];
            db.query(queryString, values, (err, res) => {
              if (err) {
                console.log(err);
              }
            });
          }
          //remove traql entry for mutation id
          delete traql[key]
        } else {
          // check if traql obj has "give me one more chance property"
          if (traql[key].probation) {
            //if it doesnt, give it the property and continue
            //otherwise send successful aqls to db
            for (let aql of traql[key].aqlsReceivedBack) {
              const errorQueryString = `insert into Aql (id, mutation_send_time, mutation_received, subscriber_received, latency, mutation_id, resolver, expected_subscribers, successful_subscribers) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
              const errorQueryValues = [
                aql.id,
                aql.mutationSendTime,
                aql.mutationReceived,
                aql.subscriberReceived,
                aql.roundtripTime,
                aql.mutationId,
                aql.resolver,
                traql[key].expectedNumberOfAqls.length,
                traql[key].aqlsReceivedBack.length,
                true
              ];
              db.query(errorQueryString, errorQueryValues, (err, res) => {
                if (err) {
                  console.log(err);
                }
              });
              //create error row for db with mutationID and traql stats
              const traqlErrorQueryString = `insert into Aql (mutation_id, resolver, expected_subscribers, successful_subscribers) values ($1, $2, $3, $4, $5)`;
              const traqlErrorValues = [
                aql.mutationId,
                aql.resolver,
                traql[key].expectedNumberOfAqls.length,
                traql[key].aqlsReceivedBack.length,
                true
              ];
              db.query(traqlErrorQueryString, traqlErrorValues, (err, res) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          } else {
            traql[key].probation = true;
          }
          //remove traql entry for mutation id
          delete traql[key]
        }
      }
    }
  }
}
module.exports = traqlAudit