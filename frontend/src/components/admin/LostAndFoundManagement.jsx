import React, { useState, useEffect } from 'react';

const LostAndFoundManagement = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        setItems([
            { id: 1, title: 'Lost Wallet', description: 'Black leather wallet', status: 'lost' },
            { id: 2, title: 'Found Keys', description: 'Car keys with red keychain', status: 'found' }
        ]);
    }, []);

    const filteredItems = filter === 'all' ? items : items.filter(item => item.status === filter);

    return (
        <div className="lost-found-management">
            <h2>Lost and Found Management</h2>
            <div className="filters">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('lost')}>Lost</button>
                <button onClick={() => setFilter('found')}>Found</button>
            </div>
            <div className="items-list">
                {filteredItems.map(item => (
                    <div key={item.id} className="item-card">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span className={item.status}>{item.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LostAndFoundManagement;
