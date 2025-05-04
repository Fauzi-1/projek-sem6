// Import library React dan hooks useState, useEffect
import React, { useState, useEffect } from 'react';
// Import axios instance untuk komunikasi API
import axios from '../../api/api';

// Komponen menerima props: selectedChatbot (untuk mode edit) dan fetchChatbots (untuk refresh data)
const ChatbotForm = ({ selectedChatbot, fetchChatbots }) => {
  // State untuk menyimpan input pola pertanyaan dan respon chatbot
  const [questionPattern, setQuestionPattern] = useState('');
  const [response, setResponse] = useState('');

  // Jika selectedChatbot berubah, isi form dengan data yang dipilih
  useEffect(() => {
    if (selectedChatbot) {
      // Mode edit: isi form dari data yang ada
      setQuestionPattern(selectedChatbot.questionPattern);
      setResponse(selectedChatbot.response);
    } else {
      // Mode tambah: kosongkan form
      setQuestionPattern('');
      setResponse('');
    }
  }, [selectedChatbot]);

  // Fungsi yang dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    try {
      if (selectedChatbot) {
        // Jika sedang dalam mode edit, kirim permintaan PUT ke endpoint tertentu
        await axios.put(`/chatbot/${selectedChatbot._id}`, { questionPattern, response });
      } else {
        // Jika menambahkan baru, kirim permintaan POST
        await axios.post('/chatbot', { questionPattern, response });
      }

      // Setelah berhasil: refresh data, kosongkan form
      fetchChatbots();
      setQuestionPattern('');
      setResponse('');
    } catch (error) {
      // Tampilkan error jika proses gagal
      console.error('Gagal menyimpan chatbot:', error);
    }
  };

  // Render tampilan form
  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedChatbot ? 'Edit' : 'Tambah'} Pola Chatbot</h3>

      <div>
        <label>Pola Pertanyaan (Regex atau Kata Kunci)</label>
        <input
          type="text"
          value={questionPattern}
          onChange={(e) => setQuestionPattern(e.target.value)} // Update state saat input berubah
          required
        />
      </div>

      <div>
        <label>Respon Chatbot</label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)} // Update state saat textarea berubah
          required
        ></textarea>
      </div>

      {/* Tombol submit, teksnya bergantung pada mode edit atau tambah */}
      <button type="submit">{selectedChatbot ? 'Update' : 'Tambah'}</button>
    </form>
  );
};

export default ChatbotForm;
