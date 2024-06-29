import React, { useEffect, useState } from 'react';
import { fetchWelcomeMessage } from './services/api';
import HomePage from './pages/HomePage';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchWelcomeMessage()
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error fetching the welcome message:', error);
      });
  }, []);

  return (
    <div className="App">
      <HomePage />
      <p>{message}</p>
    </div>
  );
}

export default App;
