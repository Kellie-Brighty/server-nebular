document.addEventListener("DOMContentLoaded", () => {
  checkServerStatus();
});

async function checkServerStatus() {
  const card = document.getElementById("status-card");
  const icon = document.getElementById("status-icon");
  const title = document.getElementById("status-title");
  const message = document.getElementById("status-message");
  const detailStatus = document.getElementById("detail-status");
  const detailUptime = document.getElementById("detail-uptime");
  const detailTimestamp = document.getElementById("detail-timestamp");

  try {
    const response = await fetch("/api/status");
    const data = await response.json();

    // Update UI to show active state
    card.classList.remove("error");
    card.classList.add("active");

    title.textContent = "Server Nebular Active";
    message.textContent = data.message;

    detailStatus.textContent = data.status.toUpperCase();
    detailStatus.className = "value active-status";

    detailUptime.textContent = formatUptime(data.uptime);

    detailTimestamp.textContent = new Date(data.timestamp).toLocaleTimeString();
  } catch (error) {
    // Update UI to show error state
    card.classList.remove("active");
    card.classList.add("error");

    title.textContent = "Server Offline";
    message.textContent = "Could not connect to the server.";

    detailStatus.textContent = "OFFLINE";
    detailStatus.className = "value error-status";

    detailUptime.textContent = "—";
    detailTimestamp.textContent = "—";
  }
}

function formatUptime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}
