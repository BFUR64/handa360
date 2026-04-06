# Handa360

**Consolidates 3+ fragmented disaster resources into 1 localized action plan**

Handa360 web app that turns general disaster-preparedness instructions into a catered set of actionable items.

Website: <https://bfur64.github.io/handa360/>

<img width="1920" height="1080" alt="User selects a location, with a continue button on the bottom" src="https://github.com/user-attachments/assets/b2435d8c-e707-443a-9792-072c9f158aa8" />
<img width="1920" height="1833" alt="Unified action plan with local emergency contacts" src="https://github.com/user-attachments/assets/96aa6180-8ea6-46cf-9052-b052f09805fa" />

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
