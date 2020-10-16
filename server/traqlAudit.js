const axios = require('axios');

function traqlAudit(traql) {
  let aqlsToBeSent = {
    successAqls: [],
    errorAqls: []
  }
  let open = true;
  if(open) {
    open = false;
    // if there are any untracked traql entries to be sent to the server
    if (Object.keys(traql).length > 1) {  //*-------------------------------------- TODO: WE HAVE TO MAKE THIS 2 BUT I THINK I NEED IT AT 1 FOR TESTING----------------*
      let postReq = {
        method: 'post',
        url: 'http://localhost:3000/aqls'
      };
      // loop through the untracked traql entries
      for (let key in traql) {
        // if it's not the subResolver or UserToken property and this mutation had any subscriptions (or subscribers) 
        if (key !== 'subResolvers' && key !== 'userToken' && traql[key].expectedNumberOfAqls >= 1) {
          // if we receive back all of the expected Aqls, aka have resolved this traql entry
          if (traql[key].expectedNumberOfAqls === traql[key].aqlsReceivedBack.length) {
            // send the traql back to the server so it can be stored in the DB 
            aqlsToBeSent[successAqls].push(traql[key]);
            delete traql[key];
          } else {
            // check if traql obj has "give me one more chance property"
            if (traql[key].probation) {
              // otherwise send successful aqls to server for entry into the db
              aqlsToBeSent[errorAqls].push(traql[key]);
              delete traql[key];
            } else {
              traql[key].probation = true;
            }
          }
        }          
      }   
      postReq.data = aqlsToBeSent;  
      axios(postReq)
      .then(res => {
        console.log('new traql, ', traql);
        console.log('successful addition of aqls to db');
        aqlsToBeSent = [];
      })
      .catch(err => console.log('err'));    
    }
    open = true;
  }
}

module.exports = traqlAudit;