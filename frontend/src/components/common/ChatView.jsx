import React, { useState, useRef, useEffect } from 'react';
import './ChatView.css';

const ChatView = () => {
    const [messages, setMessages] = useState([
        { text: 'Welcome to chat!', timestamp: '12:00 PM', sender: 'system', id: 1 }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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
            setMessages(prev => [...prev, message]);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h3>Chat Room</h3>
                <div className="online-indicator"></div>
            </div>
            <div className="chat-messages" ref={messagesContainerRef}>
                {messages.map(msg => (
                    <div key={msg.id} className={message }>
                        <div className="message-bubble">
                            <p>{msg.text}</p>
                            <span className="timestamp">{msg.timestamp}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-container">
                <textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={handleKeyPress}
                    rows={1}
                />
                <button onClick={addMessage} disabled={!newMessage.trim()}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatView;
