import type { Flashcard, InterviewAnswer } from "../types/study";

export const flashcards: Flashcard[] = [
  { id: "fc-net-arp", moduleId: "networking", front: "What does ARP do?", back: "ARP resolves an IPv4 address to a MAC address on the local Layer 2 network.", cue: "Think: IP to Ethernet delivery." },
  { id: "fc-net-route", moduleId: "networking", front: "What is a default route?", back: "The route used when no more-specific destination prefix matches.", cue: "Usually written as 0.0.0.0/0 for IPv4." },
  { id: "fc-net-vlan", moduleId: "networking", front: "What problem does a VLAN solve?", back: "It creates separate Layer 2 broadcast domains on shared switching infrastructure." },
  { id: "fc-net-trunk", moduleId: "networking", front: "Access port versus trunk port?", back: "An access port normally carries one untagged VLAN; a trunk carries multiple VLANs, commonly using 802.1Q tags." },
  { id: "fc-net-dns", moduleId: "networking", front: "A host reaches 8.8.8.8 but not nokia.com. First suspicion?", back: "DNS resolution, because IP connectivity is already demonstrated." },
  { id: "fc-net-path", moduleId: "networking", front: "What troubleshooting order should you memorize?", back: "Physical → link/VLAN → IP/ARP → routing → DNS/TCP → application." },

  { id: "fc-linux-addr", moduleId: "linux", front: "Which command shows Linux interface addresses?", back: "ip addr" },
  { id: "fc-linux-route", moduleId: "linux", front: "Which command shows routes and the default gateway?", back: "ip route" },
  { id: "fc-linux-ss", moduleId: "linux", front: "Which command replaces much of netstat for sockets?", back: "ss; for example, ss -lnt shows listening TCP sockets numerically." },
  { id: "fc-linux-dig", moduleId: "linux", front: "Which command gives detailed DNS query results?", back: "dig, including the answering server, response code, and returned records." },
  { id: "fc-linux-tcpdump", moduleId: "linux", front: "Why use tcpdump?", back: "To verify whether packets leave, arrive, and receive responses at a specific interface." },
  { id: "fc-linux-journal", moduleId: "linux", front: "How do you inspect recent service logs on systemd Linux?", back: "journalctl -u <service>; add -b for the current boot or -f to follow." },

  { id: "fc-pon-olt", moduleId: "pon", front: "What is an OLT?", back: "The provider-side optical line terminal that serves multiple subscribers over one or more PON interfaces." },
  { id: "fc-pon-ont", moduleId: "pon", front: "What is an ONT?", back: "The customer-premises optical network terminal that converts the PON connection into customer-facing services such as Ethernet." },
  { id: "fc-pon-odn", moduleId: "pon", front: "What is the ODN?", back: "The passive optical distribution network: feeder fiber, distribution fiber, splitters, connectors, and drop fiber between OLT and ONTs." },
  { id: "fc-pon-scope", moduleId: "pon", front: "One ONT is offline. Where do you focus first?", back: "The individual drop, ONT power, optical level, provisioning, or customer-side equipment." },
  { id: "fc-pon-shared", moduleId: "pon", front: "Every ONT on one PON port is offline. Where do you focus?", back: "Shared infrastructure: the OLT port or optic, feeder path, splitter path, configuration, power, or software." },
  { id: "fc-pon-xgs", moduleId: "pon", front: "What does XGS-PON provide?", back: "Symmetrical 10 Gb/s-class passive optical access; the S denotes symmetric upstream and downstream rates." },

  { id: "fc-support-scope", moduleId: "support", front: "What four facts establish incident scope?", back: "Who is affected, what is broken, when it started, and what changed." },
  { id: "fc-support-update", moduleId: "support", front: "What belongs in a strong customer update?", back: "Known impact, evidence gathered, action underway, current workaround or restoration status, and the next update time." },
  { id: "fc-support-escalate", moduleId: "support", front: "What makes an escalation actionable?", back: "Topology, scope, timestamps, alarms, logs, configuration, reproduction steps, attempted fixes, and business impact." },
  { id: "fc-support-restore", moduleId: "support", front: "Restore service or prove root cause first?", back: "Restore service or establish a safe workaround first when possible, while preserving evidence for root-cause analysis." },
  { id: "fc-support-change", moduleId: "support", front: "Why change one variable at a time?", back: "It preserves causality and makes it possible to identify which action changed the outcome." },
  { id: "fc-support-own", moduleId: "support", front: "What does incident ownership sound like?", back: "I will coordinate the investigation, keep the customer updated, document evidence, and drive the issue to restoration and handoff." },
];

export const interviewAnswers: InterviewAnswer[] = [
  {
    id: "ia-networking",
    moduleId: "networking",
    question: "How would you troubleshoot a customer who cannot reach a service?",
    answer: "I would establish scope and then work up the stack: physical state, link and VLAN, IP addressing and ARP, routing, DNS and transport, then the application. At each layer I would use evidence to decide whether to continue upward or isolate the fault locally.",
    followUp: "Mention commands such as ip addr, ip route, ping, dig, ss, and tcpdump when asked for specifics.",
  },
  {
    id: "ia-linux",
    moduleId: "linux",
    question: "Which Linux tools do you use for network troubleshooting?",
    answer: "I start with ip addr and ip route for interface and routing state, use ping or tracepath for reachability, dig for DNS, ss for sockets, and tcpdump when I need packet-level proof. I also check systemd service state and logs with systemctl and journalctl.",
    followUp: "Frame each command around the hypothesis it tests rather than listing tools without purpose.",
  },
  {
    id: "ia-pon",
    moduleId: "pon",
    question: "What is the difference between an OLT and an ONT?",
    answer: "The OLT is the provider-side system that controls and serves many subscriber connections over the passive optical network. The ONT is the customer-premises endpoint that terminates the optical signal and presents services such as Ethernet. One ONT failing suggests an individual path; an entire PON failing suggests shared infrastructure.",
    followUp: "Use the one-customer-versus-many-customers distinction to demonstrate troubleshooting judgment.",
  },
  {
    id: "ia-support",
    moduleId: "support",
    question: "How do you handle a high-impact customer escalation?",
    answer: "I establish scope, business impact, timing, and recent changes; collect alarms, logs, topology, and configuration; isolate the failing layer; and prioritize restoration or a safe workaround. I provide regular updates that separate confirmed facts from hypotheses and document the final resolution and follow-up actions.",
    followUp: "Show ownership without overpromising: state what you know, what you are testing, and when the next update will occur.",
  },
];
