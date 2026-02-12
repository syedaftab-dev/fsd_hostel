import React, { useState, useEffect } from 'react';

const AIChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            setIsTyping(true);
            
            // Simulate AI response
            setTimeout(() => {
                setMessages(prev => [...prev, { text: 'AI response', sender: 'bot' }]);
                setIsTyping(false);
            }, 1000);
        }
    };

    return (
        <div className="chatbot">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>{msg.text}</div>
                ))}
                {isTyping && <div className="typing">Bot is typing...</div>}
            </div>
            <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default AIChatbot;
