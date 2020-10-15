import { useSubscription, gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

function useAqlSubscription(client, payloadProperty) {
  const aqlToSendToDB = client.subscriptionData.data[payloadProperty].aql;
  aqlToSendToDB.subscriberReceived = Date.now();
  aqlToSendToDB.roundtripTime = `${
    aqlToSendToDB.subscriberReceived - aqlToSendToDB.mutationSendTime
  }`;
  //console.log(aqlToSendToDB);
  const {
    mutationSendTime,
    mutationReceived,
    subscriberReceived,
    roundtripTime,
    mutationId,
    resolver,
    userToken,
  } = aqlToSendToDB;
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: uuidv4(),
      mutationSendTime,
      mutationReceived,
      subscriberReceived,
      roundtripTime,
      mutationId,
      resolver,
      userToken,
    }),
  };
  fetch(`/analytics`, options)
    // .then((data) => data.json())
    // .then((result) => setColor(result.data.newColor.cssColor))
    .catch((err) => console.log('subscription err'));
}

export default useAqlSubscription;
