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

// Wave frames: invitation-card scallops round a rounded rectangle sized to
// each box. Each straight side gets a whole number of waves with both ends
// on an outward peak, and corners stay on that peak, so the edge is
// symmetric and joins seamlessly. See the .wave-frame comment in style.css.
(function () {
  const frames = document.querySelectorAll(".wave-frame");
  if (!frames.length) return;
  const num = (cs, name, fallback) => {
    const v = parseFloat(cs.getPropertyValue(name));
    return isNaN(v) ? fallback : v;
  };

  function shape(w, h, pad, len, amp, radius) {
    const x0 = pad, y0 = pad, x1 = w - pad, y1 = h - pad;
    const r = Math.min(radius, (x1 - x0) / 2, (y1 - y0) / 2);
    const sw = x1 - x0 - 2 * r, sh = y1 - y0 - 2 * r;
    const pts = [];
    const add = (x, y, nx, ny, o) => pts.push((x + nx * o).toFixed(1) + " " + (y + ny * o).toFixed(1));
    // straight side: start point, direction, outward normal
    const side = (sx, sy, dx, dy, nx, ny, L) => {
      const n = Math.max(1, Math.round(L / len));
      for (let t = 0; t < L; t += 2) add(sx + dx * t, sy + dy * t, nx, ny, amp * Math.cos((2 * Math.PI * n * t) / L));
    };
    // corner: arc held on the outward peak
    const corner = (cx, cy, start) => {
      for (let a = 0; a < Math.PI / 2; a += 2 / Math.max(r, 1)) {
        const c = Math.cos(start + a), s = Math.sin(start + a);
        add(cx + r * c, cy + r * s, c, s, amp);
      }
    };
    side(x0 + r, y0, 1, 0, 0, -1, sw);
    corner(x1 - r, y0 + r, -Math.PI / 2);
    side(x1, y0 + r, 0, 1, 1, 0, sh);
    corner(x1 - r, y1 - r, 0);
    side(x1 - r, y1, -1, 0, 0, 1, sw);
    corner(x0 + r, y1 - r, Math.PI / 2);
    side(x0, y1 - r, 0, -1, -1, 0, sh);
    corner(x0 + r, y0 + r, Math.PI);
    return "M" + pts.join(" L") + " Z";
  }

  function draw(el) {
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    const cs = getComputedStyle(el);
    const mode = cs.getPropertyValue("--wave-mode").trim() || "stroke";
    const len = num(cs, "--wave-len", 90), amp = num(cs, "--wave-amp", 6);
    const stroke = num(cs, "--wave-stroke", 2.5), radius = num(cs, "--wave-radius", 18);
    let svg = '<svg viewBox="0 0 ' + w + " " + h + '" aria-hidden="true">';
    if (mode === "fill") {
      const d = shape(w, h, amp, len, amp, radius);
      const bx = num(cs, "--wave-back-x", 0), by = num(cs, "--wave-back-y", 0);
      if (bx || by) svg += '<path d="' + d + '" transform="translate(' + bx + " " + by + ')" style="fill: var(--wave-back)"/>';
      svg += '<path d="' + d + '" style="fill: var(--wave-fill)"/>';
    } else {
      svg += '<path d="' + shape(w, h, amp + stroke / 2, len, amp, radius) +
        '" fill="none" stroke="currentColor" stroke-width="' + stroke + '" stroke-linejoin="round"/>';
    }
    el.innerHTML = svg + "</svg>";
  }

  const ro = new ResizeObserver((entries) => entries.forEach((e) => draw(e.target)));
  frames.forEach((el) => { draw(el); ro.observe(el); });
})();
