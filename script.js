// Mobile nav toggle
document.querySelectorAll(".nav-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const links = btn.closest(".nav").querySelector(".nav-links");
    const open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
});

// Netlify form submission via fetch, with inline success message
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
        form.style.display = "none";
        const success = form.parentElement.querySelector(".form-success");
        if (success) success.style.display = "block";
      })
      .catch(() => {
        alert("Something went wrong. Please try again or email us directly.");
      });
  });
});
