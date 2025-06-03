import React, { useState, useEffect } from "react";

export default function QuizModal({ questions, onClose, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [shuffled, setShuffled] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffledQuestions = [...questions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setShuffled(shuffledQuestions);
  }, [questions]);

  const handleOptionClick = (option) => {
    if (reviewMode) return;
    setSelected({ ...selected, [current]: option });
  };

  const next = () => {
    if (current < 4) {
      setCurrent(current + 1);
    } else {
      const results = shuffled.map((q, index) => ({
        question: q.question,
        selected: selected[index],
        correct: q.answer,
        isCorrect: selected[index] === q.answer,
        options: q.options
      }));
      const correctCount = results.filter(r => r.isCorrect).length;

      setAnswers(results);
      setScore(correctCount);
      setReviewMode(true);
      onComplete(correctCount, 5, results);
    }
  };

  const closeReview = () => {
    setReviewMode(false);
    onClose();
  };

  const question = reviewMode ? answers[current] : shuffled[current];

  if (!question) return null;

  return (
    <div style={{
      position: "absolute",
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#333",
      color: "#fff",
      padding: "20px",
      borderRadius: "10px",
      zIndex: 100,
      width: "400px"
    }}>
      <h3>{reviewMode ? `Review ${current + 1}/5` : `Question ${current + 1}`}</h3>
      <p>{question.question}</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {question.options.map((opt) => {
          const isSelected = selected[current] === opt;
          const isCorrect = question.correct === opt;

          let background = "#444";
          if (reviewMode) {
            if (isCorrect) background = "#228B22"; // green
            else if (isSelected && !isCorrect) background = "#B22222"; // red
          } else {
            background = isSelected ? "#555" : "#444";
          }

          return (
            <li key={opt}
                style={{
                  padding: "8px",
                  background,
                  marginBottom: "6px",
                  borderRadius: "5px",
                  cursor: reviewMode ? "default" : "pointer"
                }}
                onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </li>
          );
        })}
      </ul>

      {!reviewMode ? (
        <button onClick={next} style={{ marginTop: "10px" }}>
          {current === 4 ? "Finish" : "Next"}
        </button>
      ) : (
        <>
          {current < 4 ? (
            <button onClick={() => setCurrent(current + 1)} style={{ marginTop: "10px" }}>
              Next
            </button>
          ) : (
            <div>
              <p style={{ marginTop: 10 }}>✅ Score: {score} / 5</p>
              <button onClick={closeReview} style={{ marginTop: "10px" }}>
                Close
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
