import React, { useState, useEffect } from 'react';

function App() {
  const [color, setColor] = useState('purple');

  useEffect(() => {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `query{color{cssColor}}` }),
    };
    fetch(`/graphql`, options)
      .then((data) => data.json())
      .then((result) => setColor(result.data.color.cssColor))
      .catch((err) => console.log(err));
  }, []);

  const handleClickRed = () => {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `mutation{newRed{id cssColor}}` }),
    };
    fetch(`/graphql`, options)
      .then((data) => data.json())
      .then((result) => setColor(result.data.newRed.cssColor))
      .catch((err) => console.log(err));
  };

  const handleClickBlue = () => {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation{newBlue(testArgs: "Tiny"){id cssColor}}`,
      }),
    };
    fetch(`/graphql`, options)
      .then((data) => data.json())
      .then((result) => setColor(result.data.newBlue.cssColor))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 style={{ backgroundColor: color || 'purple' }}>
        GraphQL Boilerplate
      </h1>
      <button onClick={handleClickBlue}>MAKE IT BLUE</button>
      <button onClick={handleClickRed}>MAKE IT RED</button>
    </>
  );
}

export default App;
