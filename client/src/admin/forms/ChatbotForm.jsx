import React, { useState, useEffect } from 'react';
import axios from '../../api/api';

const ChatbotForm = ({ selectedChatbot, fetchChatbots }) => {
  const [questionPattern, setQuestionPattern] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (selectedChatbot) {
      setQuestionPattern(selectedChatbot.questionPattern);
      setResponse(selectedChatbot.response);
    } else {
      setQuestionPattern('');
      setResponse('');
    }
  }, [selectedChatbot]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (selectedChatbot) {
        // Mode edit
        await axios.put(`/chatbot/${selectedChatbot._id}`, { questionPattern, response }, config);
        alert('Chatbot berhasil diperbarui!');
      } else {
        // Mode tambah
        await axios.post('/chatbot', { questionPattern, response }, config);
        alert('Chatbot berhasil ditambahkan!');
      }

      fetchChatbots();
      setQuestionPattern('');
      setResponse('');
    } catch (error) {
      console.error('Gagal menyimpan chatbot:', error);
      alert('Terjadi kesalahan saat menyimpan chatbot.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedChatbot ? 'Edit' : 'Tambah'} Pola Chatbot</h3>

      <div>
        <label>Pola Pertanyaan (Regex atau Kata Kunci)</label>
        <input
          type="text"
          value={questionPattern}
          onChange={(e) => setQuestionPattern(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Respon Chatbot</label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          required
        ></textarea>
      </div>

      <button type="submit">{selectedChatbot ? 'Update' : 'Tambah'}</button>
    </form>
  );
};

export default ChatbotForm;
