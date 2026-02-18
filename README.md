# 🎮 Bug Hunter Game

A QA-focused web game where players analyze real-world software scenarios, identify defects, and learn bug classification through gameplay.

This project is built as a learning journey: step-by-step frontend development with a strong testing mindset.

---

## ✨ Features (MVP)

- Mission list (bug scenarios)
- Multiple-choice answers
- Immediate feedback with explanations
- Score persistence using LocalStorage
- Clean UI with TailwindCSS

---

## 🧠 How It Works

1. Pick a mission (scenario).
2. Read the context and evidence.
3. Choose the most accurate bug classification/root cause.
4. See the explanation and earn points.

---

## 🛠 Tech Stack

- React + Vite
- TailwindCSS
- React Router
- PostCSS
- LocalStorage

---

## 📦 Getting Started

### Requirements
- Node.js (LTS recommended)
- npm

### Run locally
```bash
npm install
npm run dev

Open the URL shown in your terminal (e.g. http://localhost:5173).

📁 Project Structure
src/
  components/   # Reusable UI components
  pages/        # Screens (Home, Mission, Result)
  data/         # Missions dataset (JSON)
  core/         # Business logic (scoring, persistence, helpers)
🧪 Testing Roadmap
Planned test strategy:

Unit tests for scoring and persistence logic

Integration tests for mission flow

E2E tests with Cypress

CI with GitHub Actions

🗺 Roadmap
 Severity-based scoring

 Difficulty levels and timer

 Hint system

 Leaderboard

 Admin panel to create missions

 Backend + Auth (Node + PostgreSQL)

 Automated test suite (Vitest + Cypress)

🎯 QA Concepts Practiced
Bug classification

Severity vs. priority (planned)

Authentication flaws

Idempotency/double submit issues

Clear separation of UI and business rules