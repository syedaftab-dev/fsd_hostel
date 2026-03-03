import React, { useState, useEffect } from 'react';

const ParcelView = () => {
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setParcels([
            { id: 1, status: 'In Transit', trackingNumber: 'TRK001', notification: 'Package will arrive tomorrow' },
            { id: 2, status: 'Delivered', trackingNumber: 'TRK002', notification: 'Package delivered to reception' }
        ]);
    }, []);

    return (
        <div className="parcel-view">
            <h2>Parcel Tracking</h2>
            
            {notifications.length > 0 && (
                <div className="notifications">
                    {notifications.map((notif, index) => (
                        <div key={index} className="notification">{notif}</div>
                    ))}
                </div>
            )}
            
            <div className="parcels-list">
                {parcels.map(parcel => (
                    <div 
                        key={parcel.id} 
                        className="parcel-card"
                        onClick={() => setSelectedParcel(parcel)}
                    >
                        <p>Tracking: {parcel.trackingNumber}</p>
                        <span className={parcel.status}>{parcel.status}</span>
                        {parcel.notification && (
                            <div className="parcel-notification">{parcel.notification}</div>
                        )}
                    </div>
                ))}
            </div>
            
            {selectedParcel && (
                <div className="parcel-details">
                    <h3>Parcel Details</h3>
                    <p>Tracking: {selectedParcel.trackingNumber}</p>
                    <p>Status: {selectedParcel.status}</p>
                    {selectedParcel.notification && (
                        <p>Notification: {selectedParcel.notification}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ParcelView;
