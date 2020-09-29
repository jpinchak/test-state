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

  return (
    <>
      <h1 style={{ backgroundColor: color || 'purple' }}>
        GraphQL Boilerplate
      </h1>
      <button onClick={() => handleClick('blue')}>MAKE IT BLUE</button>
      <button onClick={() => handleClick('red')}>MAKE IT RED</button>
      <button onClick={() => handleClick('turquoise')}>
        MAKE IT TURQUOISE
      </button>
      <button onClick={() => handleClick('lightslategray')}>
        MAKE IT LIGHT SLATE GRAY
      </button>
      <button onClick={() => handleClick('orange')}>MAKE IT ERRNGE</button>
    </>
  );
}

export default App;
