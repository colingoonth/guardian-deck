/* ===========================================================
   Guardian pitch — 15 slides
   - GSAP eases: power3.out / power2.inOut only
   - No elastic/back/bounce. No particles. No halos. No confetti.
   - Only diegetic loop: waveform on slide 7 (tier-3 audio analysis).
=========================================================== */

const TOTAL = 18;
let current = 1;
const EASE = "power3.out";
const EASE_IO = "power2.inOut";

/* ---------- nav ---------- */
const dots = document.getElementById("dots");
for (let i = 1; i <= TOTAL; i++) {
  const d = document.createElement("div");
  d.className = "nav-dot" + (i === 1 ? " active" : "");
  d.addEventListener("click", () => goTo(i));
  dots.appendChild(d);
}
document.getElementById("prev").addEventListener("click", () => goTo(current - 1));
document.getElementById("next").addEventListener("click", () => goTo(current + 1));
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); goTo(current + 1); }
  if (e.key === "ArrowLeft"  || e.key === "PageUp")   { e.preventDefault(); goTo(current - 1); }
  if (e.key === "Home") goTo(1);
  if (e.key === "End")  goTo(TOTAL);
});

function updateNav() {
  document.querySelectorAll(".nav-dot").forEach((d, i) => d.classList.toggle("active", i + 1 === current));
  document.getElementById("nav-counter").textContent =
    String(current).padStart(2, "0") + " / " + String(TOTAL).padStart(2, "0");
}

function goTo(n) {
  if (n < 1 || n > TOTAL || n === current) return;
  document.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
  const next = document.getElementById("s" + n);
  next.classList.add("active");
  current = n;
  updateNav();
  resetSlide(n);
  playSlide(n);
}

/* ---------- per-slide reset ---------- */
function resetSlide(n) {
  (slideElements[n] || []).forEach(id => {
    const el = document.getElementById(id);
    if (el) gsap.set(el, { opacity: 0, y: 0, x: 0, scale: 1 });
  });
  if (n === 1)  gsap.set("#s1-rule",  { width: 0 });
  if (n === 18) gsap.set("#s18-rule", { scaleX: 0, transformOrigin: "left" });
}

const slideElements = {
  1:  ["s1-eye","s1-title","s1-rule","s1-sub"],
  2:  ["s2-eye","s2-title","s2-body","s2-src","s2-chart"],
  3:  ["s3-eye","s3-primary","s3-support"],
  4:  ["s4-eye","s4-title","s4-body","s4-bullets","s4-phone"],
  5:  ["s5-eye","s5-title","s5-body","s5-diagram"],
  6:  ["s6-eye","s6-title","s6-body","s6-diagram"],
  7:  ["s7-eye","s7-time","s7-title","s7-panel","s7-verdict","s7-src"],
  8:  ["s8-eye","s8-title","s8-grid","s8-note"],
  9:  ["s9-eye","s9-top","s9-chart","s9-src"],
  10: ["s10-eye","s10-title","s10-body","s10-grid","s10-src"],
  11: ["s11-eye","s11-title","s11-body","s11-assumptions","s11-chart"],
  12: ["s12-eye","s12-title","s12-grid","s12-econ-breakdown","s12-src"],
  13: ["s13-eye","s13-title","s13-matrix","s13-note"],
  14: ["s14-eye","s14-title","s14-grid","s14-src"],
  15: ["s15-eye","s15-title","s15-timeline","s15-src"],
  16: ["s16-eye","s16-title","s16-list"],
  17: ["s17-eye","s17-title","s17-grid","s17-uses"],
  18: ["s18-eye","s18-title","s18-rule","s18-contact"],
};

