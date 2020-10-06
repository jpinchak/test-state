import { v4 as uuidv4 } from 'uuid';
import { gql } from '@apollo/client';

function aqlQueryParser(queryString) {
  let returnQuery = '';
  let inResolver = false;
  let resolver = '';
  let inArgs = false;
  let resolverFound = false;
  for (let i = 0; i < queryString.length; i++) {
    if (inResolver && (queryString[i] === '{' || queryString[i] === '(')) {
      resolverFound = true;
      inResolver = false;
    }
    if (inResolver) {
      resolver += queryString[i];
    }
    if (queryString[i] === '(') {
      inArgs = true;
    }
    if (queryString[i] === ')' && inArgs) {
      //inject aql
      returnQuery += `, aql: {mutationSendTime: "${Date.now()}",
      mutationReceived: "",
      subscriberReceived: "",
      mutationId: "${uuidv4()}",
      resolver: "${resolver}",
      userToken: "testingHooks"}`;
    }
    if (queryString[i] === '{' && !resolverFound) {
      inResolver = true;
    }
    returnQuery += queryString[i];
  }
  return returnQuery;
}

const chosenColor = 'blue';
const colorQuery = `mutation{newColor(colorArg: "blue"){id cssColor}}`;
console.log(aqlQueryParser(colorQuery));

export default aqlQueryParser;
