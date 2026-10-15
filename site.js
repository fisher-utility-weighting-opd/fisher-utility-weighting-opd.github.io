(() => {
  "use strict";

  function setupCopyButtons() {
    document.querySelectorAll(".copy-button").forEach((button) => {
      const originalLabel = button.textContent;
      let resetTimer;
      const status = document.createElement("span");
      status.className = "visually-hidden";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      button.insertAdjacentElement("afterend", status);

      button.addEventListener("click", async () => {
        const targetId = (button.dataset.copyTarget || "bibtex").replace(/^#/, "");
        const target = document.getElementById(targetId)
          || document.querySelector(".citation code, pre.citation, .citation pre");
        if (!target) return;

        clearTimeout(resetTimer);
        button.disabled = true;
        let copied = false;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(target.textContent.trim());
            copied = true;
          }
        } catch {
          // Restricted clipboard access falls back to selecting the citation.
        }

        if (!copied) {
          const selection = window.getSelection();
          if (selection) {
            const range = document.createRange();
            range.selectNodeContents(target);
            selection.removeAllRanges();
            selection.addRange(range);
            try {
              copied = document.execCommand("copy");
            } catch {
              // Leave the text selected so the keyboard copy shortcut works.
            }
          }
        }

        button.disabled = false;
        button.textContent = copied ? "Copied!" : "Text selected";
        status.textContent = copied
          ? "BibTeX copied to clipboard."
          : "BibTeX selected. Press Control+C or Command+C to copy.";
        resetTimer = window.setTimeout(() => {
          button.textContent = originalLabel;
          status.textContent = "";
        }, 3500);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupCopyButtons, { once: true });
  } else {
    setupCopyButtons();
  }
})();
