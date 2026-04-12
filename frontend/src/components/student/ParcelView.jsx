import React, { useState, useEffect } from 'react';

const ParcelView = () => {
    const [parcels, setParcels] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchParcels();
    }, []);

    const fetchParcels = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setParcels([
                { 
                    id: 1, 
                    status: 'In Transit', 
                    trackingNumber: 'TRK001',
                    sender: 'Amazon',
                    recipient: 'John Doe',
                    estimatedDelivery: '2026-04-15',
                    weight: '2.5 kg',
                    lastUpdated: '2026-04-12'
                },
                { 
                    id: 2, 
                    status: 'Delivered', 
                    trackingNumber: 'TRK002',
                    sender: 'eBay',
                    recipient: 'John Doe',
                    estimatedDelivery: '2026-04-10',
                    weight: '1.2 kg',
                    deliveryDate: '2026-04-10',
                    lastUpdated: '2026-04-10'
                }
            ]);
            setLoading(false);
        }, 1000);
    };

    const updateParcelStatus = async (parcelId, newStatus) => {
        setLoading(true);
        // Simulate API call to update status
        setTimeout(() => {
            setParcels(prev => prev.map(parcel => 
                parcel.id === parcelId 
                    ? { ...parcel, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
                    : parcel
            ));
            setLoading(false);
        }, 500);
    };

    const openParcelDetails = (parcel) => {
        setSelectedParcel(parcel);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedParcel(null);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Delivered': return 'green';
            case 'In Transit': return 'blue';
            case 'Pending': return 'orange';
            default: return 'gray';
        }
    };

    return (
        <div className="parcel-view">
            <div className="parcel-header">
                <h2>Parcel Tracking</h2>
                <button onClick={fetchParcels} disabled={loading}>
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>
            
            {loading ? (
                <div className="loading">Loading parcels...</div>
            ) : (
                <div className="parcels-container">
                    {parcels.map(parcel => (
                        <div 
                            key={parcel.id} 
                            className="parcel-card"
                            onClick={() => openParcelDetails(parcel)}
                        >
                            <div className="parcel-header">
                                <h4>{parcel.trackingNumber}</h4>
                                <span className="status" style={{color: getStatusColor(parcel.status)}}>
                                    {parcel.status}
                                </span>
                            </div>
                            <div className="parcel-info">
                                <p>From: {parcel.sender}</p>
                                <p>Est. Delivery: {parcel.estimatedDelivery}</p>
                                <small>Last updated: {parcel.lastUpdated}</small>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
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
                                <span style={{color: getStatusColor(selectedParcel.status)}}>
                                    {selectedParcel.status}
                                </span>
                            </div>
                            <div className="detail-row">
                                <span>Sender:</span>
                                <span>{selectedParcel.sender}</span>
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
                            <div className="detail-row">
                                <span>Last Updated:</span>
                                <span>{selectedParcel.lastUpdated}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParcelView;
