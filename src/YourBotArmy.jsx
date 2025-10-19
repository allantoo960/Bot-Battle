// src/YourBotArmy.jsx

import React from 'react';
import BotCard from './BotCard';
import "./Army.css"; 

function YourBotArmy({ army, onReleaseBot, onDischargeBot }) {
  return (
    <div className="your-bot-army">
      <h2 className="army-header">Your Bot Army</h2>
      {army.map(bot => (
        <BotCard 
          key={bot.id} 
          bot={bot} 
          onCardClick={onReleaseBot} // Clicking the card RELEASES the bot
          showDischargeButton={true} // Show the red X button
          onDischargeClick={onDischargeBot} // The X button discharges forever
        />
      ))}
    </div>
  );
}

export default YourBotArmy;