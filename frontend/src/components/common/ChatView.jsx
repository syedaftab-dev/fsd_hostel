import React, { useState } from 'react';

const ChatView = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const addMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { 
                text: newMessage, 
                timestamp: new Date().toLocaleTimeString() 
            }]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-view">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <span>{msg.text}</span>
                        <small>{msg.timestamp}</small>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={addMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatView;
