import React, { useState, useRef, useEffect } from 'react';
import axios from '../api/api';
import '../assets/styles/Chatbot.css'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Halo! Aku chatbot edukasi. Tanyakan tentang hewan langka!' }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post('/chatbot/ask', { message: input });
      const botMessage = { sender: 'bot', text: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage = { sender: 'bot', text: 'Terjadi kesalahan. Coba lagi nanti.' };
      setMessages((prev) => [...prev, botMessage]);
    }

    setInput('');
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <h2>Chatbot Edukasi</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Tanya sesuatu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Kirim</button>
      </div>
    </div>
  );
};

export default Chatbot;
