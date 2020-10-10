//Creates a copy of the received AQL, adds a mutationReceived property of the current time, and returns copy to subscription payload to travel to subscribers.

function newAql(args) {
  const aql = {
    ...args.aql,
    mutationReceived: new Date(),
  };
  return aql;
}

module.exports = newAql;

//create a helper function that takes payload object and returns payload obj including the updated Aql with current time stamped on it.
