import type { Question, ScenarioStep, StudyModule } from "../types/study";

export const modules: StudyModule[] = [
  {
    id: "networking",
    title: "Networking Core",
    focus: "Build the Layer 2/3 fluency needed to isolate customer-impacting faults quickly.",
    facts: [
      "ARP resolves an IPv4 address to a link-layer address on the local segment.",
      "A switch forwards Ethernet frames using its MAC address table; a router forwards packets between IP networks.",
      "VLANs create separate Layer 2 broadcast domains, while 802.1Q trunks carry tagged traffic for multiple VLANs.",
      "A default route is used only when no more-specific route matches the destination.",
      "If a host reaches an IP address but not a hostname, test DNS before changing routing or Layer 2 configuration.",
      "A disciplined fault path is physical → link/VLAN → IP/ARP → routing → DNS/TCP → application.",
    ],
    sources: [
      { label: "IETF RFC 826 — ARP", url: "https://www.rfc-editor.org/rfc/rfc826" },
      { label: "IETF RFC 8200 — IPv6", url: "https://www.rfc-editor.org/rfc/rfc8200" },
    ],
  },
  {
    id: "linux",
    title: "Linux Diagnostics",
    focus: "Turn your Linux background into concise, evidence-driven troubleshooting answers.",
    facts: [
      "Use ip link and ip addr to verify interface state, addresses, and prefixes.",
      "Use ip route to inspect routes, next hops, interfaces, and the default gateway.",
      "Use ss -lntup to inspect listening TCP/UDP sockets and associated processes.",
      "Use dig or resolvectl to distinguish DNS resolver problems from basic IP reachability problems.",
      "Use tcpdump with a narrow host, port, or interface filter to confirm packet direction and response behavior.",
      "Use journalctl and systemctl status to correlate service failures with network symptoms.",
    ],
    sources: [
      { label: "Red Hat Enterprise Linux 9 networking guide", url: "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_and_managing_networking/" },
      { label: "iproute2 documentation", url: "https://www.kernel.org/doc/html/latest/networking/index.html" },
    ],
  },
  {
    id: "pon",
    title: "GPON / XGS-PON",
    focus: "Learn the passive optical access architecture and failure patterns most relevant to Nokia Fixed Networks support.",
    facts: [
      "The OLT is the operator-side termination; the ONT or ONU is the customer-side optical endpoint.",
      "The ODN contains feeder fiber, distribution fiber, connectors, splices, and passive splitters.",
      "GPON provides asymmetric gigabit-class service; XGS-PON provides symmetrical 10 Gb/s-class capability.",
      "One ONT offline suggests a drop, ONT, optical-power, provisioning, or customer-premises issue.",
      "Many ONTs on one PON failing together suggests a shared OLT port, feeder, splitter, power, software, or configuration fault.",
      "Loss of signal is a physical/optical symptom; registration or authentication failure may instead indicate provisioning or control-plane issues.",
    ],
    sources: [
      { label: "Nokia — XGS-PON", url: "https://www.nokia.com/broadband-access/gigabit-fiber/xgs-pon/" },
      { label: "ITU-T G.9807.1 — XGS-PON", url: "https://www.itu.int/rec/T-REC-G.9807.1" },
    ],
  },
  {
    id: "support",
    title: "Customer Escalation",
    focus: "Combine technical diagnosis with ownership, communication, and evidence-quality escalation.",
    facts: [
      "Establish scope, impact, start time, recent changes, topology, and whether the fault is isolated or shared.",
      "State a working hypothesis, then run the lowest-risk test that can disprove or strengthen it.",
      "Change one variable at a time whenever possible so the result remains attributable.",
      "Prioritize service restoration or a safe workaround before perfecting the root-cause narrative.",
      "Communicate what is known, what remains unknown, what is being tested, and the next update time.",
      "Escalate with timestamps, alarms, logs, topology, configuration, reproduction steps, actions already taken, and business impact.",
    ],
    sources: [
      { label: "Nokia — Broadband network services", url: "https://www.nokia.com/broadband-access/network-services/" },
      { label: "Google SRE — Managing incidents", url: "https://sre.google/sre-book/managing-incidents/" },
    ],
  },
];

