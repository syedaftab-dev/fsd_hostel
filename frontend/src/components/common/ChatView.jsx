import React, { useState, useRef, useEffect } from 'react';

const ChatView = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { 
                text: newMessage, 
                timestamp: new Date().toLocaleTimeString(),
                id: Date.now()
            }]);
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
        <div className="chat-view">
            <div className="chat-messages">
                {messages.map(msg => (
                    <div key={msg.id} className="message">
                        <div className="message-content">{msg.text}</div>
                        <div className="message-time">{msg.timestamp}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={handleKeyPress}
                    rows={2}
                />
                <button onClick={addMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatView;
