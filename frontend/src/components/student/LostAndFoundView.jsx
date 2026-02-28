import React, { useState } from 'react';

const LostAndFoundView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        image: null
    });

    const handleImageUpload = (e) => {
        setFormData({...formData, image: e.target.files[0]});
    };

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
            
            {showForm && (
                <div className="report-form">
                    <h3>Report Lost/Found Item</h3>
                    <input 
                        type="text" 
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                    <textarea 
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <button>Submit</button>
                </div>
            )}
        </div>
    );
};

export default LostAndFoundView;
