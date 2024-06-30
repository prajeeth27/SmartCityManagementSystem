import React from 'react';
import './styles.css';
import EmergencyContacts from '../../components/EmergencyContacts';


const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Home Page</h1>
      <EmergencyContacts />
      
    </div>
    
  );
};

export default Home;
