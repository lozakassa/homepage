const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function activateTab(tab, moveFocus) {
  const panelId = tab.getAttribute("aria-controls");

  tabs.forEach((item) => {
    const isActive = item === tab;
    item.setAttribute("aria-selected", String(isActive));
    item.tabIndex = isActive ? 0 : -1;
    item.classList.toggle("is-active", isActive);
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== panelId;
  });

  if (moveFocus) {
    tab.focus();
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab, false));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateTab(tabs[nextIndex], true);
  });
});

document.querySelectorAll("[data-open-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = tabs.find((tab) => tab.id === `${button.dataset.openTab}-tab`);
    if (target) {
      activateTab(target, true);
    }
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
