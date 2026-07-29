import type { InterviewAnswer as InterviewAnswerType } from "../types/study";

type InterviewAnswerProps = {
  item: InterviewAnswerType;
};

export function InterviewAnswer({ item }: InterviewAnswerProps) {
  return (
    <section className="panel interviewPanel">
      <p className="eyebrow">EXPLAIN LIKE YOU'RE INTERVIEWING</p>
      <h2>{item.question}</h2>
      <blockquote>{item.answer}</blockquote>
      <p><strong>Follow-up:</strong> {item.followUp}</p>
    </section>
  );
}
