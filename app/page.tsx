"use client";

import { useEffect, useMemo, useState } from "react";
import { Flashcards } from "../components/Flashcards";
import { InterviewAnswer } from "../components/InterviewAnswer";
import { ModuleNav } from "../components/ModuleNav";
import { Quiz } from "../components/Quiz";
import { Scenario } from "../components/Scenario";
import { flashcards, interviewAnswers } from "../content/cram-data";
import { modules, outageScenario, questions } from "../content/study-data";
import type { FlashcardProgress, FlashcardRating, StudyProgress } from "../types/study";

const QUIZ_STORAGE_KEY = "nip-prep-progress-v2";
const CARD_STORAGE_KEY = "nip-prep-flashcards-v1";

function readStored<T>(key: string, fallback: T): T {
  const saved = window.localStorage.getItem(key);
  if (!saved) return fallback;

  try {
    return JSON.parse(saved) as T;
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
}

export default function Home() {
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  const [answers, setAnswers] = useState<StudyProgress>({});
  const [cardProgress, setCardProgress] = useState<FlashcardProgress>({});
  const [scenarioStep, setScenarioStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setAnswers(readStored(QUIZ_STORAGE_KEY, {}));
    setCardProgress(readStored(CARD_STORAGE_KEY, {}));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(answers));
  }, [answers, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(cardProgress));
  }, [cardProgress, hydrated]);

  const selectedModule = modules.find((module) => module.id === activeModuleId) ?? modules[0];
  const activeQuestions = questions.filter((question) => question.moduleId === activeModuleId);
  const activeCards = flashcards.filter((card) => card.moduleId === activeModuleId);
  const interviewAnswer = interviewAnswers.find((item) => item.moduleId === activeModuleId) ?? interviewAnswers[0];

  const score = useMemo(() => {
    const answeredQuestions = questions.filter((question) => answers[question.id] !== undefined);
    const correct = answeredQuestions.filter((question) => answers[question.id] === question.answer).length;

    return {
      answered: answeredQuestions.length,
      correct,
      percentage: answeredQuestions.length ? Math.round((correct / answeredQuestions.length) * 100) : 0,
    };
  }, [answers]);

  const moduleScore = useMemo(() => {
    const answered = activeQuestions.filter((question) => answers[question.id] !== undefined);
    const correct = answered.filter((question) => answers[question.id] === question.answer).length;
    return { answered: answered.length, correct };
  }, [activeQuestions, answers]);

  const cardsReviewed = flashcards.filter((card) => cardProgress[card.id]).length;
  const cardsToRepeat = flashcards.filter((card) => cardProgress[card.id] === "again").length;

  function answerQuestion(questionId: string, optionIndex: number) {
    setAnswers((current) => ({ ...current, [questionId]: optionIndex }));
  }

  function rateCard(cardId: string, rating: FlashcardRating) {
    setCardProgress((current) => ({ ...current, [cardId]: rating }));
  }

  function resetActiveModule() {
    const activeIds = new Set(activeQuestions.map((question) => question.id));
    setAnswers((current) =>
      Object.fromEntries(Object.entries(current).filter(([questionId]) => !activeIds.has(questionId))),
    );
  }

  return (
    <main>
      <header className="hero">
        <div>
          <p className="eyebrow">NOKIA FIXED NETWORKS INTERVIEW CRAM</p>
          <h1>Practice the answers you need, not the documentation you do not.</h1>
          <p className="lede">
            Active recall, concise interview responses, targeted quizzes, and access-network troubleshooting practice.
          </p>
        </div>
        <div className="scorecard">
          <span>Overall readiness</span>
          <strong>{score.percentage}%</strong>
          <small>{score.correct} correct · {score.answered}/{questions.length} answered</small>
        </div>
      </header>

      <section className="reviewStrip" aria-label="Today's review">
        <div><span>Today&apos;s cards</span><strong>{flashcards.length}</strong></div>
        <div><span>Reviewed</span><strong>{cardsReviewed}</strong></div>
        <div><span>Repeat</span><strong>{cardsToRepeat}</strong></div>
        <div><span>Quiz questions</span><strong>{questions.length}</strong></div>
      </section>

      <ModuleNav modules={modules} activeModuleId={activeModuleId} onSelect={setActiveModuleId} />

      <section className="panel lesson">
        <div>
          <p className="eyebrow">2-MINUTE LEARN</p>
          <h2>{selectedModule.title}</h2>
          <p>{selectedModule.focus}</p>
          <small>{moduleScore.correct} correct · {moduleScore.answered}/{activeQuestions.length} answered in this module</small>
        </div>
        <ol>
          {selectedModule.facts.map((fact) => <li key={fact}>{fact}</li>)}
        </ol>
        <div className="sourceList">
          {selectedModule.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
              Verify: {source.label} ↗
            </a>
          ))}
        </div>
      </section>

      <section className="studyGrid">
        <Flashcards cards={activeCards} progress={cardProgress} onRate={rateCard} />
        <InterviewAnswer item={interviewAnswer} />
      </section>

      <section className="twoColumn">
        <Quiz
          questions={activeQuestions}
          answers={answers}
          onAnswer={answerQuestion}
          onReset={resetActiveModule}
        />
        <Scenario
          steps={outageScenario}
          currentStep={scenarioStep}
          onBack={() => setScenarioStep((step) => Math.max(0, step - 1))}
          onNext={() => setScenarioStep((step) => Math.min(outageScenario.length - 1, step + 1))}
        />
      </section>

      <footer>
        <p>Built first as a personal Nokia cram site. Use the source links to verify details, not as the primary study experience.</p>
      </footer>
    </main>
  );
}
