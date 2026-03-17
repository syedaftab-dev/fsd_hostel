import React, { useState, useRef, useEffect } from 'react';

const ChatView = () => {
    const [messages, setMessages] = useState([
        { text: 'Welcome to chat!', timestamp: '12:00 PM', sender: 'system', id: 1 }
    ]);
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
            const message = {
                text: newMessage,
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                sender: 'user',
                id: Date.now()
            };
            setMessages([...messages, message]);
            setNewMessage('');
            
            // Simulate response
            setTimeout(() => {
                const response = {
                    text: 'Response received',
                    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                    sender: 'other',
                    id: Date.now() + 1
                };
                setMessages(prev => [...prev, response]);
            }, 500);
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
            <div className="chat-header">Chat Room</div>
            <div className="chat-messages">
                {messages.map(msg => (
                    <div key={msg.id} className={message }>
                        <div className="message-bubble">{msg.text}</div>
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
