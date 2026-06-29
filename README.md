# Canvas Automation Lab

A highly interactive, real-time distributed state application built to demonstrate the end-to-end automation and testing of **HTML5 Canvas** applications. This project bypasses traditional DOM-based assertions to test custom 2D graphics layers directly using **Playwright** and **WebSockets**.

---

## 🏗️ System Architecture & Workflow

Unlike standard web applications where elements exist explicitly in the DOM tree, an HTML5 Canvas is a completely flat bitmap. This project implements a **Uni-directional Data Flow** framework to drive, render, and programmatically test complex graphics.

-------------------------------------+
|                     BROWSER ENVIRONMENT                     |
|                                                             |
|  +--------------------+         +-----------------------+   |
|  |  WebSocket Feed    | ======> |  HTML5 Canvas App     |   |
|  |  (Real-time State) |         |  (Custom UI Elements) |   |
|  +--------------------+         +-----------------------+   |
|                                             ^               |
+---------------------------------------------|---------------+
|
Calculated Target Clicks
|
+-----------------------+
|   Playwright Test     |
|   Automation Suite    |
+-----------------------+


### The Data Loop Lifecycle:
1. **The Telemetry Stream:** A backend Node.js WebSocket server simulates dynamic system updates (e.g., severe load alerts, sensor failures) and streams state updates as JSON packets.
2. **The Graphics Engine:** The client-side application ingests the socket stream, updates its internal memory tree, and paints custom node blocks natively at 60fps using `requestAnimationFrame`.
3. **The Automation Bridge:** The application exposes an engineering hook (`window.getCanvasState()`) providing structured access to the current spatial map of the canvas.
4. **The Interaction Loop:** Playwright queries the state map, computes the exact geometric centers of moving visual entities, fires hardware-level click actions, and asserts state neutralization through non-flaky polling.

---

## 🌟 Key Technical Features

* **Bidirectional Real-Time Synchronization:** Network state is evaluated, validated, and mutated on the server before broadcasting visual updates down to the UI.
* **Pixel-to-Object Bounding Box Mapping:** Full client-side mathematical hit-detection supporting localized mouse click events on the canvas plane.
* **Deterministic Playwright Test Engineering:** * **State-driven polling** (`page.waitForFunction`) to completely neutralize network flakiness.
    * **Adaptive Retry Loops** to successfully target and click objects while they are actively moving on screen.
* **Visual Regression Testing:** Pixel-level layout validation utilizing automated environment freezing and screenshot thresholds.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+) installed.

### 2. Installation
Clone this repository and install dependencies:
```bash
npm install
npx playwright install
3. Running the Application
To run the full live stack locally:

Start the WebSocket Server:

Bash
node src/server/ws-server.js
Serve the Client App:
Host the src/client directory using your preferred local HTTP file server (e.g., VS Code Live Server or standard npx serve src/client) on port 8080.

4. Running the Automation Suites
Execute the Playwright end-to-end testing scenarios:

Bash
# Run tests in headed mode to observe cursor interaction
npx playwright test --headed

# Update visual regression snapshot baselines
npx playwright test --update-snapshots
📂 Project Anatomy
Plaintext
├── src/
│   ├── server/
│   │   └── ws-server.js         # State machine engine & WebSocket broadcaster
│   └── client/
│       ├── index.html           # Canvas DOM shell viewport
│       ├── app.js               # Render loop, coordinate map, & network interface
│       └── style.css            # Layout configurations
├── tests/
│   ├── canvas-automation.spec.js # E2E interaction & movement retry tests
│   └── canvas-automation.spec.js-snapshots/ # Baseline visual regression benchmarks
├── package.json
└── playwright.config.js         # Playwright test runner profile
