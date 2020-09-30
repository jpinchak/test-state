import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';

function App() {
  const [color, setColor] = useState('purple');
  //const [socket, setSocket] = useState(null);

  useEffect(() => {
    // establish socket connection
    // const socket = openSocket(`ws://localhost:8080/subscriptions`);
    const socket = new WebSocket('ws://localhost:8080/subscriptions');
    // console.log(socket);
    // socket.onopen = () => {
    //   console.log('opened!');
    // };

    // socket.onmessage((data) => {
    //   console.log(data);
    // });

    // const options = {
    //   method: 'post',
    //   headers: { 'Content-Type': 'application/json' },
    //   keepalive: true,
    //   body: JSON.stringify({ query: `subscription{updatedColor{cssColor}}` }),
    // };
    // fetch(`/subscriptions`, options)
    //   .then((data) => data.json())
    //   .then((result) => setColor(result.data.color.cssColor))
    //   .catch((err) => console.log(err));
  }, []);

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
      <h1 style={{ textAlign: 'center' }}>GraphQL Boilerplate</h1>
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
