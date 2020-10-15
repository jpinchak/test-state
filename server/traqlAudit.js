const axios = require('axios');

function traqlAudit(traql) {
  let open = true;
  if(open) {
    open = false;
    // if there are any mutations that have analytics that need to be saved
    // if there are any untracked traql entries
    if (Object.keys(traql).length > 1) {  //*-------------------------------------- TODO: WE HAVE TO MAKE THIS 2 BUT I THINK I NEED IT AT 1 FOR TESTING----------------*
      // loop through the untracked traql entries
      for (let key in traql) {
        // if it's not the subResolver property and this mutation had any subscriptions (or subscribers) 
        if (key !== 'subResolvers' && key !== 'userToken' && traql[key].expectedNumberOfAqls >= 1) {
          // if we receive back all of the expected Aqls, aka have resolved this traql entry
          if (traql[key].expectedNumberOfAqls === traql[key].aqlsReceivedBack.length) {
            //TODO: THIS IS WHERE FIRST QUERY WILL BE SENT FROM
            // send the traql back to the server so it can be stored in the DB 
            // add the key attribute to traql so the db has it
            const postReq = {
              method: 'post',
              url: 'http://localhost:3000/aqls',
              data: {
                traql: traql[key],
                entryType: 'success'
              }
            };
            axios(postReq)

            // LOOKS LIKE IT'S NOT SUCCESSFULLY DELETING TRAQL

              .then(res => {
                delete traql[key];
                console.log('successful addition of success aqls to db');
              })
              .catch(err => console.log('err 1'));
          } else {
            // check if traql obj has "give me one more chance property"
            if (traql[key].probation) {
              // if it doesnt, give it the property and continue
              // otherwise send successful aqls to server for entry into the db
              // add the key attribute to traql so the db has it
              const postReq = {
                method: 'post',
                url: 'http://localhost:3000/aqls',
                data: {
                  traql: traql[key],
                  entryType: 'error'
                }
              };
              axios(postReq)
                .then(res => {
                  delete traql[key];
                  console.log('successful addition of error aqls to db');
                })
                .catch(err => console.log('err 2'));
            } else {
              traql[key].probation = true;
            }
          }      
        }          
      }        
    }
    open = true;
  }
}

module.exports = traqlAudit;