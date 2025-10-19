import React, { useState, useEffect } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
import './App.css'; 

function App() {
  const [allBots, setAllBots] = useState([]);
  const [yourArmy, setYourArmy] = useState([]);
  const API_URL = "http://localhost:8001/bots"; 

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => setAllBots(data))
      .catch(error => console.error("Error fetching bots:", error));
  }, []);

  const enlistBot = (botToEnlist) => {
    const isEnlisted = yourArmy.some(bot => bot.id === botToEnlist.id);
    
    if (!isEnlisted) {
      setYourArmy([...yourArmy, botToEnlist]);
    }
    
  };

  const releaseBot = (botToRelease) => {

    const updatedArmy = yourArmy.filter(bot => bot.id !== botToRelease.id);
    setYourArmy(updatedArmy);
  };

 
  const dischargeBotForever = (botToDischarge) => {
   
    fetch(`${API_URL}/${botToDischarge.id}`, {
        method: "DELETE",
    })
    .then(() => {
        setAllBots(prevBots => prevBots.filter(bot => bot.id !== botToDischarge.id));
        
        setYourArmy(prevArmy => prevArmy.filter(bot => bot.id !== botToDischarge.id));
    })
    .catch(error => console.error("Error discharging bot:", error));
  };

  return (
    <div className="App">
      <YourBotArmy 
        army={yourArmy} 
        onReleaseBot={releaseBot} 
        onDischargeBot={dischargeBotForever} 
      />
      
      <BotCollection 
        bots={allBots} 
        yourArmy={yourArmy} 
        onEnlistBot={enlistBot} 
        onDischargeBot={dischargeBotForever}
      />
    </div>
  );
}

export default App;