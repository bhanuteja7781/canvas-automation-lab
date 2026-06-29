const canvas = document.getElementById("automationCanvas");
const ctx = canvas.getContext("2d");

let state = {
  nodes: []
};

const ws = new WebSocket("ws://localhost:8081");

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  if (msg.type === "SYSTEM_STATE") {
    state.nodes = structuredClone(msg.payload);
  }

  if (msg.type === "STATE_UPDATE") {
    const updated = msg.payload;

    state.nodes = state.nodes.map(n =>
      n.id === updated.id ? { ...n, ...updated } : n
    );
  }
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "14px Arial";

  for (const n of state.nodes) {
    ctx.fillStyle = n.color;
    ctx.fillRect(n.x, n.y, n.width, n.height);

    ctx.fillStyle = "#fff";
    ctx.fillText(n.label, n.x + 10, n.y + 25);
    ctx.fillText(n.status, n.x + 10, n.y + 45);
  }

  requestAnimationFrame(draw);
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  const clicked = state.nodes.find(n =>
    x >= n.x &&
    x <= n.x + n.width &&
    y >= n.y &&
    y <= n.y + n.height
  );

  if (clicked) {
    ws.send(JSON.stringify({
      type: "INTERACTION_REQUEST",
      payload: { nodeId: clicked.id }
    }));
  }
});

window.getCanvasState = () => structuredClone(state.nodes);

draw();
