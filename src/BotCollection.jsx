
import BotCard from './BotCard';
import "./Collection.css";

function BotCollection({ bots, onShowSpecs }) {
  return (
    <div className="bot-collection">
      <h2 className="collection-title">Available Bots for Enlistment</h2>
      <div className="bot-list">
        {bots.map(bot => (
          <BotCard 
            key={bot.id} 
            bot={bot} 
            onCardClick={onShowSpecs} 
            showDischargeButton={false}
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;