# Handa360
Handa360 is a web application that turns general disaster-preparedness instructions into a catered set of actionable items.

Website: https://bfur64.github.io/handa360/

<img width="1920" height="1080" alt="Image of the Web Application Form" src="https://github.com/user-attachments/assets/b2435d8c-e707-443a-9792-072c9f158aa8" />
<img width="1920" height="1833" alt="Image of the Web Application Output" src="https://github.com/user-attachments/assets/96aa6180-8ea6-46cf-9052-b052f09805fa" />

## The Problem: Information Fragmentation
When preparing for an impending disaster, critical information is heavily fragmented. A family preparing for a typhoon must check the NDRRMC for general weather prep, consult a completely separate government pamphlet for child safety procedures, and manually hunt down their specific barangay's emergency contact numbers. This scattered, cross-referencing approach is inefficient and leads to critical preparation gaps.

## The Solution
Handa360 acts as a rapid Context-Aware Assembly Engine. We eliminate the need for citizens to manually compile their own survival manuals.

By selecting their specific parameters (Hazard, Location, Special Needs), our application pulls from isolated, modular datasets (via our data/* architecture) and instantly aggregates them into a single, unified dashboard. It takes the general "Drought" checklist, seamlessly appends the "Child Safety" checklist, and anchors it all with localized emergency contacts. One screen, zero cross-referencing required.

## Key Features
- **Unified Action Plans:** Instantly combines generic hazard guidelines (e.g., Typhoon) with specific special-needs protocols (e.g., Toddler) into one localized checklist. Zero cross-referencing required.
- **Zero-Code Updates:** Driven entirely by a decentralized data/* directory. Local leaders can update protocols or add new hazards simply by editing text files—no coding or deployment necessary.
- **Dynamic Local Contacts:** Automatically pulls and anchors the exact emergency numbers (Barangay hotlines, DRRMOs) for the user's specific location directly at the bottom of their action plan.
- **Ultra-Lightweight:** Uses simple, isolated dataset aggregation instead of heavy databases, ensuring near-instant load times on low-end mobile devices during critical moments.

## Tech Stack
- **Frontend Architecture:** Pure HTML, CSS, and Vanilla JavaScript. By eliminating framework overhead (like React or Angular), the application maintains a microscopic footprint, ensuring it loads even on 2G/3G network connections.
- **Type Safety:** @ts-check (JSDoc TypeScript). We enforced strict type-checking across our JavaScript logic to guarantee runtime stability and prevent critical failure points without the build-time overhead of a full TypeScript compiler.
- **Data Synchronization Engine:** Custom polling logic (cachedServices.js and cachedData.js). Instead of relying on a fragile REST API or database connection, the client seamlessly polls the local GitHub repository's data/* directory. This decouples the UI from the data layer entirely.
- **Deployment & Hosting:** GitHub Pages. By deploying as a static site on GitHub's global CDN, we ensure high availability and resistance to traffic spikes that typically crash local government websites during a crisis.

## Project Roadmap (What's next)
While our current build successfully parses localized data into actionable survival steps, our primary focus for Phase 2 is **True Offline Resilience.**

During a major crisis (like a typhoon or earthquake), cell towers drop. Our immediate next step is to implement Service Workers and a Progressive Web App (PWA) architecture. This will allow the application to aggressively cache the data/* directory locally on the user's device when they do have internet, ensuring the dynamic action lists and emergency contacts are fully accessible even in a total communications blackout.

## Team
- **Terrance Evan I. Clark (Systems Architect & Lead Logic Developer):** Designed the zero-dependency architecture, developed the core data-parsing engine, and implemented the local polling mechanisms.
- **Mehlcon D. Casimero (Fullstack Integration):** Managed cross-functional development and bridged the frontend UI with the data aggregation logic.
- **Christine Joy D. Roberto (Frontend Developer):** Spearheaded the user interface design and client-side restructuring.
- **Curt Lawrence Z. Macalacad (Frontend Developer):** Developed the foundational UI skeleton and rapid prototypes that established the application's core design language.

## About
This project was made for a hackathon, "UPV KomsaiHack 2026: Risk Ready" under our team name, "The Vibe Coders 67".
