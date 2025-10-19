function BotSpecs({ bot, onGoBack, onEnlist, onDischarge }) {
    if (!bot) return null;

   
    const handleEnlist = () => {
        onEnlist(bot);
       
    };

    return (
        <div className="bot-specs-container">
            <div className="bot-specs">
                <img src={bot.avatar_url} alt={bot.name} />
                <div className="details">
                    <h2>{bot.name}</h2>
                    <p><strong>Class:</strong> {bot.bot_class}</p>
                    <p><strong>Catchphrase:</strong> <em>"{bot.catchphrase}"</em></p>
                    <hr />
                    <h3>Stats</h3>
                    <p>❤️ Health: {bot.health}</p>
                    <p>⚔️ Damage: {bot.damage}</p>
                    <p>🛡️ Armor: {bot.armor}</p>
                </div>
            </div>

            <div className="specs-buttons">
                <button onClick={onGoBack}>
                    ⬅️ Go Back to List
                </button>
                <button onClick={handleEnlist}>
                    ✅ ENLIST BOT
                </button>
            </div>
        </div>
    );
}

export default BotSpecs;