function SortBar({ onSortChange, botClasses, activeFilters, onFilterToggle }) {
    return (
        <div className="sort-filter-bar">
            
            <div className="sort-controls">
                <strong>Sort By:</strong>
                <button onClick={() => onSortChange('health')}>Health</button>
                <button onClick={() => onSortChange('damage')}>Damage</button>
                <button onClick={() => onSortChange('armor')}>Armor</button>

            </div>
            
    
            <div className="filter-controls">
                <strong>Filter By Class:</strong>
                {botClasses.map(botClass => (
                    <button 
                        key={botClass}
                        onClick={() => onFilterToggle(botClass)}
                        className={activeFilters.includes(botClass) ? 'active-filter' : ''}
                    >
                        {botClass}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SortBar;