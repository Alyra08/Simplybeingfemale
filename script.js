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
