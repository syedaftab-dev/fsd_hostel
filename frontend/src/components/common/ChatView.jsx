import React, { useState, useRef, useEffect } from 'react';
import './ChatView.css';

const ChatView = () => {
    const [messages, setMessages] = useState([
        { text: 'Welcome to the chat room!', timestamp: '12:00 PM', sender: 'system', id: 1 }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const [isOnline, setIsOnline] = useState(true);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = () => {
        if (newMessage.trim()) {
            const message = {
                text: newMessage,
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                sender: 'user',
                id: Date.now()
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h3>Chat Room</h3>
                <div className={status-indicator }></div>
            </div>
            <div className="chat-messages">
                {messages.map(msg => (
                    <div key={msg.id} className={message-wrapper }>
                        <div className="message-content">
                            <span className="message-text">{msg.text}</span>
                            <span className="message-timestamp">{msg.timestamp}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
                <div className="input-container">
                    <textarea 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="message-input"
                        rows={1}
                    />
                    <button onClick={addMessage} className="send-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatView;
