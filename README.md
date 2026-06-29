# Canvas Automation Lab

A real-time HTML5 Canvas automation project demonstrating end-to-end testing of interactive graphics using **Node.js**, **WebSockets**, and **Playwright**. Unlike traditional web applications that rely on DOM elements, this project automates and validates objects rendered directly onto an HTML5 Canvas through state-driven testing and coordinate-based interactions.

---

## Features

* Real-time WebSocket communication
* Interactive HTML5 Canvas rendering
* Playwright end-to-end automation
* Coordinate-based click automation
* Visual regression testing with screenshots
* State-driven synchronization for reliable tests

---

## Architecture Overview

The application follows a unidirectional data flow where server-side state updates are streamed to the browser, rendered on a canvas, and validated through Playwright automation.

### System Architecture

```text
┌──────────────────────────────┐
│     WebSocket Server         │
│     (Node.js + ws)           │
└──────────────┬───────────────┘
               │
               │ JSON State Updates
               ▼
┌──────────────────────────────┐
│      Canvas Application      │
│      HTML5 + JavaScript      │
│                              │
│ • Receives telemetry         │
│ • Updates internal state     │
│ • Renders graphics           │
└──────────────┬───────────────┘
               ▲
               │ Canvas Coordinates
               │
┌──────────────┴───────────────┐
│     Playwright Test Suite    │
│ • Reads canvas state         │
│ • Calculates object centers  │
│ • Simulates mouse clicks     │
│ • Verifies application state │
└──────────────────────────────┘
```

---

## Data Flow Lifecycle

### 1. Telemetry Stream

A Node.js WebSocket server continuously broadcasts simulated system events such as:

* Sensor failures
* System alerts
* Status updates

Each event is transmitted as a JSON message.

---

### 2. Graphics Engine

The browser receives telemetry updates and:

* Updates the application's internal state
* Re-renders moving objects
* Maintains a smooth animation loop using `requestAnimationFrame`

---

### 3. Automation Bridge

The application exposes:

```javascript
window.getCanvasState()
```

This helper returns structured information about every object currently rendered on the canvas, including its coordinates and dimensions.

---

### 4. Automated Interaction

The Playwright test suite:

* Reads the current canvas state
* Calculates object center points
* Performs coordinate-based mouse clicks
* Waits until state updates are reflected
* Verifies expected outcomes

---

## Technical Highlights

### Real-Time Synchronization

* WebSocket-based communication
* Live state broadcasting
* Instant UI updates

### Canvas Object Mapping

Supports mathematical hit detection using:

* X/Y coordinates
* Width
* Height
* Bounding box calculations

### Reliable Playwright Automation

* State-driven polling using `page.waitForFunction()`
* Adaptive retry loops
* Stable synchronization without arbitrary delays

### Visual Regression Testing

Uses Playwright screenshot comparisons to detect unintended visual changes.

---

## Project Structure

```text
canvas-automation-lab/
│
├── src/
│   ├── server/
│   │   └── ws-server.js
│   │
│   └── client/
│       ├── index.html
│       ├── app.js
│       └── style.css
│
├── tests/
│   ├── canvas-automation.spec.js
│   └── canvas-automation.spec.js-snapshots/
│
├── package.json
├── playwright.config.js
└── README.md
```

### File Descriptions

| File                              | Purpose                                 |
| --------------------------------- | --------------------------------------- |
| `src/server/ws-server.js`         | WebSocket server broadcasting telemetry |
| `src/client/index.html`           | Canvas application entry point          |
| `src/client/app.js`               | Rendering engine and interaction logic  |
| `src/client/style.css`            | UI styling                              |
| `tests/canvas-automation.spec.js` | Playwright end-to-end tests             |
| `playwright.config.js`            | Playwright configuration                |

---

## Prerequisites

* Node.js 18 or later
* npm

---

## Installation

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running the Application

### Step 1 — Start the WebSocket Server

```bash
node src/server/ws-server.js
```

---

### Step 2 — Start the Client

Serve the `src/client` directory using any local HTTP server.

Examples:

```bash
npx serve src/client
```

or

Use **VS Code Live Server**.

By default, the client is served at:

```text
http://localhost:8080
```

---

## Running the Tests

Run the Playwright automation suite:

```bash
npx playwright test --headed
```

Run tests in headless mode:

```bash
npx playwright test
```

Update visual regression snapshots:

```bash
npx playwright test --update-snapshots
```

---

## Test Coverage

The Playwright suite validates:

### Canvas Rendering

* Canvas loads successfully
* Objects render correctly

### WebSocket Synchronization

* Client receives live telemetry
* Canvas updates accordingly

### Object Interaction

* Calculates dynamic object coordinates
* Clicks moving targets accurately

### State Verification

* Confirms state changes after interactions
* Uses polling for deterministic validation

### Visual Regression

* Compares rendered output against baseline screenshots
* Detects unintended UI changes

---

## Technologies Used

* Node.js
* WebSockets (`ws`)
* HTML5 Canvas
* JavaScript (ES6)
* Playwright
* CSS3

---

## Future Improvements

* Multiple concurrent WebSocket clients
* Performance benchmarking
* Canvas zoom and pan support
* Touch interaction testing
* Mobile browser automation
* CI/CD integration with GitHub Actions

---

## License

This project is intended for educational and demonstration purposes.

---
