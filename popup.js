const FIELDS = ["websiteId", "projectName", "projectColor", "projectLogo"];

function readForm() {
  const config = {};
  for (const field of FIELDS) {
    config[field] = document.getElementById(field).value.trim();
  }
  config.openByDefault = document.getElementById("openByDefault").checked;
  return config;
}

function writeForm(config) {
  for (const field of FIELDS) {
    if (config[field]) document.getElementById(field).value = config[field];
  }
  document.getElementById("openByDefault").checked = Boolean(config.openByDefault);
}

function setStatus(message, isError) {
  const el = document.getElementById("status");
  el.textContent = message;
  el.style.color = isError ? "#c0392b" : "#2d7d46";
}

function injectWidget(config) {
  const existing = document.getElementById("kapa-widget-injector-script");
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.id = "kapa-widget-injector-script";
  script.src = "https://widget.kapa.ai/kapa-widget.bundle.js";
  script.setAttribute("data-website-id", config.websiteId);
  if (config.projectName) script.setAttribute("data-project-name", config.projectName);
  if (config.projectColor) script.setAttribute("data-project-color", config.projectColor);
  if (config.projectLogo) script.setAttribute("data-project-logo", config.projectLogo);
  if (config.openByDefault) script.setAttribute("data-modal-open-by-default", "true");
  document.body.appendChild(script);
}

chrome.storage.local.get("kapaWidgetConfig", ({ kapaWidgetConfig }) => {
  if (kapaWidgetConfig) writeForm(kapaWidgetConfig);
});

document.getElementById("injectBtn").addEventListener("click", async () => {
  const config = readForm();

  if (!config.websiteId) {
    setStatus("Website ID is required.", true);
    return;
  }

  await chrome.storage.local.set({ kapaWidgetConfig: config });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: injectWidget,
      args: [config],
    });
    setStatus("Injected! Check the page for the widget.", false);
  } catch (err) {
    setStatus(`Failed: ${err.message}`, true);
  }
});

