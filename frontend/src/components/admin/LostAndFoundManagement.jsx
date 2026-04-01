import React, { useState, useEffect } from 'react';

const LostAndFoundManagement = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        setItems([
            { 
                id: 1, 
                title: 'Lost Wallet', 
                description: 'Black leather wallet with ID cards', 
                status: 'lost', 
                reportedBy: 'John Doe',
                dateReported: '2026-03-15',
                category: 'Wallet'
            },
            { 
                id: 2, 
                title: 'Found Keys', 
                description: 'Car keys with red keychain', 
                status: 'found', 
                reportedBy: 'Jane Smith',
                dateReported: '2026-03-20',
                category: 'Keys'
            }
        ]);
    }, []);

    const filteredItems = filter === 'all' ? items : items.filter(item => item.status === filter);

    return (
        <div className="lost-found-management">
            <h2>Lost and Found Management</h2>
            
            <div className="filters">
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
                <button onClick={() => setFilter('lost')} className={filter === 'lost' ? 'active' : ''}>Lost</button>
                <button onClick={() => setFilter('found')} className={filter === 'found' ? 'active' : ''}>Found</button>
            </div>
            
            <div className="items-grid">
                {filteredItems.map(item => (
                    <div key={item.id} className="item-card" onClick={() => setSelectedItem(item)}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="item-meta">
                            <span className={item.status}>{item.status}</span>
                            <span className="category">{item.category}</span>
                        </div>
                        <div className="item-info">
                            <p>Reported by: {item.reportedBy}</p>
                            <p>Date: {item.dateReported}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {selectedItem && (
                <div className="item-details-modal">
                    <div className="modal-content">
                        <h3>{selectedItem.title}</h3>
                        <p><strong>Description:</strong> {selectedItem.description}</p>
                        <p><strong>Status:</strong> {selectedItem.status}</p>
                        <p><strong>Category:</strong> {selectedItem.category}</p>
                        <p><strong>Reported by:</strong> {selectedItem.reportedBy}</p>
                        <p><strong>Date reported:</strong> {selectedItem.dateReported}</p>
                        <button onClick={() => setSelectedItem(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LostAndFoundManagement;
