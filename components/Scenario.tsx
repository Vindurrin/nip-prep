import type { ScenarioStep } from "../types/study";

type Props = {
  steps: ScenarioStep[];
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
};

export function Scenario({ steps, currentStep, onBack, onNext }: Props) {
  const step = steps[currentStep];

  return (
    <div className="panel scenarioPanel">
      <p className="eyebrow">APPLY</p>
      <h2>PON outage scenario</h2>
      <div className="topology" aria-label="PON topology">
        <span>CORE</span><b>↓</b><span>OLT</span><b>↓</b><span>FEEDER / SPLITTER</span><b>↓</b><span>2,500 ONTs</span>
      </div>
      <div className="scenarioText">
        <strong>{step.title}</strong>
        <p>{step.evidence}</p>
        <small>{step.takeaway}</small>
      </div>
      <div className="scenarioActions">
        <button disabled={currentStep === 0} onClick={onBack} type="button">Back</button>
        <button disabled={currentStep === steps.length - 1} onClick={onNext} type="button">Reveal next evidence</button>
      </div>
      <p className="framework"><strong>Memorize:</strong> Scope → Impact → Timeline → Changes → Layer → Evidence → Isolate → Restore → Root cause → Document.</p>
    </div>
  );
}
