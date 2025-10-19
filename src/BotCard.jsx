function BotCard({ bot, onCardClick, showDischargeButton, onDischargeClick }) {
  const { name, avatar_url, health, damage, armor, bot_class } = bot;

  const handleClick = () => {
    onCardClick(bot);
  };

  const handleDischarge = (e) => {
    
    e.stopPropagation(); 
    onDischargeClick(bot);
  };

  return (
    <div className="bot-card" onClick={handleClick}>
      <img src={avatar_url} alt={`${name} avatar`} />
      <h3>{name}</h3>
      <p>Class: {bot_class}</p>
      <div className="bot-stats">
        <p>❤️ Health: {health}</p>
        <p>⚔️ Damage: {damage}</p>
        <p>🛡️ Armor: {armor}</p>
      </div>
      
      {showDischargeButton && (
        <button className="discharge-btn" onClick={handleDischarge}>
          X
        </button>
      )}
    </div>
  );
}

export default BotCard;