import React, { useState, useEffect } from 'react';
import { useSubscription, gql } from '@apollo/client';

//import openSocket from 'socket.io-client';

function App() {
  const [color, setColor] = useState('purple');

  const colorSubscription = gql`
    subscription {
      updatedColor {
        cssColor
      }
    }
  `;
  const { data, loading } = useSubscription(colorSubscription, {
    onSubscriptionData: (client) =>
      setColor(client.subscriptionData.data.updatedColor.cssColor),
  });

  const handleClick = (chosenColor) => {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation{newColor(colorArg: "${chosenColor}"){id cssColor}}`,
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
