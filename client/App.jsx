import React, { useState, useEffect } from 'react';

function App() {
  const [color, setColor] = useState('');
  const query = `{color{cssColor}}`;

  useEffect(() => {
    fetch(`/graphql?query=${query}`)
      .then((data) => data.json())
      .then((result) => setColor(result.data.color.cssColor))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    fetch(`/graphql`)
      .then((data) => data.json())
      .then((result) => setColor(result.data.color.cssColor))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 style={{ backgroundColor: color || 'purple' }}>
        GraphQL Boilerplate
      </h1>
      <button onClick={handleClick}>MAKE IT BLUE</button>
    </>
  );
}

export default App;
