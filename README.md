# Handa360

**Consolidates 3+ fragmented disaster resources into 1 localized action plan**

Handa360 web app that turns general disaster-preparedness instructions into a catered set of actionable items.

Website: <https://bfur64.github.io/handa360/>

## Screenshots
### Dark Mode
<img width="1920" height="919" alt="App asks user to select a hazard, with a next button on the bottom to confirm selection" src="https://github.com/user-attachments/assets/6ae5ac22-a91c-4c2c-8c38-99f38150e2e4" />
<img width="1920" height="919" alt="App shows a dropdown menu of a checklist of a unified action plan, a go bag checklist, and local emergency contacts" src="https://github.com/user-attachments/assets/e5a0d34b-d631-4177-ac5d-29cad0bf3a56" />

### Light Mode
<img width="1920" height="919" alt="App asks user to select a hazard, with a next button on the bottom to confirm selection" src="https://github.com/user-attachments/assets/e2346b74-c97e-42c3-9ed5-4afe76afcdfe" />
<img width="1920" height="938" alt="App shows a dropdown menu of a checklist of a unified action plan, a go bag checklist, and local emergency contacts" src="https://github.com/user-attachments/assets/a4aa92c9-a1d5-4be9-8d0f-be9ef7ab7dfd" />

## Quick Demo

1. [Launch App](https://bfur64.github.io/handa360/)
2. Select "Typhoon" + "Person With Disability" + "Kalibo"
3. Get instant unified checklist with local DRRMO contacts

## The Problem: Information Fragmentation

Critical disaster information is scattered across agencies. A family preparing for a typhoon must cross-reference NDRRMC weather guidelines, separate child-safety pamphlets, and manually hunt down barangay emergency contacts, which wastes precious preparation time.

## The Solution

Handa360 acts as a rapid Context-Aware Assembly Engine. We eliminate the need for citizens to manually compile their own survival manuals.

By selecting their specific parameters (Hazard, Location, Special Needs), our application pulls from isolated, modular datasets (via our data/* architecture) and instantly aggregates them into a single, unified dashboard. It takes the general "Drought" checklist, seamlessly appends the "Child Safety" checklist, and anchors it all with localized emergency contacts. One screen, zero cross-referencing required.

## Key Features

- **Unified Action Plans:** Instantly combines generic hazard guidelines (e.g., Typhoon) with specific special-needs protocols (e.g., Toddler) into one localized checklist.
- **Zero-Code Updates:** Driven entirely by a decentralized data/* directory. Maintainers can update protocols or add new hazards by editing the JSON files.
- **Dynamic Local Contacts:** Automatically pulls and anchors the exact emergency numbers (Barangay hotlines, DRRMOs) for the user's specific location directly at the bottom of their action plan.
- **Ultra-Lightweight:** Uses simple, isolated dataset aggregation instead of heavy databases, ensuring near-instant load times on low-end mobile devices during critical moments.

## Tech Stack

- **Deployment:** GitHub Pages (99.9% uptime, CDN-backed for crisis traffic spikes)
- **Data Layer:** Zero-code text files (local leaders update protocols without developers)
- **Frontend:** Pure HTML/CSS/JS (works on 2G networks + low-end devices)
- **Type Safety:** JSDoc TypeScript (@ts-check for stability without build overhead)

## Team

- **Terrance Evan I. Clark (Systems Architect & Lead Logic Developer):** Designed the zero-dependency architecture, developed the core data-parsing engine, and implemented the local polling mechanisms.
- **Mehlcon D. Casimero (Fullstack Integration):** Managed cross-functional development and bridged the frontend UI with the data aggregation logic.
- **Christine Joy D. Roberto (Frontend Developer):** Spearheaded the user interface design and client-side restructuring.
- **Curt Lawrence Z. Macalacad (Frontend Developer):** Developed the foundational UI skeleton and rapid prototypes that established the application's core design language.

## AI Disclosure

In compliance with hackathon guidelines, we disclose the following AI tool usage:

- ChatGPT (OpenAI)
- Google Gemini
- Claude (Anthropic)

AI assistants were used as development accelerators in the following capacities:

1. **Code Documentation & Comments:** Assisted in writing JS Doc module explanations
2. **Debugging & Problem Solving:** Helped troubleshoot bottlenecks in the codebase
3. **Ideation & Architecture Review:** Discussing how and where JS modules are separated and organized

All AI-generated code was manually reviewed by team members, refactored to fit our needs, and integrated as part of our codebase.

## About

This project was made for a hackathon, "UPV KomsaiHack 2026: Risk Ready" under our team name, "The Vibe Coders 67".
