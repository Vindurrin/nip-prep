"use client";

import { useEffect, useMemo, useState } from "react";

type Module = {
  id: string;
  title: string;
  focus: string;
  facts: string[];
  source: { label: string; url: string };
};

type Question = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  module: string;
};

const modules: Module[] = [
  {
    id: "networking",
    title: "Networking Core",
    focus: "Build the minimum Layer 2/3 fluency needed to isolate customer-impacting faults.",
    facts: [
      "ARP maps an IPv4 address to a link-layer address on the local network.",
      "A default route is used when no more-specific route matches a destination.",
      "VLANs separate Layer 2 broadcast domains; trunks commonly carry multiple tagged VLANs.",
      "A useful fault path is physical → link/VLAN → IP/ARP → routing → DNS/TCP → application.",
    ],
    source: { label: "IETF RFC 826 — ARP", url: "https://www.rfc-editor.org/rfc/rfc826" },
  },
  {
    id: "linux",
    title: "Linux Diagnostics",
    focus: "Turn your existing Linux background into crisp network-troubleshooting answers.",
    facts: [
      "Use ip addr to inspect interfaces and assigned addresses.",
      "Use ip route to inspect the routing table and default gateway.",
      "Use ss to inspect listening and established sockets.",
      "Use tcpdump to confirm whether packets leave, arrive, and receive responses.",
    ],
    source: { label: "Red Hat Enterprise Linux networking documentation", url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_and_managing_networking/" },
  },
  {
    id: "pon",
    title: "GPON / XGS-PON",
    focus: "Learn the access architecture Nokia is most likely to probe.",
    facts: [
      "A PON connects an operator-side OLT to multiple customer-side ONTs through an optical distribution network and passive splitters.",
      "Nokia describes XGS-PON as symmetrical 10 Gb/s-class PON technology.",
      "One ONT offline points toward the drop fiber, ONT, optical power, provisioning, or customer equipment.",
      "An entire PON offline points toward shared infrastructure such as the OLT port, feeder fiber, splitter path, power, software, or configuration.",
    ],
    source: { label: "Nokia — XGS-PON", url: "https://www.nokia.com/broadband-access/gigabit-fiber/xgs-pon/" },
  },
  {
    id: "support",
    title: "Customer Escalation",
    focus: "Pair technical diagnosis with incident ownership and clear communication.",
    facts: [
      "Start by establishing scope, impact, timing, and recent changes.",
      "Restore service or identify a safe workaround before perfecting the root-cause narrative.",
      "Communicate what is known, what is being tested, and when the next update will occur.",
      "Escalate with evidence: topology, timestamps, logs, alarms, configuration, reproduction steps, and business impact.",
    ],
    source: { label: "Nokia — Broadband network services", url: "https://www.nokia.com/broadband-access/network-services/" },
  },
];

const questions: Question[] = [
  {
    id: "q1",
    module: "networking",
    prompt: "A host can reach 8.8.8.8 but cannot resolve nokia.com. Which subsystem should you test first?",
    options: ["DNS", "ARP", "Spanning Tree", "Optical power"],
    answer: 0,
    explanation: "IP reachability is working, so name resolution is the highest-value next check.",
  },
  {
    id: "q2",
    module: "networking",
    prompt: "Which command best shows the Linux routing table and default route?",
    options: ["ip addr", "ip route", "ss -lnt", "journalctl -b"],
    answer: 1,
    explanation: "ip route shows destination prefixes, next hops, interfaces, and the default route.",
  },
  {
    id: "q3",
    module: "pon",
    prompt: "Every ONT on one PON port loses service at the same time. What is the best first focus?",
    options: ["A single home router", "The shared OLT/ODN path", "One subscriber password", "A browser cache"],
    answer: 1,
    explanation: "A common outage points toward common infrastructure rather than an isolated customer endpoint.",
  },
  {
    id: "q4",
    module: "pon",
    prompt: "What is the customer-premises optical termination device commonly called?",
    options: ["OLT", "ONT", "BGP", "VLAN"],
    answer: 1,
    explanation: "The ONT terminates the optical access connection at the customer premises.",
  },
  {
    id: "q5",
    module: "support",
    prompt: "During a major outage, which response is strongest?",
    options: ["Wait for root cause before updating", "Change several variables at once", "Establish scope, gather evidence, restore service, and communicate updates", "Immediately blame customer equipment"],
    answer: 2,
    explanation: "Strong escalation engineering combines structured diagnosis, restoration, evidence, and communication.",
  },
];

const STORAGE_KEY = "nip-prep-progress-v1";

export default function Home() {
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [scenarioStep, setScenarioStep] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  const score = useMemo(() => {
    const answered = questions.filter((question) => answers[question.id] !== undefined);
    const correct = answered.filter((question) => answers[question.id] === question.answer).length;
    return { answered: answered.length, correct, pct: answered.length ? Math.round((correct / answered.length) * 100) : 0 };
  }, [answers]);

  const selected = modules.find((module) => module.id === activeModule) ?? modules[0];

  const scenario = [
    "Ticket: 2,500 subscribers on the same PON lost broadband service at 14:32 UTC.",
    "Scope confirmed: all affected subscribers map to one OLT PON interface; adjacent PONs are healthy.",
    "Evidence: the OLT reports a loss-of-signal condition on the affected interface.",
    "Best working hypothesis: investigate the shared optical path—OLT optics, feeder fiber, connectors, and splitter path—before individual ONTs.",
  ];

  return (
    <main>
      <header className="hero">
        <div>
          <p className="eyebrow">NOKIA FIXED NETWORKS INTERVIEW CRAM</p>
          <h1>Build enough network depth to make your engineering experience count.</h1>
          <p className="lede">A focused, source-backed study site for networking, Linux diagnostics, GPON/XGS-PON, and customer escalation.</p>
        </div>
        <div className="scorecard">
          <span>Quiz readiness</span>
          <strong>{score.pct}%</strong>
          <small>{score.correct} correct · {score.answered}/{questions.length} answered</small>
        </div>
      </header>

      <section className="moduleGrid" aria-label="Study modules">
        {modules.map((module) => (
          <button key={module.id} className={activeModule === module.id ? "module active" : "module"} onClick={() => setActiveModule(module.id)}>
            <span>{module.title}</span>
            <small>{module.focus}</small>
          </button>
        ))}
      </section>

      <section className="panel lesson">
        <div>
          <p className="eyebrow">LEARN</p>
          <h2>{selected.title}</h2>
          <p>{selected.focus}</p>
        </div>
        <ol>
          {selected.facts.map((fact) => <li key={fact}>{fact}</li>)}
        </ol>
        <a href={selected.source.url} target="_blank" rel="noreferrer">Primary / authoritative source: {selected.source.label} ↗</a>
      </section>

      <section className="twoColumn">
        <div className="panel">
          <p className="eyebrow">QUIZ</p>
          <h2>Interview essentials</h2>
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
                        onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
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
          <button className="reset" onClick={() => setAnswers({})}>Reset quiz</button>
        </div>

        <div className="panel scenarioPanel">
          <p className="eyebrow">APPLY</p>
          <h2>PON outage scenario</h2>
          <div className="topology" aria-label="PON topology">
            <span>CORE</span><b>↓</b><span>OLT</span><b>↓</b><span>FEEDER / SPLITTER</span><b>↓</b><span>2,500 ONTs</span>
          </div>
          <div className="scenarioText">{scenario[scenarioStep]}</div>
          <div className="scenarioActions">
            <button disabled={scenarioStep === 0} onClick={() => setScenarioStep((step) => Math.max(0, step - 1))}>Back</button>
            <button disabled={scenarioStep === scenario.length - 1} onClick={() => setScenarioStep((step) => Math.min(scenario.length - 1, step + 1))}>Reveal next evidence</button>
          </div>
          <p className="framework"><strong>Memorize:</strong> Scope → Impact → Timeline → Changes → Layer → Evidence → Isolate → Restore → Root cause → Document.</p>
        </div>
      </section>

      <footer>
        <p>Built as a personal Nokia cram site. Facts are linked to standards, vendor documentation, and authoritative technical references.</p>
      </footer>
    </main>
  );
}
