import React, { useState, useEffect } from 'react';

const ParcelView = () => {
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);

    useEffect(() => {
        // Fetch parcels logic
        setParcels([
            { id: 1, status: 'In Transit', trackingNumber: 'TRK001' },
            { id: 2, status: 'Delivered', trackingNumber: 'TRK002' }
        ]);
    }, []);

    return (
        <div className="parcel-view">
            <h2>Parcel Tracking</h2>
            <div className="parcels-list">
                {parcels.map(parcel => (
                    <div 
                        key={parcel.id} 
                        className="parcel-card"
                        onClick={() => setSelectedParcel(parcel)}
                    >
                        <p>Tracking: {parcel.trackingNumber}</p>
                        <span className={parcel.status}>{parcel.status}</span>
                    </div>
                ))}
            </div>
            {selectedParcel && (
                <div className="parcel-details">
                    <h3>Parcel Details</h3>
                    <p>Tracking: {selectedParcel.trackingNumber}</p>
                    <p>Status: {selectedParcel.status}</p>
                </div>
            )}
        </div>
    );
};

export default ParcelView;
