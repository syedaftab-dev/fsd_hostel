import React, { useState } from 'react';

const AIChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
        }
    };

    return (
        <div className="chatbot">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>{msg.text}</div>
                ))}
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
