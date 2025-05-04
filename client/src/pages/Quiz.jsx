import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import '../assets/styles/Quiz.css'

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get('/quizzes');
        setQuestions(res.data);
      } catch (error) {
        console.error('Gagal mengambil kuis:', error);
      }
    };

    fetchQuiz();
  }, []);

  const handleAnswer = () => {
    if (!selected) return;

    if (selected === questions[current].correctAnswer) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected('');
    } else {
      setIsFinished(true);
    }
  };

  if (questions.length === 0) {
    return <p>Memuat kuis...</p>;
  }

  return (
    <div className="quiz-container">
      <h2>Kuis Hewan Langka</h2>
      {!isFinished ? (
        <div className="quiz-box">
          <h3>{questions[current].question}</h3>
          <ul>
            {questions[current].options.map((opt, idx) => (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                  />
                  {opt}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleAnswer}>Selanjutnya</button>
        </div>
      ) : (
        <div className="result">
          <h3>Kuis Selesai!</h3>
          <p>Skor kamu: {score} dari {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