/* ---------- play-in per slide ---------- */
function playSlide(n) {
  const tl = gsap.timeline();
  switch (n) {
    case 1:
      tl.to("#s1-eye",   { opacity: 1, duration: 0.8, ease: EASE })
        .to("#s1-title", { opacity: 1, y: 0, duration: 1.4, ease: EASE }, 0.2)
        .to("#s1-rule",  { width: 80, opacity: 1, duration: 0.8, ease: EASE }, 1.0)
        .to("#s1-sub",   { opacity: 1, duration: 1.0, ease: EASE }, 1.2);
      break;
    case 2:
      drawBarChart();
      tl.to("#s2-eye",   { opacity: 1, duration: 0.6, ease: EASE })
        .to("#s2-title", { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s2-body",  { opacity: 1, duration: 0.8, ease: EASE }, 0.6)
        .to("#s2-src",   { opacity: 1, duration: 0.6, ease: EASE }, 1.0)
        .to("#s2-chart", { opacity: 1, duration: 0.6, ease: EASE }, 0.4);
      break;
    case 3:
      drawSparks();
      tl.to("#s3-eye",     { opacity: 1, duration: 0.6, ease: EASE })
        .to("#s3-primary", { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s3-support", { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.8);
      break;
    case 4:
      tl.to("#s4-eye",     { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s4-title",   { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s4-body",    { opacity: 1, duration: 0.8, ease: EASE }, 0.5)
        .to("#s4-bullets", { opacity: 1, y: 0, duration: 0.8, ease: EASE }, 0.9)
        .to("#s4-phone",   { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.2);
      break;
    case 5:
      tl.to("#s5-eye",     { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s5-title",   { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s5-body",    { opacity: 1, duration: 0.8, ease: EASE }, 0.5)
        .to("#s5-diagram", { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.4);
      break;
    case 6:
      tl.to("#s6-eye",     { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s6-title",   { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s6-body",    { opacity: 1, duration: 0.8, ease: EASE }, 0.5)
        .to("#s6-diagram", { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.4);
      break;
    case 7:
      buildWaveform();
      tl.to("#s7-eye",     { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s7-time",    { opacity: 1, duration: 0.5, ease: EASE }, 0.1)
        .to("#s7-title",   { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.2)
        .to("#s7-panel",   { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.6)
        .to("#s7-verdict", { opacity: 1, duration: 0.8, ease: EASE }, 1.4)
        .to("#s7-src",     { opacity: 1, duration: 0.6, ease: EASE }, 1.8);
      break;
    case 8:
      tl.to("#s8-eye",   { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s8-title", { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s8-grid",  { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.6)
        .to("#s8-note",  { opacity: 1, duration: 0.8, ease: EASE }, 1.2);
      break;
    case 9:
      drawCagr();
      tl.to("#s9-eye",   { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s9-top",   { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s9-chart", { opacity: 1, duration: 0.8, ease: EASE }, 0.6)
        .to("#s9-src",   { opacity: 1, duration: 0.6, ease: EASE }, 1.4);
      break;
    case 10:
      tl.to("#s10-eye",   { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s10-title", { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s10-body",  { opacity: 1, duration: 0.8, ease: EASE }, 0.5)
        .to("#s10-grid",  { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 1.0)
        .to("#s10-src",   { opacity: 1, duration: 0.6, ease: EASE }, 1.8);
      break;
    case 11:
      drawRevenue();
      tl.to("#s11-eye",         { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s11-title",       { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s11-body",        { opacity: 1, duration: 0.8, ease: EASE }, 0.5)
        .to("#s11-assumptions", { opacity: 1, y: 0, duration: 0.8, ease: EASE }, 1.0)
        .to("#s11-chart",       { opacity: 1, duration: 1.0, ease: EASE }, 0.4);
      break;
    case 12:
      tl.to("#s12-eye",             { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s12-title",           { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s12-grid",            { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.6)
        .to("#s12-econ-breakdown",  { opacity: 1, y: 0, duration: 0.9, ease: EASE }, 1.1)
        .to("#s12-src",             { opacity: 1, duration: 0.6, ease: EASE }, 1.6);
      break;
    case 13:
      drawMatrix();
      tl.to("#s13-eye",    { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s13-title",  { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.15)
        .to("#s13-matrix", { opacity: 1, duration: 1.0, ease: EASE }, 0.5)
        .to("#s13-note",   { opacity: 1, duration: 0.6, ease: EASE }, 1.3);
      break;
    case 14:
      tl.to("#s14-eye",   { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s14-title", { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s14-grid",  { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.6)
        .to("#s14-src",   { opacity: 1, duration: 0.6, ease: EASE }, 1.6);
      break;
    case 15:
      drawRoadmap();
      tl.to("#s15-eye",      { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s15-title",    { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s15-timeline", { opacity: 1, duration: 1.0, ease: EASE }, 0.5)
        .to("#s15-src",      { opacity: 1, duration: 0.6, ease: EASE }, 1.4);
      break;
    case 16:
      tl.to("#s16-eye",   { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s16-title", { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s16-list",  { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.6);
      break;
    case 17:
      tl.to("#s17-eye",   { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s17-title", { opacity: 1, y: 0, duration: 1.2, ease: EASE }, 0.15)
        .to("#s17-grid",  { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 0.7)
        .to("#s17-uses",  { opacity: 1, y: 0, duration: 1.0, ease: EASE }, 1.2);
      break;
    case 18:
      tl.to("#s18-eye",     { opacity: 1, duration: 0.5, ease: EASE })
        .to("#s18-title",   { opacity: 1, y: 0, duration: 1.4, ease: EASE }, 0.15)
        .to("#s18-rule",    { scaleX: 1, opacity: 1, duration: 0.8, ease: EASE }, 1.2)
        .to("#s18-contact", { opacity: 1, y: 0, duration: 0.8, ease: EASE }, 1.4);
      break;
  }
}

/* =========================================================================
   CHARTS (D3)
========================================================================= */

/* Slide 2 — senior fraud YoY bars */
function drawBarChart() {
  const el = document.getElementById("s2-chart");
  el.innerHTML = "";
  const data = [
    { year: 2020, value: 1.0 },
    { year: 2021, value: 1.7 },
    { year: 2022, value: 3.1 },
    { year: 2023, value: 3.4 },
    { year: 2024, value: 4.8 },
  ];
  const W = el.clientWidth || 620, H = 300;
  const m = { top: 32, right: 20, bottom: 40, left: 56 };
  const iw = W - m.left - m.right, ih = H - m.top - m.bottom;

  const svg = d3.select(el).append("svg").attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

  const x = d3.scaleBand().domain(data.map(d => d.year)).range([0, iw]).padding(0.35);
  const y = d3.scaleLinear().domain([0, 5.5]).range([ih, 0]);

  const yTicks = [0, 2.5, 5];
  g.selectAll("line.grid").data(yTicks).enter().append("line")
    .attr("class", "gridline")
    .attr("x1", 0).attr("x2", iw)
    .attr("y1", d => y(d)).attr("y2", d => y(d));

  g.selectAll("text.ytick").data(yTicks).enter().append("text")
    .attr("class", "ytick")
    .attr("x", -10).attr("y", d => y(d) + 4)
    .attr("text-anchor", "end")
    .text(d => d === 0 ? "0" : `$${d.toFixed(1)}B`);

  g.selectAll("rect.bar").data(data).enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.year)).attr("y", d => y(d.value))
    .attr("width", x.bandwidth()).attr("height", d => ih - y(d.value))
    .attr("fill", (d, i) => i === data.length - 1 ? "var(--accent)" : "var(--ink)")
    .attr("opacity", (d, i) => i === data.length - 1 ? 1 : 0.85);

  g.selectAll("text.lbl").data(data).enter().append("text")
    .attr("class", (d, i) => "data-label lbl" + (i === data.length - 1 ? " data-label-accent" : ""))
    .attr("x", d => x(d.year) + x.bandwidth() / 2)
    .attr("y", d => y(d.value) - 8)
    .attr("text-anchor", "middle")
    .text(d => `$${d.value.toFixed(1)}B`);

  g.append("line")
    .attr("x1", 0).attr("x2", iw).attr("y1", ih).attr("y2", ih)
    .attr("stroke", "var(--rule)").attr("stroke-width", 1);
  g.selectAll("text.xtick").data(data).enter().append("text")
    .attr("class", "xtick")
    .attr("x", d => x(d.year) + x.bandwidth() / 2)
    .attr("y", ih + 20).attr("text-anchor", "middle")
    .text(d => d.year);

  svg.append("text").attr("x", m.left).attr("y", 18)
    .attr("fill", "var(--ink-mu)").attr("text-anchor", "start")
    .text("USD BILLIONS LOST BY SENIORS (60+) · US");
}

/* Slide 3 — sparklines */
function drawSparks() {
  sparkline("s3-spark-primary", [40, 48, 58, 69, 83], 100, 40, "var(--accent)");
  sparkline("s3-spark-1", [36.4, 44.7, 50.5, 51.5, 52.8], 70, 28, "var(--ink)");
  sparkline("s3-spark-2", [105, 92, 82, 101, 147], 70, 28, "var(--ink)");
  sparkline("s3-spark-3", [32, 34, 36, 38, 40], 70, 28, "var(--ink)");
}
function sparkline(id, values, w, h, color) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  const pad = 2;
  const svg = d3.select(el).append("svg").attr("width", w).attr("height", h);
  const x = d3.scaleLinear().domain([0, values.length - 1]).range([pad, w - pad - 6]);
  const y = d3.scaleLinear().domain([d3.min(values) * 0.92, d3.max(values) * 1.02]).range([h - pad, pad]);
  const line = d3.line().x((_, i) => x(i)).y(d => y(d)).curve(d3.curveMonotoneX);
  svg.append("path").attr("d", line(values))
    .attr("fill", "none").attr("stroke", color).attr("stroke-width", 1.5);
  svg.append("circle")
    .attr("cx", x(values.length - 1)).attr("cy", y(values[values.length - 1]))
    .attr("r", 2.5).attr("fill", color);
}

/* Slide 7 — diegetic waveform */
function buildWaveform() {
  const el = document.getElementById("s7-wave");
  if (!el) return;
  el.innerHTML = "";
  const bars = 44;
  for (let i = 0; i < bars; i++) {
    const b = document.createElement("div");
    const base = 0.2 + Math.abs(Math.sin(i * 0.55)) * 0.8;
    b.style.cssText = `width:2px;background:var(--ink);height:${Math.max(4, base * 26)}px;opacity:0.7;`;
    el.appendChild(b);
    gsap.to(b, {
      height: `${Math.max(4, (0.3 + Math.random() * 0.7) * 26)}px`,
      duration: 0.4 + Math.random() * 0.3,
      repeat: -1,
      yoyo: true,
      ease: EASE_IO,
      delay: i * 0.02,
    });
  }
}

/* Slide 9 — exponential CAGR */
function drawCagr() {
  const el = document.getElementById("s9-chart");
  el.innerHTML = "";
  const W = Math.min(1240, window.innerWidth - 200), H = 280;
  const m = { top: 24, right: 80, bottom: 40, left: 72 };
  const iw = W - m.left - m.right, ih = H - m.top - m.bottom;

  const data = d3.range(0, 121).map(i => {
    const t = i / 12;
    return { year: 2024 + t, value: 2.6 * Math.pow(1.116, t) };
  });

  const svg = d3.select(el).append("svg").attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

  const x = d3.scaleLinear().domain([2024, 2034]).range([0, iw]);
  const y = d3.scaleLinear().domain([0, 9]).range([ih, 0]);

  const yTicks = [0, 2, 4, 6, 8];
  g.selectAll("line.grid").data(yTicks).enter().append("line")
    .attr("class", "gridline")
    .attr("x1", 0).attr("x2", iw)
    .attr("y1", d => y(d)).attr("y2", d => y(d));
  g.selectAll("text.yt").data(yTicks).enter().append("text")
    .attr("class", "yt")
    .attr("x", -10).attr("y", d => y(d) + 4)
    .attr("text-anchor", "end")
    .text(d => d === 0 ? "0" : `$${d}B`);

  const line = d3.line().x(d => x(d.year)).y(d => y(d.value)).curve(d3.curveMonotoneX);
  g.append("path").attr("d", line(data))
    .attr("fill", "none").attr("stroke", "var(--accent)").attr("stroke-width", 2);

  g.append("line").attr("stroke", "var(--rule)").attr("stroke-width", 1)
    .attr("x1", 0).attr("x2", iw).attr("y1", ih).attr("y2", ih);
  [2024, 2026, 2028, 2030, 2032, 2034].forEach(yr => {
    g.append("text").attr("x", x(yr)).attr("y", ih + 20).attr("text-anchor", "middle").text(yr);
  });

  const start = data[0], end = data[data.length - 1];
  g.append("circle").attr("cx", x(start.year)).attr("cy", y(start.value)).attr("r", 4).attr("fill", "var(--accent)");
  g.append("text").attr("x", x(start.year) + 10).attr("y", y(start.value) + 4)
    .attr("class", "data-label").text("$2.6B · 2024");

  g.append("circle").attr("cx", x(end.year)).attr("cy", y(end.value)).attr("r", 5).attr("fill", "var(--accent)");
  g.append("text").attr("x", x(end.year) - 10).attr("y", y(end.value) + 4)
    .attr("text-anchor", "end").attr("class", "data-label data-label-accent").text("$7.8B · 2034");

  const mid = data[Math.floor(data.length * 0.55)];
  g.append("rect").attr("x", x(mid.year) - 48).attr("y", y(mid.value) - 42)
    .attr("width", 96).attr("height", 24)
    .attr("fill", "var(--paper)").attr("stroke", "var(--rule)").attr("stroke-width", 1);
  g.append("text").attr("x", x(mid.year)).attr("y", y(mid.value) - 25)
    .attr("text-anchor", "middle").attr("class", "data-label").text("11.6% CAGR");
}

/* Slide 10 — revenue ramp */
function drawRevenue() {
  const el = document.getElementById("s11-chart");
  el.innerHTML = "";
  const W = el.clientWidth || 700, H = 260;
  const m = { top: 20, right: 80, bottom: 36, left: 56 };
  const iw = W - m.left - m.right, ih = H - m.top - m.bottom;

  const data = d3.range(0, 37).map(mo => {
    const subs = Math.pow(mo / 36, 1.8) * 26000;
    return { month: mo, arr: (subs * 19.99 * 12) / 1e6 };
  });

  const svg = d3.select(el).append("svg").attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

  const x = d3.scaleLinear().domain([0, 36]).range([0, iw]);
  const y = d3.scaleLinear().domain([0, 8]).range([ih, 0]);

  const yTicks = [0, 2, 4, 6, 8];
  g.selectAll("line.grid").data(yTicks).enter().append("line")
    .attr("class", "gridline").attr("x1", 0).attr("x2", iw)
    .attr("y1", d => y(d)).attr("y2", d => y(d));
  g.selectAll("text.yt").data(yTicks).enter().append("text")
    .attr("class", "yt").attr("x", -10).attr("y", d => y(d) + 4)
    .attr("text-anchor", "end").text(d => d === 0 ? "0" : `$${d}M`);

  const area = d3.area().x(d => x(d.month)).y0(ih).y1(d => y(d.arr)).curve(d3.curveMonotoneX);
  g.append("path").attr("d", area(data)).attr("fill", "var(--accent)").attr("opacity", 0.12);

  const line = d3.line().x(d => x(d.month)).y(d => y(d.arr)).curve(d3.curveMonotoneX);
  g.append("path").attr("d", line(data))
    .attr("fill", "none").attr("stroke", "var(--accent)").attr("stroke-width", 2);

  g.append("circle").attr("cx", x(0)).attr("cy", y(0)).attr("r", 4).attr("fill", "var(--accent)");
  g.append("text").attr("x", x(0) + 10).attr("y", y(0) - 10).attr("class", "data-label").text("$0 · Today");

  const last = data[data.length - 1];
  g.append("circle").attr("cx", x(last.month)).attr("cy", y(last.arr)).attr("r", 5).attr("fill", "var(--accent)");
  g.append("text").attr("x", x(last.month) - 6).attr("y", y(last.arr) - 12)
    .attr("text-anchor", "end").attr("class", "data-label data-label-accent")
    .text(`$6.2M · Month 36`);

  g.append("line").attr("stroke", "var(--rule)").attr("stroke-width", 1)
    .attr("x1", 0).attr("x2", iw).attr("y1", ih).attr("y2", ih);
  [0, 12, 24, 36].forEach(mo => {
    g.append("text").attr("x", x(mo)).attr("y", ih + 20).attr("text-anchor", "middle").text(`M${mo}`);
  });
}

/* Slide 11 — competitive matrix */
function drawMatrix() {
  const el = document.getElementById("s13-matrix");
  el.innerHTML = "";
  const W = Math.min(940, window.innerWidth - 240), H = 440;
  const m = { top: 36, right: 40, bottom: 54, left: 56 };
  const iw = W - m.left - m.right, ih = H - m.top - m.bottom;

  const svg = d3.select(el).append("svg").attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

  g.append("line").attr("x1", 0).attr("x2", iw).attr("y1", ih).attr("y2", ih).attr("stroke", "var(--rule)");
  g.append("line").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", ih).attr("stroke", "var(--rule)");

  g.append("line").attr("x1", iw / 2).attr("x2", iw / 2).attr("y1", 0).attr("y2", ih)
    .attr("stroke", "var(--rule)").attr("opacity", 0.6);
  g.append("line").attr("x1", 0).attr("x2", iw).attr("y1", ih / 2).attr("y2", ih / 2)
    .attr("stroke", "var(--rule)").attr("opacity", 0.6);

  g.append("text").attr("x", 0).attr("y", ih + 22).attr("text-anchor", "start").text("PASSIVE PROTECTION");
  g.append("text").attr("x", iw).attr("y", ih + 22).attr("text-anchor", "end").text("ACTIVE SCREENING");
  g.append("text").attr("transform", `translate(-22,${ih}) rotate(-90)`).attr("text-anchor", "start").text("HARDWARE-DEPENDENT");
  g.append("text").attr("transform", `translate(-22,0) rotate(-90)`).attr("text-anchor", "end").text("SOFTWARE-ONLY · ANY PHONE");

  g.append("text").attr("x", iw / 4).attr("y", 14).attr("text-anchor", "middle").attr("opacity", 0.6).text("SOFTWARE · PASSIVE BLOCK");
  g.append("text").attr("x", 3 * iw / 4).attr("y", 14).attr("text-anchor", "middle").attr("opacity", 0.6).text("SOFTWARE · ACTIVE SCREENING");
  g.append("text").attr("x", iw / 4).attr("y", ih - 8).attr("text-anchor", "middle").attr("opacity", 0.6).text("HARDWARE · PASSIVE");
  g.append("text").attr("x", 3 * iw / 4).attr("y", ih - 8).attr("text-anchor", "middle").attr("opacity", 0.6).text("HARDWARE · ACTIVE");

  const x = d3.scaleLinear().domain([0, 1]).range([0, iw]);
  const y = d3.scaleLinear().domain([0, 1]).range([ih, 0]);

  const players = [
    { name: "Life Alert",              x: 0.10, y: 0.08, desc: "Hardware pendant" },
    { name: "GrandPad",                x: 0.22, y: 0.18, desc: "Senior tablet, dialer" },
    { name: "Nomorobo",                x: 0.18, y: 0.84, desc: "Carrier blocklist" },
    { name: "Apple iOS 26 Screening",  x: 0.42, y: 0.82, desc: "On-device AI, iPhone only" },
    { name: "Hiya",                    x: 0.30, y: 0.68, desc: "Caller-ID tagging" },
    { name: "RoboKiller",              x: 0.50, y: 0.56, desc: "Phone app answer-bot" },
    { name: "Bark",                    x: 0.66, y: 0.70, desc: "Kid safety, not eldercare" },
  ];
  const guardian = { name: "GUARDIAN", x: 0.88, y: 0.86 };

  const comp = g.selectAll("g.comp").data(players).enter().append("g").attr("class", "comp")
    .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`);
  comp.append("circle").attr("r", 6).attr("fill", "var(--ink-mu)").attr("opacity", 0.7);
  comp.append("text").attr("class", "mx-dot-label").attr("x", 11).attr("y", 4).text(d => d.name);
  comp.append("text").attr("x", 11).attr("y", 18).attr("opacity", 0.7).text(d => d.desc);

  const gd = g.append("g").attr("transform", `translate(${x(guardian.x)},${y(guardian.y)})`);
  gd.append("circle").attr("r", 10).attr("fill", "var(--accent)");
  gd.append("circle").attr("r", 18).attr("fill", "none").attr("stroke", "var(--accent)").attr("stroke-width", 1).attr("opacity", 0.5);
  gd.append("text").attr("class", "mx-dot-label mx-dot-label-accent").attr("x", -14).attr("y", -18).attr("text-anchor", "end").text("GUARDIAN");
  gd.append("text").attr("x", -14).attr("y", -4).attr("text-anchor", "end").attr("fill", "var(--accent)").text("Active · carrier-layer · dual AI");
}

/* Slide 12 — dated roadmap */
function drawRoadmap() {
  const el = document.getElementById("s15-timeline");
  el.innerHTML = "";
  const W = Math.min(1200, window.innerWidth - 240), H = 280;
  const m = { top: 28, right: 160, bottom: 40, left: 160 };
  const iw = W - m.left - m.right, ih = H - m.top - m.bottom;

  const phases = [
    { id: "Pipeline", label: "Production pipeline",          start: "2026-05", end: "2026-08", milestone: "99% uptime · FCC 499-A filed" },
    { id: "Data",     label: "10K labeled dataset",          start: "2026-06", end: "2026-09", milestone: "Retrain both models" },
    { id: "Beta",     label: "50-family paid beta",          start: "2026-09", end: "2027-02", milestone: "Pricing validated" },
    { id: "Carrier",  label: "Carrier + infra",     start: "2027-01", end: "2027-06", milestone: "OCN + ITG · first LOI" },
  ];
  const parse = d3.timeParse("%Y-%m");
  phases.forEach(p => { p.startD = parse(p.start); p.endD = parse(p.end); });

  const domain = [parse("2026-04"), parse("2027-07")];
  const svg = d3.select(el).append("svg").attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);
  const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

  const x = d3.scaleTime().domain(domain).range([0, iw]);
  const y = d3.scaleBand().domain(phases.map(p => p.id)).range([0, ih]).padding(0.45);

  const quarters = d3.timeMonth.range(domain[0], domain[1]).filter(d => d.getMonth() % 3 === 0);
  g.selectAll("line.grid").data(quarters).enter().append("line")
    .attr("class", "gridline")
    .attr("x1", d => x(d)).attr("x2", d => x(d))
    .attr("y1", 0).attr("y2", ih);
  g.selectAll("text.qt").data(quarters).enter().append("text")
    .attr("class", "qt")
    .attr("x", d => x(d)).attr("y", ih + 20)
    .attr("text-anchor", "middle")
    .text(d => `Q${Math.floor(d.getMonth() / 3) + 1} ${d.getFullYear()}`);

  g.selectAll("text.ph").data(phases).enter().append("text")
    .attr("class", "data-label")
    .attr("x", -14).attr("y", p => y(p.id) + y.bandwidth() / 2 + 5)
    .attr("text-anchor", "end")
    .text(p => p.label);

  g.selectAll("rect.ph").data(phases).enter().append("rect")
    .attr("class", "ph")
    .attr("x", p => x(p.startD)).attr("y", p => y(p.id))
    .attr("width", p => x(p.endD) - x(p.startD))
    .attr("height", y.bandwidth())
    .attr("fill", "var(--accent)").attr("opacity", 0.85);

  g.selectAll("path.ms").data(phases).enter().append("path")
    .attr("class", "ms")
    .attr("d", "M0,-5 L5,0 L0,5 L-5,0 Z")
    .attr("transform", p => `translate(${x(p.endD)},${y(p.id) + y.bandwidth() / 2})`)
    .attr("fill", "var(--ink)");

  g.selectAll("text.msl").data(phases).enter().append("text")
    .attr("class", "msl")
    .attr("x", p => x(p.endD) + 10)
    .attr("y", p => y(p.id) + y.bandwidth() / 2 + 4)
    .text(p => p.milestone);

  const today = parse("2026-04");
  g.append("line")
    .attr("x1", x(today)).attr("x2", x(today))
    .attr("y1", -8).attr("y2", ih + 8)
    .attr("stroke", "var(--ink)").attr("stroke-width", 1).attr("stroke-dasharray", "2 3");
  g.append("text").attr("x", x(today)).attr("y", -12).attr("text-anchor", "middle")
    .attr("fill", "var(--ink)").text("TODAY");
}

/* ---------- boot ---------- */
updateNav();
playSlide(1);
