import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });

let systemNodes = [
  { id: 1, x: 150, y: 200, width: 120, height: 60, label: "Node Alpha", status: "NORMAL", color: "#3b82f6" },
  { id: 2, x: 500, y: 200, width: 120, height: 60, label: "Node Beta", status: "NORMAL", color: "#3b82f6" }
];

const STATUS_COLORS = {
  NORMAL: "#3b82f6",
  ALERT: "#f59e0b",
  CRITICAL: "#ef4444",
  ACKNOWLEDGED: "#8b5cf6"
};

let disableRandomUpdates = false;

function broadcast(msg) {
  const data = JSON.stringify(msg);
  for (const c of wss.clients) {
    if (c.readyState === 1) c.send(data);
  }
}

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({
    type: "SYSTEM_STATE",
    payload: systemNodes
  }));

  ws.on("message", (buffer) => {
    const msg = JSON.parse(buffer.toString());

    if (msg.type === "TEST_MODE") {
      disableRandomUpdates = msg.payload?.disableRandomUpdates ?? false;
    }

    if (msg.type === "INTERACTION_REQUEST") {
      const node = systemNodes.find(n => n.id === msg.payload.nodeId);
      if (!node) return;

      node.status = "ACKNOWLEDGED";
      node.color = STATUS_COLORS.ACKNOWLEDGED;

      broadcast({
        type: "STATE_UPDATE",
        payload: { ...node }
      });
    }
  });
});

setInterval(() => {
  if (disableRandomUpdates) return;

  const node = systemNodes[Math.floor(Math.random() * systemNodes.length)];
  const states = ["NORMAL", "ALERT", "CRITICAL"];

  node.status = states[Math.floor(Math.random() * states.length)];
  node.color = STATUS_COLORS[node.status];

  broadcast({
    type: "STATE_UPDATE",
    payload: { ...node }
  });
}, 3000);
