
// script.js

document.addEventListener("DOMContentLoaded", () => {
  const messageForm = document.getElementById("messageForm");
  const messagesContainer = document.getElementById("messages");

  // Save message
  if (messageForm) {
    messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const from = document.getElementById("from").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const body = document.getElementById("body").value.trim();

      const message = { from, subject, body, time: new Date().toLocaleString() };

      const messages = JSON.parse(localStorage.getItem("bbsMessages") || "[]");
      messages.unshift(message);
      localStorage.setItem("bbsMessages", JSON.stringify(messages));

      window.location.href = "view.html";
    });
  }

  // Load messages
  if (messagesContainer) {
    const messages = JSON.parse(localStorage.getItem("bbsMessages") || "[]");

    if (messages.length === 0) {
      messagesContainer.innerHTML = "<p>No messages yet.</p>";
    } else {
      messages.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message";
        div.innerHTML = `
          <p><strong>From:</strong> ${msg.from}</p>
          <p><strong>Subject:</strong> ${msg.subject}</p>
          <p>${msg.body}</p>
          <small><em>Posted on ${msg.time}</em></small>
        `;
        messagesContainer.appendChild(div);
      });
    }
  }
});
