// Mobile nav toggle
document.querySelectorAll(".nav-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.getAttribute("aria-controls"));
    if (target) target.classList.toggle("open");
  });
});

// Join dialog (shared across pages)
const dialogScrim = document.getElementById("join-dialog");
if (dialogScrim) {
  const openers = document.querySelectorAll("[data-open-join]");
  const closers = dialogScrim.querySelectorAll("[data-close-join]");
  openers.forEach((el) => el.addEventListener("click", (e) => {
    e.preventDefault();
    dialogScrim.classList.add("open");
  }));
  closers.forEach((el) => el.addEventListener("click", () => dialogScrim.classList.remove("open")));
  dialogScrim.addEventListener("click", (e) => {
    if (e.target === dialogScrim) dialogScrim.classList.remove("open");
  });
  const joinForm = document.getElementById("join-form");
  const joinStep1 = document.getElementById("join-step-1");
  const joinStep2 = document.getElementById("join-step-2");
  if (joinForm) {
    joinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      joinStep1.style.display = "none";
      joinStep2.style.display = "grid";
    });
  }
}

// Accordion
document.querySelectorAll(".accordion").forEach((acc) => {
  acc.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".accordion-item");
      const wasOpen = item.classList.contains("open");
      acc.querySelectorAll(".accordion-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
});

// Tabs (Circle pricing)
document.querySelectorAll("[data-tabs]").forEach((tabGroup) => {
  const tabs = tabGroup.querySelectorAll(".tab");
  const panels = document.querySelectorAll(`[data-tab-panel][data-tabs-for="${tabGroup.dataset.tabs}"]`);
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      panels.forEach((p) => p.style.display = p.dataset.tabPanel === tab.dataset.tab ? "" : "none");
    });
  });
});

// Journal tag filter
const tagRow = document.getElementById("journal-tags");
if (tagRow) {
  const posts = document.querySelectorAll("#journal-grid [data-cat]");
  const countEl = document.getElementById("journal-count");
  tagRow.querySelectorAll(".tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      tagRow.querySelectorAll(".tag").forEach((t) => t.classList.remove("active"));
      tag.classList.add("active");
      const cat = tag.dataset.cat;
      let shown = 0;
      posts.forEach((p) => {
        const match = cat === "All" || p.dataset.cat === cat;
        p.style.display = match ? "" : "none";
        if (match) shown++;
      });
      if (countEl) countEl.textContent = `${shown} piece${shown === 1 ? "" : "s"}`;
    });
  });
}

// Netlify form submission via fetch, with toast/success message
document.querySelectorAll("form[data-netlify='true']").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        const toast = document.getElementById(form.dataset.successToast);
        if (toast) {
          toast.classList.add("open");
          const closeBtn = toast.querySelector(".toast-close");
          if (closeBtn) closeBtn.onclick = () => toast.classList.remove("open");
          setTimeout(() => toast.classList.remove("open"), 6000);
        }
        form.reset();
      })
      .catch(() => {
        alert("Something went wrong. Please try again or email us directly.");
      });
  });
});

// Wave frames: one continuous wavy line round a rounded rectangle, sized to
// each box. Wavelength is adjusted so a whole number of waves fits the
// perimeter, so the line joins up seamlessly all the way round.
(function () {
  const frames = document.querySelectorAll(".wave-frame");
  if (!frames.length) return;
  const num = (cs, name, fallback) => parseFloat(cs.getPropertyValue(name)) || fallback;

  function draw(el) {
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    const cs = getComputedStyle(el);
    const len = num(cs, "--wave-len", 48), amp = num(cs, "--wave-amp", 3.5);
    const stroke = num(cs, "--wave-stroke", 2.5);
    const pad = amp + stroke / 2;
    const x0 = pad, y0 = pad, x1 = w - pad, y1 = h - pad;
    const r = Math.min(num(cs, "--wave-radius", 22), (x1 - x0) / 2, (y1 - y0) / 2);
    const sw = x1 - x0 - 2 * r, sh = y1 - y0 - 2 * r, arc = Math.PI * r / 2;
    const segs = [sw, arc, sh, arc, sw, arc, sh, arc];
    const P = segs.reduce((a, b) => a + b, 0);
    const lambda = P / Math.max(1, Math.round(P / len));

    // point + outward normal at distance t along the rounded-rect perimeter (clockwise from top-left straight)
    function at(t) {
      const corner = (cx, cy, start, d) => {
        const a = start + d / r;
        return [cx + r * Math.cos(a), cy + r * Math.sin(a), Math.cos(a), Math.sin(a)];
      };
      let d = t;
      if ((d -= 0) < sw) return [x0 + r + d, y0, 0, -1];
      if ((d -= sw) < arc) return corner(x1 - r, y0 + r, -Math.PI / 2, d);
      if ((d -= arc) < sh) return [x1, y0 + r + d, 1, 0];
      if ((d -= sh) < arc) return corner(x1 - r, y1 - r, 0, d);
      if ((d -= arc) < sw) return [x1 - r - d, y1, 0, 1];
      if ((d -= sw) < arc) return corner(x0 + r, y1 - r, Math.PI / 2, d);
      if ((d -= arc) < sh) return [x0, y1 - r - d, -1, 0];
      d -= sh;
      return corner(x0 + r, y0 + r, Math.PI, Math.min(d, arc));
    }

    const step = 2, pts = [];
    for (let t = 0; t < P; t += step) {
      const [x, y, nx, ny] = at(t);
      const o = amp * Math.sin((2 * Math.PI * t) / lambda);
      pts.push((x + nx * o).toFixed(1) + " " + (y + ny * o).toFixed(1));
    }
    el.innerHTML =
      '<svg viewBox="0 0 ' + w + " " + h + '" aria-hidden="true"><path d="M' + pts.join(" L") +
      ' Z" fill="none" stroke="currentColor" stroke-width="' + stroke + '" stroke-linejoin="round"/></svg>';
  }

  const ro = new ResizeObserver((entries) => entries.forEach((e) => draw(e.target)));
  frames.forEach((el) => { draw(el); ro.observe(el); });
})();
