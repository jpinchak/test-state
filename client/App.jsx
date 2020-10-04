import React, { useState, useEffect } from 'react';
import { useSubscription, gql } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [color, setColor] = useState('purple');
  const [luckyNumber, setLuckyNumber] = useState(222);

  const colorSubscription = gql`
    subscription {
      updatedColor {
        cssColor
        aql {
          mutationSendTime
          mutationReceived
          subscriberReceived
          mutationId
          resolver
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
      const {
        mutationSendTime,
        mutationReceived,
        subscriberReceived,
        roundtripTime,
        mutationId,
        resolver,
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
        }),
      };
      fetch(`/analytics`, options)
        // .then((data) => data.json())
        // .then((result) => setColor(result.data.newColor.cssColor))
        .catch((err) => console.log(err));

      setColor(client.subscriptionData.data.updatedColor.cssColor);
    },
  });

  //when a new color is clicked
  const handleClick = (chosenColor, resolver) => {
    //remove this before extraction
    setColor(chosenColor)
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation{
          ${resolver}(
            colorArg: "${chosenColor}",
            aql: {mutationSendTime: "${Date.now()}",
              mutationReceived: "",
              subscriberReceived: "",
              mutationId: "${uuidv4()}",
              resolver: "${resolver}",
            }
            ){id cssColor}}`,
      }),
    };
    fetch(`/graphql`, options)
      .then((data) => data.json())
      .then((result) => setColor(result.data.newColor.cssColor))
      .catch((err) => console.log(err));
  };

  //------------------------- Lucky Number Mutation ------------------------------//
  const numberSubscription = gql`
    subscription {
      updatedNumber {
        luckyNum
        aql {
          mutationSendTime
          mutationReceived
          subscriberReceived
          mutationId
          resolver
        }
      }
    }
  `;

  //when client receives the new data
  const { numberData, numberLoading } = useSubscription(numberSubscription, {
    onSubscriptionData: (client) => {
      const aqlToSendToDB = client.subscriptionData.data.updatedNumber.aql;
      aqlToSendToDB.subscriberReceived = Date.now();
      aqlToSendToDB.roundtripTime = `${
        aqlToSendToDB.subscriberReceived - aqlToSendToDB.mutationSendTime
      } ms`;
      console.log(aqlToSendToDB);
      const {
        mutationSendTime,
        mutationReceived,
        subscriberReceived,
        roundtripTime,
        mutationId,
        resolver,
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
        }),
      };
      fetch(`/analytics`, options)
        // .then((data) => data.json())
        // .then((result) => setColor(result.data.newColor.cssColor))
        .catch((err) => console.log(err));

      setLuckyNumber(client.subscriptionData.data.updatedNumber.luckyNum);
    },
  });

  const handleNumberClick = (resolver) => {
    let newLuckyNumber = Math.floor(Math.random() * 1000);
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation{
          ${resolver}(
            numberArg: ${newLuckyNumber},
            aql: {mutationSendTime: "${Date.now()}",
              mutationReceived: "",
              subscriberReceived: "",
              mutationId: "${uuidv4()}",
              resolver: "${resolver}",
            }
            ){luckyNum}}`,
      }),
    };
    fetch(`/graphql`, options)
      .then((data) => data.json())
      .then((result) => setLuckyNumber(result.data.newLuckyNumber.luckyNum))
      .catch((err) => console.log(err));
    // setLuckyNumber()
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
        <button
          style={styles.button}
          onClick={() => handleClick('blue', 'newColor')}
        >
          MAKE IT BLUE
        </button>
        <button
          style={styles.button}
          onClick={() => handleClick('red', 'newColor')}
        >
          MAKE IT RED
        </button>
        <button
          style={styles.button}
          onClick={() => handleClick('turquoise', 'newColor')}
        >
          MAKE IT TURQUOISE
        </button>
        <button
          style={styles.button}
          onClick={() => handleClick('lightslategray', 'newColor')}
        >
          MAKE IT LIGHT SLATE GRAY
        </button>
        <button
          style={styles.button}
          onClick={() => handleClick('orange', 'newColor')}
        >
          MAKE IT ERRNGE
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: '5rem' }}> Lucky Number {luckyNumber} </h1>
        <button onClick={() => handleNumberClick('newLuckyNumber')}>
          {' '}
          New Lucky Number{' '}
        </button>
      </div>
    </div>
  );
}

export default App;
