
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
          onCardClick={onReleaseBot}
          showDischargeButton={true} 
          onDischargeClick={onDischargeBot} 
        />
      ))}
    </div>
  );
}

export default YourBotArmy;