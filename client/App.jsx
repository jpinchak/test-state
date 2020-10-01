import React, { useState, useEffect } from 'react';
import { useSubscription, gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

//import openSocket from 'socket.io-client';

function App() {
  const [color, setColor] = useState('purple');

  const colorSubscription = gql`
    subscription {
      updatedColor {
        cssColor
        aql {
          mutationSendTime
          mutationReceived
          subscriberReceived
        }
      }
    }
  `;

  //when client receives the new data
  const { data, loading } = useSubscription(colorSubscription, {
    onSubscriptionData: (client) => {
      const aqlToSendToDB = client.subscriptionData.data.updatedColor.aql;
      aqlToSendToDB.subscriberReceived = Date.now();
      aqlToSendToDB.roundtripTime = `${
        aqlToSendToDB.subscriberReceived - aqlToSendToDB.mutationSendTime
      } ms`;
      console.log(aqlToSendToDB);
      const {mutationSendTime, mutationReceived, subscriberReceived, roundtripTime} = aqlToSendToDB;
      const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: uuidv4(), mutationSendTime, mutationReceived, subscriberReceived, roundtripTime 
        }),
      }
        fetch(`/analytics`, options)
        // .then((data) => data.json())
        // .then((result) => setColor(result.data.newColor.cssColor))
        .catch((err) => console.log(err));

      setColor(client.subscriptionData.data.updatedColor.cssColor);
    },
  });

  //when a new color is clicked
  const handleClick = (chosenColor) => {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation{
          newColor(
            colorArg: "${chosenColor}",
            aql: {mutationSendTime: "${Date.now()}",
              mutationReceived: "",
              subscriberReceived: "",}
            ){id cssColor}}`,
      }),
    };
    fetch(`/graphql`, options)
      .then((data) => data.json())
      .then((result) => setColor(result.data.newColor.cssColor))
      .catch((err) => console.log(err));
  };

  const styles = {
    button: {
      height: '2rem',
      width: '80%',
      marginBottom: '.5rem',
      borderRadius: '5px',
    },
    buttonColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  };

  return (
    <div style={{ backgroundColor: color, height: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Color Game</h1>
      <div style={styles.buttonColumn}>
        <button style={styles.button} onClick={() => handleClick('blue')}>
          MAKE IT BLUE
        </button>
        <button style={styles.button} onClick={() => handleClick('red')}>
          MAKE IT RED
        </button>
        <button style={styles.button} onClick={() => handleClick('turquoise')}>
          MAKE IT TURQUOISE
        </button>
        <button
          style={styles.button}
          onClick={() => handleClick('lightslategray')}
        >
          MAKE IT LIGHT SLATE GRAY
        </button>
        <button style={styles.button} onClick={() => handleClick('orange')}>
          MAKE IT ERRNGE
        </button>
      </div>
    </div>
  );
}

export default App;
