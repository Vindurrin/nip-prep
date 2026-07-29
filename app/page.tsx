"use client";

import { useEffect, useMemo, useState } from "react";
import { ModuleNav } from "../components/ModuleNav";
import { Quiz } from "../components/Quiz";
import { Scenario } from "../components/Scenario";
import { modules, outageScenario, questions } from "../content/study-data";
import type { StudyProgress } from "../types/study";

const STORAGE_KEY = "nip-prep-progress-v2";

export default function Home() {
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  const [answers, setAnswers] = useState<StudyProgress>({});
  const [scenarioStep, setScenarioStep] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      setAnswers(JSON.parse(saved) as StudyProgress);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const selectedModule = modules.find((module) => module.id === activeModuleId) ?? modules[0];
  const activeQuestions = questions.filter((question) => question.moduleId === activeModuleId);

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

  function answerQuestion(questionId: string, optionIndex: number) {
    setAnswers((current) => ({ ...current, [questionId]: optionIndex }));
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
          <h1>Build enough network depth to make your engineering experience count.</h1>
          <p className="lede">
            A focused study site for networking, Linux diagnostics, GPON/XGS-PON, and evidence-driven customer escalation.
          </p>
        </div>
        <div className="scorecard">
          <span>Overall readiness</span>
          <strong>{score.percentage}%</strong>
          <small>{score.correct} correct · {score.answered}/{questions.length} answered</small>
        </div>
      </header>

      <ModuleNav modules={modules} activeModuleId={activeModuleId} onSelect={setActiveModuleId} />

      <section className="panel lesson">
        <div>
          <p className="eyebrow">LEARN</p>
          <h2>{selectedModule.title}</h2>
          <p>{selectedModule.focus}</p>
          <small>{moduleScore.correct} correct · {moduleScore.answered}/{activeQuestions.length} answered in this module</small>
        </div>
        <ol>
          {selectedModule.facts.map((fact) => <li key={fact}>{fact}</li>)}
        </ol>
        <div>
          {selectedModule.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
              Authoritative source: {source.label} ↗
            </a>
          ))}
        </div>
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
        <p>Built first as a personal Nokia cram site, with reusable content and component boundaries for future expansion.</p>
      </footer>
    </main>
  );
}
