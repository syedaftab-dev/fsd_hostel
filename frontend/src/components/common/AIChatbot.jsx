import React, { useState, useEffect } from 'react';
import './AIChatbot.css';

const AIChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            setIsTyping(true);
            
            setTimeout(() => {
                setMessages(prev => [...prev, { text: 'AI response here', sender: 'bot' }]);
                setIsTyping(false);
            }, 1000);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h3>AI Assistant</h3>
            </div>
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={message }>
                        <div className="message-bubble">{msg.text}</div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message bot">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
            </div>
            <div className="input-container">
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="send-button">Send</button>
            </div>
        </div>
    );
};

export default AIChatbot;
