# NIP Prep

A focused, source-backed Nokia Fixed Networks interview cram site tailored to an experienced telecom/software engineer building deeper network-engineering fluency.

## Current MVP

- Four targeted modules: Networking Core, Linux Diagnostics, GPON/XGS-PON, and Customer Escalation
- Authoritative source links embedded in each lesson
- Five interactive interview-essential quiz questions
- Immediate answer explanations
- Browser-persisted progress using `localStorage`
- Step-by-step shared-PON outage scenario
- Responsive dark UI

Mock-interview functionality is intentionally out of scope for this release.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Product direction

The near-term goal is personal Nokia interview readiness. The curriculum and module structure can later expand into broader fixed-access and network-support preparation without making the current UI generic or unfocused.
