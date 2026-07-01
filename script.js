let battleSeconds = 180;
let challengeSeconds = 20;
let leftScore = 12500;
let rightScore = 9300;

const challenges = [
  "Careta Mais Engraçada 🤪",
  "Não Rias 😂",
  "Emoji Challenge 😍",
  "Canta 10 Segundos 🎤",
  "Pergunta Relâmpago ⚡",
  "Mímica Maluca 🎭",
  "Tomate Challenge 🍅"
];

const autoMessages = [
  ["Amanda Fan", "vamos Amanda 🔥"],
  ["Sofia", "este desafio está top 😂"],
  ["Lucio Costa", "manda galáxiaaa 🌌"],
  ["LIVEARENA", "Novo desafio em breve!"],
  ["Ernesto Tomate 🍅", "isto está brutal 👏"]
];

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function startBattleTimer() {
  const timer = document.getElementById("battleTimer");
  if (!timer) return;

  setInterval(() => {
    if (battleSeconds > 0) battleSeconds--;
    timer.textContent = formatTime(battleSeconds);
  }, 1000);
}

function startChallengeTimer() {
  const title = document.getElementById("challengeTitle");
  const time = document.getElementById("challengeTime");
  const bar = document.getElementById("challengeBar");

  if (!title || !time || !bar) return;

  setInterval(() => {
    if (challengeSeconds > 0) {
      challengeSeconds--;
      time.textContent = challengeSeconds + "s restantes";
      bar.style.width = challengeSeconds * 5 + "%";
    } else {
      challengeSeconds = 20;
      title.textContent = challenges[Math.floor(Math.random() * challenges.length)];
      bar.style.width = "100%";
      addChat("LIVEARENA", "Novo desafio lançado: " + title.textContent);
    }
  }, 1000);
}

function updateScore() {
  const left = document.getElementById("scoreLeft");
  const right = document.getElementById("scoreRight");

  if (!left || !right) return;

  const total = leftScore + rightScore;
  const leftPercent = Math.round((leftScore / total) * 100);
  const rightPercent = 100 - leftPercent;

  left.style.width = leftPercent + "%";
  right.style.width = rightPercent + "%";

  left.textContent = (leftScore / 1000).toFixed(1) + "K";
  right.textContent = (rightScore / 1000).toFixed(1) + "K";
}

function sendGift(name, coins) {
  leftScore += coins;
  updateScore();
  addChat("Tu", `enviaste ${name} 🎁 +${coins}`);
  floatingGift(name);
}

function likeLive() {
  leftScore += 1;
  updateScore();
  addChat("Tu", "enviou coração ❤️");
  floatingGift("❤️");
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  if (!input || !input.value.trim()) return;

  addChat("Tu", input.value);
  input.value = "";
}

function addChat(user, msg) {
  const chat = document.getElementById("chat");
  if (!chat) return;

  const p = document.createElement("p");
  p.className = "chat-message";
  p.innerHTML = `<b>${user}:</b> ${msg}`;
  chat.appendChild(p);

  if (chat.children.length > 8) {
    chat.removeChild(chat.children[0]);
  }

  chat.scrollTop = chat.scrollHeight;
}

function startAutoChat() {
  const chat = document.getElementById("chat");
  if (!chat) return;

  setInterval(() => {
    const item = autoMessages[Math.floor(Math.random() * autoMessages.length)];
    addChat(item[0], item[1]);
  }, 4000);
}

function openGifts() {
  const panel = document.getElementById("giftPanel");
  if (!panel) return;
  panel.classList.toggle("hidden");
}

function floatingGift(content) {
  const el = document.createElement("div");
  el.textContent = content;
  el.className = "float-up";
  el.style.position = "fixed";
  el.style.right = "80px";
  el.style.bottom = "130px";
  el.style.fontSize = "36px";
  el.style.zIndex = "9999";
  el.style.pointerEvents = "none";

  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 1300);
}

function initLiveArena() {
  startBattleTimer();
  startChallengeTimer();
  startAutoChat();
  updateScore();
}

document.addEventListener("DOMContentLoaded", initLiveArena);
