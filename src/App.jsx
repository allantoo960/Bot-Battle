import React, { useState, useEffect } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
import BotSpecs from './BotSpecs';
import SortBar from './SortBar';
import './App.css'; 

function App() {
  const [allBots, setAllBots] = useState([]);
  const [yourArmy, setYourArmy] = useState([]);
  const [activeView, setActiveView] = useState("collection"); 
  const [selectedBot, setSelectedBot] = useState(null);       
  const [sortCriteria, setSortCriteria] = useState(null);     
  const [activeFilters, setActiveFilters] = useState([]);     
  
  const API_URL = "http://localhost:8001/bots"; 

  useEffect(() => {
    async function fetchBots() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setAllBots(data);
      } catch (error) {
        console.error("Error fetching bots:", error);
      }
    }
    fetchBots();
  }, []);

  
  const showBotSpecs = (bot) => {
    setSelectedBot(bot);
    setActiveView("specs");
  };

  const goBackToCollection = () => {
    setSelectedBot(null);
    setActiveView("collection");
  };
  


  const enlistBot = (botToEnlist) => {
  const isClassEnlisted = yourArmy.some(bot => bot.bot_class === botToEnlist.bot_class);

    if (isClassEnlisted) {
      alert(`You can only enlist one ${botToEnlist.bot_class} bot!`);
      return;
    }
    
    setYourArmy(prevArmy => [...prevArmy, botToEnlist]);
    setAllBots(prevBots => prevBots.filter(bot => bot.id !== botToEnlist.id));
    
    goBackToCollection(); 
  };

  const releaseBot = (botToRelease) => {

    setYourArmy(prevArmy => prevArmy.filter(bot => bot.id !== botToRelease.id));
    setAllBots(prevBots => [...prevBots, botToRelease]);
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
  
  
  
  const toggleFilter = (botClass) => {
    setActiveFilters(prevFilters => {
        if (prevFilters.includes(botClass)) {
            return prevFilters.filter(f => f !== botClass); 
        } else {
            return [...prevFilters, botClass]; 
        }
    });
  };

  const getFilteredAndSortedBots = () => {
    let bots = [...allBots];

 
    if (activeFilters.length > 0) {
        bots = bots.filter(bot => activeFilters.includes(bot.bot_class));
    }

  
    if (sortCriteria) {
        bots.sort((a, b) => b[sortCriteria] - a[sortCriteria]);
    }

    return bots;
  };

  const displayBots = getFilteredAndSortedBots();
  
  const botClasses = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];


  return (
    <div className="App">
      <YourBotArmy 
        army={yourArmy} 
        onReleaseBot={releaseBot} 
        onDischargeBot={dischargeBotForever} 
      />
      
      <SortBar onSortChange={setSortCriteria} botClasses={botClasses} activeFilters={activeFilters} onFilterToggle={toggleFilter} />

    
      {activeView === "collection" ? (
        <BotCollection 
          bots={displayBots} 
          onShowSpecs={showBotSpecs}
        />
      ) : (
        <BotSpecs 
          bot={selectedBot}
          onGoBack={goBackToCollection}
          onEnlist={enlistBot} 
          onDischarge={dischargeBotForever}
        />
      )}
    </div>
  );
}

export default App;
