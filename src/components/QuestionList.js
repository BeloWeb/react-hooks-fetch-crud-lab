import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ setQuestions, questions }) {
  useEffect(
  ()=>{
      fetch("http://localhost:4000/questions")
      .then((res)=> res.json())
      .then(data => setQuestions(data))
      .catch((error)=> console.error("Failed to fetch questions:",error))
  }, []
  )

  function handleDelete(id){
    setQuestions(prev => prev.filter(q=> q.id !== id))
  }

  function handleUpdate(updatedQuestion) {
  setQuestions((prevQuestions) =>
    prevQuestions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    )
  );
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}

            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
