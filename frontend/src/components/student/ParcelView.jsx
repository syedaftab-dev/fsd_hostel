import React, { useState, useEffect } from 'react';

const ParcelView = () => {
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setParcels([
            { 
                id: 1, 
                status: 'In Transit', 
                trackingNumber: 'TRK001',
                sender: 'Amazon',
                recipient: 'John Doe',
                estimatedDelivery: '2026-04-10',
                weight: '2.5 kg'
            },
            { 
                id: 2, 
                status: 'Delivered', 
                trackingNumber: 'TRK002',
                sender: 'eBay',
                recipient: 'John Doe',
                estimatedDelivery: '2026-04-05',
                weight: '1.2 kg',
                deliveryDate: '2026-04-05'
            }
        ]);
    }, []);

    const openParcelDetails = (parcel) => {
        setSelectedParcel(parcel);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedParcel(null);
    };

    return (
        <div className="parcel-view">
            <h2>Parcel Tracking</h2>
            
            <div className="parcels-container">
                {parcels.map(parcel => (
                    <div 
                        key={parcel.id} 
                        className="parcel-card"
                        onClick={() => openParcelDetails(parcel)}
                    >
                        <div className="parcel-header">
                            <h4>{parcel.trackingNumber}</h4>
                            <span className={status }>{parcel.status}</span>
                        </div>
                        <div className="parcel-info">
                            <p>From: {parcel.sender}</p>
                            <p>Est. Delivery: {parcel.estimatedDelivery}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {showModal && selectedParcel && (
                <div className="modal-overlay">
                    <div className="parcel-modal">
                        <div className="modal-header">
                            <h3>Parcel Details</h3>
                            <button onClick={closeModal} className="close-btn">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-row">
                                <span>Tracking Number:</span>
                                <span>{selectedParcel.trackingNumber}</span>
                            </div>
                            <div className="detail-row">
                                <span>Status:</span>
                                <span className={status }>{selectedParcel.status}</span>
                            </div>
                            <div className="detail-row">
                                <span>Sender:</span>
                                <span>{selectedParcel.sender}</span>
                            </div>
                            <div className="detail-row">
                                <span>Recipient:</span>
                                <span>{selectedParcel.recipient}</span>
                            </div>
                            <div className="detail-row">
                                <span>Weight:</span>
                                <span>{selectedParcel.weight}</span>
                            </div>
                            <div className="detail-row">
                                <span>Estimated Delivery:</span>
                                <span>{selectedParcel.estimatedDelivery}</span>
                            </div>
                            {selectedParcel.deliveryDate && (
                                <div className="detail-row">
                                    <span>Delivery Date:</span>
                                    <span>{selectedParcel.deliveryDate}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParcelView;
