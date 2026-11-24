/* Nalumi site — demo chat stream + section entrances. No dependencies. */
(function () {
  "use strict";

  var docEl = document.documentElement;
  docEl.classList.add("js");

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- section entrances ---------- */

  var targets = document.querySelectorAll(
    ".hero-copy > *, .hero-phone, " +
    ".providers h2, .providers .section-lede, .provider, " +
    ".privacy h2, .privacy-statement, .privacy-facts, .privacy-link, " +
    ".showcase h2, .showcase .section-lede, .shot, " +
    ".features h2, .feature-list > div, " +
    ".free h2, .free .section-lede, .free-actions, " +
    ".footer-name, .footer-meaning, .footer-links"
  );

  var counters = new Map();
  targets.forEach(function (el) {
    var parent = el.parentElement;
    var n = counters.get(parent) || 0;
    counters.set(parent, n + 1);
    el.style.setProperty("--d", Math.min(n, 5) * 70 + "ms");
    el.classList.add("reveal");
  });

  if (!("IntersectionObserver" in window) || prefersReduced) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- hero demo chat ---------- */

  var chat = document.getElementById("demo-chat");
  var streamEl = document.getElementById("demo-stream");
  var statsEl = document.getElementById("demo-stats");
  var replayBtn = document.getElementById("demo-replay");
  var hint = document.getElementById("demo-hint");
  var phone = document.querySelector(".phone");

  if (!chat || !streamEl || !phone) return;

  var userText = "Summarize quantization in one paragraph.";
  var answerText = streamEl.textContent;
  var statsText = statsEl ? statsEl.textContent : "";
  var demoToken = 0;

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function runDemo() {
    var my = ++demoToken;
    var alive = function () { return my === demoToken; };

    chat.innerHTML = "";
    replayBtn.hidden = true;
    if (hint) hint.textContent = "\u2026";

    var userMsg = document.createElement("div");
    userMsg.className = "msg user";
    var userP = document.createElement("p");
    userMsg.appendChild(userP);
    chat.appendChild(userMsg);

    var asstMsg = document.createElement("div");
    asstMsg.className = "msg assistant";
    var asstP = document.createElement("p");

    var step = Promise.resolve();

    // type the question
    userText.split("").forEach(function (ch) {
      step = step.then(function () {
        if (!alive()) return;
        userP.textContent += ch;
        return sleep(26);
      });
    });

    // thinking dots
    step = step.then(function () {
      if (!alive()) return;
      var dots = document.createElement("div");
      dots.className = "typing";
      dots.innerHTML = "<span></span><span></span><span></span>";
      asstMsg.appendChild(dots);
      chat.appendChild(asstMsg);
      return sleep(900);
    });

    // stream the answer word by word
    answerText.split(" ").forEach(function (w, i) {
      step = step.then(function () {
        if (!alive()) return;
        var dots = asstMsg.querySelector(".typing");
        if (dots) dots.remove();
        if (!asstP.parentElement) asstMsg.appendChild(asstP);
        asstP.textContent += (i === 0 ? "" : " ") + w;
        return sleep(34 + Math.random() * 42);
      });
    });

    // token stats, then offer replay
    step = step.then(function () {
      if (!alive()) return;
      var stats = document.createElement("p");
      stats.className = "msg-stats";
      stats.textContent = statsText;
      asstMsg.appendChild(stats);
      if (hint) hint.textContent = "Ask anything\u2026";
      replayBtn.hidden = false;
    });
  }

  if (prefersReduced) {
    // keep the static conversation that is already in the HTML
  } else if ("IntersectionObserver" in window) {
    var chatIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          chatIo.disconnect();
          setTimeout(runDemo, 350);
        }
      });
    }, { threshold: 0.4 });
    chatIo.observe(phone);
    replayBtn.addEventListener("click", runDemo);
  }
})();
