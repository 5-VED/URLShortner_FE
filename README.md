# 🔗 URLShortner Frontend (URLShortner_FE)

A modern, fast, and responsive URL shortener and link management web application frontend built with **React 19**, **TypeScript**, **Vite**, and **Material UI**.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Material UI](https://img.shields.io/badge/Material--UI-v9-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Oxlint](https://img.shields.io/badge/Linted_with-Oxlint-orange)](https://oxc.rs/)

---

## 🚀 Overview

**URLShortner_FE** provides an intuitive user interface for transforming long, unwieldy URLs into concise, trackable short links. Designed with a clean aesthetic and high-performance edge-routing mentality, this application enables users to customize link aliases, generate QR codes, inspect real-time click analytics, and explore tiered subscription plans.

---

## ✨ Features

- **⚡ Instant URL Shortener**: Drop any destination link into the hero input for immediate shortening.
- **🎨 Modern & Responsive UI**: Crafted with Material UI (MUI) components, custom gradients, smooth transitions, and mobile-first layouts.
- **📈 Real-Time Performance Highlights**: Highlighting global edge latency, redirect uptime, and links shortened.
- **🧭 Step-by-Step Workflow**: Clear 4-step user guide detailing link creation, customization, sharing, and performance tracking.
- **💳 Transparent Pricing Plans**: Tiered plans (_Free_, _Standard_, _Pro_, _Enterprise_) with detailed feature breakdowns.
- **❓ Interactive FAQ**: Smooth accordion expandable answers for common user questions.
- **🛡️ 100% Type-Safe**: Modular TypeScript interfaces organized under `src/types/` with clean `@/*` path aliases.
- **⚡ Blazing Fast Tooling**: Powered by Vite and Oxlint for sub-millisecond linting and instant HMR (Hot Module Replacement).

---

## 🛠️ Tech Stack

| Category               | Technology                                                                                               | Description                                                  |
| :--------------------- | :------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| **Framework**          | [React 19](https://react.dev/)                                                                           | Core UI library                                              |
| **Language**           | [TypeScript](https://www.typescriptlang.org/)                                                            | Strongly typed JavaScript                                    |
| **Build Tool**         | [Vite](https://vite.dev/)                                                                                | Next-generation frontend tooling                             |
| **UI Components**      | [Material UI (MUI)](https://mui.com/)                                                                    | Component library for layout, cards, accordions, and buttons |
| **Icons**              | [@mui/icons-material](https://mui.com/material-ui/material-icons/) & [Lucide React](https://lucide.dev/) | Iconography                                                  |
| **Styling**            | [@emotion/react](https://emotion.sh/) & [@emotion/styled](https://emotion.sh/)                           | CSS-in-JS engine                                             |
| **State Management**   | [@reduxjs/toolkit](https://redux-toolkit.js.org/) & [react-redux](https://react-redux.js.org/)           | Global state management                                      |
| **Routing**            | [react-router-dom v7](https://reactrouter.com/)                                                          | Client-side routing                                          |
| **Data Visualization** | [Recharts](https://recharts.org/) & [@mui/x-charts](https://mui.com/x/react-charts/)                     | Telemetry and click analytics charts                         |
| **HTTP Client**        | [Axios](https://axios-http.com/)                                                                         | Backend API requests                                         |
| **Linter**             | [Oxlint](https://oxc.rs/)                                                                                | High-performance Rust-based JavaScript/TypeScript linter     |

---

## 📂 Project Structure

```text
URLShortner_FE/
├── public/                 # Static assets & favicons
├── src/
│   ├── assets/             # Images, icons, and SVG graphics
│   ├── components/         # Reusable presentation components
│   ├── features/           # Feature-based domain modules
│   ├── layouts/            # Page shell & layout wrappers
│   ├── pages/              # Route views (LandingPage, Dashboard, etc.)
│   │   └── LandingPage.tsx # Complete marketing & action landing page
│   ├── state/              # Redux Toolkit store & slices
│   │   └── slices/         # Feature state slices
│   ├── types/              # Centralized TypeScript definitions
│   │   ├── landing.ts      # FAQ, Plan, Step, and Performance interfaces
│   │   └── index.ts        # Barrel export for @/types
│   ├── App.tsx             # Root application component
│   ├── main.tsx            # Application entry point
│   └── vite-env.d.ts       # Vite TypeScript declarations
├── .env.example            # Environment variable template
├── tsconfig.json           # TypeScript project references
├── tsconfig.app.json       # Frontend TypeScript compiler options
├── vite.config.ts          # Vite bundler configuration & @/ alias
└── package.json            # Scripts & project dependencies
```

---

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node) or `yarn` / `pnpm`

### 1. Clone the Repository

```bash
git clone https://github.com/5-VED/URLShortner_FE.git
cd URLShortner_FE
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the example environment configuration:

```bash
cp .env.example .env
```

Adjust the values inside `.env` to connect with your backend API:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK=true
```

### 4. Run Development Server

```bash
npm run dev
```

The application will start locally at `http://localhost:5173/`.

---

## 📜 Available Scripts

| Command           | Action                                                                            |
| :---------------- | :-------------------------------------------------------------------------------- |
| `npm run dev`     | Starts Vite development server with hot module replacement                        |
| `npm run build`   | Runs TypeScript compilation (`tsc -b`) and generates production bundle in `dist/` |
| `npm run preview` | Locally previews the production build                                             |
| `npm run lint`    | Runs ultra-fast Oxlint checks across the codebase                                 |

---

## 🗺️ Roadmap

- [x] Complete Landing Page (Hero, Value propositions, Pricing, FAQs)
- [x] Centralized type definitions under `src/types/`
- [ ] User authentication (Login / Signup modal & JWT handling)
- [ ] Analytics dashboard with click telemetry charts (devices, referrers, locations)
- [ ] Custom branded domains & password protection configuration
- [ ] QR code generator modal with download options

---

## 📄 License

This project is licensed under the MIT License - feel free to modify and use it for your own projects.
