import type { Question, StudyProgress } from "../types/study";

type Props = {
  questions: Question[];
  answers: StudyProgress;
  onAnswer: (questionId: string, optionIndex: number) => void;
  onReset: () => void;
};

export function Quiz({ questions, answers, onAnswer, onReset }: Props) {
  return (
    <div className="panel">
      <p className="eyebrow">QUIZ</p>
      <h2>Module essentials</h2>
      <div className="quizList">
        {questions.map((question, index) => {
          const chosen = answers[question.id];
          return (
            <article className="question" key={question.id}>
              <h3>{index + 1}. {question.prompt}</h3>
              <div className="answers">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    className={chosen === optionIndex ? "answer selected" : "answer"}
                    onClick={() => onAnswer(question.id, optionIndex)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {chosen !== undefined && (
                <p className={chosen === question.answer ? "feedback correct" : "feedback incorrect"}>
                  {chosen === question.answer ? "Correct. " : "Not yet. "}{question.explanation}
                </p>
              )}
            </article>
          );
        })}
      </div>
      <button className="reset" onClick={onReset} type="button">Reset this module</button>
    </div>
  );
}