export const questions: Question[] = [
  {
    id: "networking-1",
    moduleId: "networking",
    prompt: "A host reaches 8.8.8.8 but cannot resolve nokia.com. What should you test first?",
    options: ["DNS", "ARP", "Spanning Tree", "Optical power"],
    answer: 0,
    explanation: "Basic IP reachability works, so name resolution is the highest-value next check.",
  },
  {
    id: "networking-2",
    moduleId: "networking",
    prompt: "Which device normally separates IP broadcast domains?",
    options: ["Hub", "Layer 2 switch", "Router", "Passive splitter"],
    answer: 2,
    explanation: "Routers forward between Layer 3 networks and do not normally forward Layer 2 broadcasts.",
  },
  {
    id: "networking-3",
    moduleId: "networking",
    prompt: "What does an 802.1Q trunk commonly carry?",
    options: ["Only one untagged VLAN", "Multiple tagged VLANs", "Only optical alarms", "Only routing protocols"],
    answer: 1,
    explanation: "An 802.1Q trunk carries traffic for multiple VLANs using VLAN tags.",
  },
  {
    id: "linux-1",
    moduleId: "linux",
    prompt: "Which command best shows the Linux routing table and default route?",
    options: ["ip addr", "ip route", "ss -lnt", "journalctl -b"],
    answer: 1,
    explanation: "ip route shows destination prefixes, next hops, interfaces, and the default route.",
  },
  {
    id: "linux-2",
    moduleId: "linux",
    prompt: "Which command is best for checking listening TCP sockets and their processes?",
    options: ["ss -lntp", "ip neigh", "dig +trace", "ethtool -S"],
    answer: 0,
    explanation: "ss -lntp lists listening TCP sockets and, with sufficient privileges, process information.",
  },
  {
    id: "linux-3",
    moduleId: "linux",
    prompt: "You need to prove whether SYN packets leave an interface and whether SYN-ACKs return. Which tool is strongest?",
    options: ["systemctl", "tcpdump", "hostnamectl", "lsblk"],
    answer: 1,
    explanation: "A filtered packet capture directly shows packet direction, flags, timing, and responses.",
  },
  {
    id: "pon-1",
    moduleId: "pon",
    prompt: "Every ONT on one PON port loses service simultaneously. What is the best first focus?",
    options: ["One home router", "The shared OLT/ODN path", "One subscriber password", "Browser cache"],
    answer: 1,
    explanation: "A common outage points toward common infrastructure rather than an isolated endpoint.",
  },
  {
    id: "pon-2",
    moduleId: "pon",
    prompt: "What is the customer-premises optical termination device commonly called?",
    options: ["OLT", "ONT", "BGP", "VLAN"],
    answer: 1,
    explanation: "The ONT terminates the optical access connection at the customer premises.",
  },
  {
    id: "pon-3",
    moduleId: "pon",
    prompt: "One ONT shows loss of signal while neighboring ONTs remain healthy. What should you suspect first?",
    options: ["Internet-wide DNS failure", "The subscriber drop or ONT optical path", "Every OLT in the network", "Core BGP convergence"],
    answer: 1,
    explanation: "An isolated LOS condition points first to the endpoint-specific optical path or ONT.",
  },
  {
    id: "support-1",
    moduleId: "support",
    prompt: "During a major outage, which response is strongest?",
    options: ["Wait for root cause before updating", "Change several variables at once", "Establish scope, gather evidence, restore service, and communicate", "Immediately blame customer equipment"],
    answer: 2,
    explanation: "Strong support engineering combines structured diagnosis, restoration, evidence, and communication.",
  },
  {
    id: "support-2",
    moduleId: "support",
    prompt: "Which escalation package is most useful to the next engineering tier?",
    options: ["It is broken", "A screenshot without time context", "Topology, timestamps, alarms, logs, actions, and impact", "A list of guesses"],
    answer: 2,
    explanation: "A reproducible, time-correlated evidence package reduces duplicated work and speeds isolation.",
  },
  {
    id: "support-3",
    moduleId: "support",
    prompt: "Why should you usually change one variable at a time?",
    options: ["It makes incidents last longer", "It preserves causal attribution", "It eliminates the need for logs", "It guarantees the first hypothesis is correct"],
    answer: 1,
    explanation: "Controlled changes let you connect an observed result to a specific action.",
  },
];

export const outageScenario: ScenarioStep[] = [
  {
    title: "Initial ticket",
    evidence: "2,500 subscribers lost broadband service at 14:32 UTC.",
    takeaway: "Do not start with individual customer equipment. Establish the common scope first.",
  },
  {
    title: "Scope",
    evidence: "All affected subscribers map to one OLT PON interface; adjacent PON interfaces are healthy.",
    takeaway: "The fault domain has narrowed to infrastructure shared by that PON.",
  },
  {
    title: "Alarm evidence",
    evidence: "The OLT reports loss of signal on the affected interface, beginning at the incident start time.",
    takeaway: "A time-correlated optical alarm strengthens a physical-layer hypothesis.",
  },
  {
    title: "Next action",
    evidence: "Check OLT optics and interface state, then the feeder fiber, connectors, splices, and splitter path.",
    takeaway: "Work from shared upstream components toward downstream branches before inspecting individual ONTs.",
  },
  {
    title: "Escalation note",
    evidence: "Include impact, timestamps, affected interface, neighboring health, alarms, tests performed, and current restoration status.",
    takeaway: "A strong escalation is a compressed technical case, not merely a request for help.",
  },
];
