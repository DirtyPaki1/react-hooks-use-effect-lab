import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
 const [timeRemaining, setTimeRemaining] = useState(10);

 useEffect(() => {
    // Function to handle the countdown
    const countdown = () => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        // Reset timeRemaining and call onAnswered with false
        setTimeRemaining(10);
        onAnswered(false);
      }
    };

    // Set up the timeout to run the countdown every second
    const timeoutId = setTimeout(countdown, 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
 }, [timeRemaining, onAnswered]); // Dependencies for useEffect

 function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
 }

 const { id, prompt, answers, correctIndex } = question;

 return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
 );
}

export default Question;
