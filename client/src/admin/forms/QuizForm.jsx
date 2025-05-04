// src/admin/forms/QuizForm.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../api/api';

const QuizForm = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('/quizzes');
      setQuizzes(res.data);
    } catch (error) {
      console.error('Gagal mengambil daftar kuis:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    setFormData(prev => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.question.trim() || formData.options.some(opt => !opt.trim()) || !formData.correctAnswer.trim()) {
      alert('Mohon lengkapi semua kolom sebelum submit.');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };

      if (editId) {
        await axios.put(`/quizzes/${editId}`, formData, config);
        setEditId(null);
      } else {
        await axios.post('/quizzes', formData, config);
      }

      setFormData({ question: '', options: ['', '', '', ''], correctAnswer: '' });
      fetchQuizzes();
    } catch (error) {
      console.error('Gagal menyimpan kuis:', error);
    }
  };

  const handleEdit = (quiz) => {
    setFormData({
      question: quiz.question,
      options: quiz.options,
      correctAnswer: quiz.correctAnswer,
    });
    setEditId(quiz._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus soal ini?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
        await axios.delete(`/quizzes/${id}`, config);
        fetchQuizzes();
      } catch (error) {
        console.error('Gagal menghapus kuis:', error);
      }
    }
  };

  return (
    <div>
      <h2>{editId ? 'Edit Kuis' : 'Tambah Kuis Baru'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pertanyaan:</label><br />
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Masukkan pertanyaan"
            required
          />
        </div>

        <div>
          <label>Opsi Jawaban:</label><br />
          {formData.options.map((option, idx) => (
            <input
              key={idx}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Opsi ${idx + 1}`}
              required
            />
          ))}
        </div>

        <div>
          <label>Jawaban Benar:</label><br />
          <input
            type="text"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            placeholder="Masukkan jawaban benar"
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>
          {editId ? 'Update' : 'Tambah'}
        </button>
      </form>

      <h3 style={{ marginTop: '30px' }}>Daftar Kuis</h3>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id} style={{ marginBottom: '15px' }}>
            <strong>{quiz.question}</strong>
            <ul>
              {quiz.options.map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
            <em>Jawaban Benar: {quiz.correctAnswer}</em><br />
            <button onClick={() => handleEdit(quiz)}>Edit</button>{' '}
            <button onClick={() => handleDelete(quiz._id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizForm;
