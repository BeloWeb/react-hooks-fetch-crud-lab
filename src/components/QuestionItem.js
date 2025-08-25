import React from "react";

function QuestionItem({ question, onUpdate, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
    })
    .then(()=>{
      onDelete(id);
    })
    .catch((error) => console.error("Failed to DELETE question", error));
  }

  function handleCorrectAnswerChange(event){
    const newIndex = Number(event.target.value);

  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({correctIndex: newIndex}),
  })
  .then((res)=> res.JSON())
  .then((updatedQuestion)=> {
    onUpdate(updatedQuestion)
  })
  .catch((error)=> console.error("Failed to PATCH the question", error));
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleCorrectAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
