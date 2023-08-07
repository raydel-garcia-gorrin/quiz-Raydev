/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import { useState } from "react";
import { Results } from "./Results";

/* eslint-disable react/prop-types */
export const Question = ({
  filteredQuestion,
  questionsFiltered,
  indexQuestion,
  setIndexQuestion,
  setActiveQuiz,
}) => {
  const [score, setScore] = useState(0);
  const [selectAnswerIndex, setSelectAnswerIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answersRandom, setAnswersRandom] = useState([]);
  const [activeResult, setActiveResult] = useState(false);

  useEffect(() => {
    const answers = [
      ...filteredQuestion.incorrect_answers,
      filteredQuestion.correct_answer,
    ];

    setAnswersRandom(answers.sort(() => Math.random() - 0.5));
  }, [filteredQuestion]);

  const checkAnswer = (answerText, index) => {
    if (answerText === filteredQuestion.correct_answer) {
      setScore(score + 1);
    }
    setSelectAnswerIndex(index);
    setAnswered(true);
  };

  const onNextQuestion = () => {
    setIndexQuestion(indexQuestion + 1);
    setSelectAnswerIndex(null);
    setAnswered(false);
  };

  const onReset = () => {
    setScore(0);
    setActiveQuiz(false);
    setIndexQuestion(0);
  };

  return (
    <>
      {activeResult ? (
        <Results
          questionsFiltered={questionsFiltered}
          score={score}
          onReset={onReset}
        />
      ) : (
        <div className="flex flex-col justify-between shadow-md shadow-slate-300 w-[600px] h-[600px] p-10 rounded-lg">
          <div className="flex justify-between">
            <span className="text-xl font-bold">
              {/* Numero de pregunta actual y total de preguntas */}
              {indexQuestion + 1} / {questionsFiltered.length}
            </span>
            <div>
              <span className="font-semibold">Dificultad: </span>
              <span className="font-bold">
                {/* Dificultad de la pregunta */}
                {filteredQuestion.difficulty}
              </span>
            </div>
          </div>
          <button
            className="border px-5 py5 rounded-lg font-bold transition-all hover:bg-yellow-500 hover:text-gray-900"
            onClick={onReset}
          >
            Reiniciar
          </button>
          <div>
            <h1 className="font-bold">{filteredQuestion.question}</h1>
          </div>
          {/* Las respuestas aqui debajo */}
          <div className="grid grid-cols-2 gap-5">
            {/* Mapear un arreglo de respuesta correcta e incorrectas */}
            {answersRandom.map((answer, index) => (
              <button
                className={`border p-5 rounded-lg flex justify-center items-center hover:scale-105 ${
                  selectAnswerIndex !== null && index === selectAnswerIndex
                    ? answer === filteredQuestion.correct_answer
                      ? "bg-green-500"
                      : "bg-red-500"
                    : ""
                }`}
                key={answer}
                onClick={() => checkAnswer(answer, index)}
                disabled={answered && selectAnswerIndex !== index}
              >
                <p className="font-medium text-center text-sm">{answer}</p>
              </button>
            ))}
          </div>

          {/* Condicional para mostrar el boton de siguiente o finalizar */}
          {indexQuestion + 1 === questionsFiltered.length ? (
            <button
              className="border-2 border-yellow-600 text-yellow-600 rounded-md px-5 py2 hover:bg-yellow-600 hover:text-black font-medium"
              onClick={() => {
                setAnswered(false);
                setActiveResult(true);
              }}
            >
              Finalizar
            </button>
          ) : (
            <button
              className="border-2 border-yellow-600 text-yellow-600 rounded-md px-5 py2 hover:bg-yellow-600 hover:text-black font-medium
        "
              onClick={onNextQuestion}
            >
              Siguiente prgunta
            </button>
          )}
        </div>
      )}
    </>
  );
};
