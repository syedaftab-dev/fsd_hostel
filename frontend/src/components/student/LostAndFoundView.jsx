import React, { useState } from 'react';

const LostAndFoundView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="lost-found-view">
            <h2>Lost and Found</h2>
            <input 
                type="text" 
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setShowForm(true)}>Report Item</button>
            {showForm && <div>Report form here</div>}
        </div>
    );
};

export default LostAndFoundView;
