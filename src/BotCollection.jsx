import React from 'react';
import BotCard from './BotCard';
import "./Collection.css"; 

function BotCollection({ bots, yourArmy, onEnlistBot, onDischargeBot }) {
  return (
    <div className="bot-collection">
      <h2 className="collection-title">Available Bots for Enlistment</h2>
      {bots.map(bot => (
        <BotCard 
          key={bot.id} 
          bot={bot} 
          onCardClick={onEnlistBot} 
          showDischargeButton={true}
          onDischargeClick={onDischargeBot}
        />
      ))}
    </div>
  );
}

export default BotCollection;