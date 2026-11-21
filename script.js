// Mobile nav toggle
document.querySelectorAll(".nav-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.getAttribute("aria-controls"));
    if (!target) return;
    const open = target.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
});

// Topics mega-menu: click to open/close, Escape or a click outside closes it
document.querySelectorAll(".nav-topics").forEach((wrap) => {
  const btn = wrap.querySelector(".nav-topics-toggle");
  const setOpen = (open) => {
    wrap.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  };
  btn.addEventListener("click", () => setOpen(!wrap.classList.contains("open")));
  document.addEventListener("click", (e) => { if (!wrap.contains(e.target)) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wrap.classList.contains("open")) { setOpen(false); btn.focus(); }
  });
});

// Contact page: preselect "I'm here for" from ?interest= (e.g. from a Reserve button)
const interest = new URLSearchParams(location.search).get("interest");
const interestSelect = document.querySelector('select[name="interest"]');
if (interest && interestSelect) {
  const opt = [...interestSelect.options].find((o) => o.value.toLowerCase().includes(interest.toLowerCase()));
  if (opt) interestSelect.value = opt.value;
}

// Join dialog (shared across pages). Submission is handled by the Netlify
// form handler below, which shows step 2 only once the email has saved.
const dialogScrim = document.getElementById("join-dialog");
let lastOpener = null;
const closeJoin = () => {
  dialogScrim.classList.remove("open");
  if (lastOpener) lastOpener.focus();
};
if (dialogScrim) {
  document.querySelectorAll("[data-open-join]").forEach((el) => el.addEventListener("click", (e) => {
    e.preventDefault();
    lastOpener = el;
    document.getElementById("join-step-1").style.display = "";
    document.getElementById("join-step-2").style.display = "none";
    dialogScrim.classList.add("open");
    const email = dialogScrim.querySelector('input[type="email"]');
    if (email) setTimeout(() => email.focus(), 50);
  }));
  dialogScrim.querySelectorAll("[data-close-join]").forEach((el) => el.addEventListener("click", closeJoin));
  dialogScrim.addEventListener("click", (e) => { if (e.target === dialogScrim) closeJoin(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialogScrim.classList.contains("open")) closeJoin();
  });
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

// Read page: topic filter. ?topic=<slug> (from the menu) preselects a topic;
// a topic with no pieces yet shows the empty note with a Sunday note signup.
const tagRow = document.getElementById("journal-tags");
if (tagRow) {
  const posts = document.querySelectorAll("#journal-grid [data-cat]");
  const countEl = document.getElementById("journal-count");
  const empty = document.getElementById("journal-empty");
  const select = (tag) => {
    tagRow.querySelectorAll(".tag").forEach((t) => {
      t.classList.toggle("active", t === tag);
      t.setAttribute("aria-pressed", String(t === tag));
    });
    const cat = tag.dataset.cat;
    let shown = 0;
    posts.forEach((p) => {
      const match = cat === "all" || p.dataset.cat === cat;
      p.style.display = match ? "" : "none";
      if (match) shown++;
    });
    if (countEl) countEl.textContent = `${shown} piece${shown === 1 ? "" : "s"}`;
    if (empty) {
      empty.hidden = shown > 0;
      const name = empty.querySelector("[data-topic-name]");
      if (name) name.textContent = tag.textContent.toLowerCase();
    }
  };
  tagRow.querySelectorAll(".tag").forEach((tag) => tag.addEventListener("click", () => select(tag)));
  const slug = new URLSearchParams(location.search).get("topic");
  const start = slug && tagRow.querySelector(`.tag[data-cat="${CSS.escape(slug)}"]`);
  if (start) select(start);
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
      .then((res) => {
        if (!res.ok) throw new Error(res.status);
        if (form.id === "join-form") {
          document.getElementById("join-step-1").style.display = "none";
          document.getElementById("join-step-2").style.display = "grid";
        }
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
        alert("That didn't send. Check your connection and try again in a minute.");
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
      // optional panel colour inside the line (--wave-panel)
      const panel = cs.getPropertyValue("--wave-panel").trim() ? "var(--wave-panel)" : "none";
      svg += '<path d="' + shape(w, h, amp + stroke / 2, len, amp, radius) +
        '" style="fill: ' + panel + '" stroke="currentColor" stroke-width="' + stroke + '" stroke-linejoin="round"/>';
    }
    el.innerHTML = svg + "</svg>";
  }

  const ro = new ResizeObserver((entries) => entries.forEach((e) => draw(e.target)));
  frames.forEach((el) => { draw(el); ro.observe(el); });
})();
