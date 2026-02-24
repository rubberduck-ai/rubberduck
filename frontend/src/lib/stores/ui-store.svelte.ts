export type Theme = "light" | "dark" | "system";
export type RightPanelTab = "steps" | "plan" | "files" | "artifacts" | "context" | "skills" | "timer";
export type AppMode = "chat" | "collab";

function createUIStore() {
  let leftSidebarOpen = $state(true);
  let rightPanelOpen = $state(false);
  let rightPanelTab = $state<RightPanelTab>("context");
  let settingsOpen = $state(false);
  let shortcutsOpen = $state(false);
  let commandPaletteOpen = $state(false);
  let activeMode = $state<AppMode>("chat");
  let theme = $state<Theme>(
    (typeof localStorage !== "undefined" && localStorage.getItem("theme") as Theme) || "dark"
  );

  // Apply theme on init and changes
  function applyTheme(t: Theme) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (t === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle("dark", t === "dark");
    }
    localStorage.setItem("theme", t);
  }

  // Apply initial theme
  if (typeof document !== "undefined") {
    applyTheme(
      (typeof localStorage !== "undefined" && localStorage.getItem("theme") as Theme) || "dark"
    );
  }

  return {
    get leftSidebarOpen() { return leftSidebarOpen; },
    set leftSidebarOpen(v) { leftSidebarOpen = v; },

    get rightPanelOpen() { return rightPanelOpen; },
    set rightPanelOpen(v) { rightPanelOpen = v; },

    get rightPanelTab() { return rightPanelTab; },
    set rightPanelTab(v) { rightPanelTab = v; },

    get settingsOpen() { return settingsOpen; },
    set settingsOpen(v) { settingsOpen = v; },

    get shortcutsOpen() { return shortcutsOpen; },
    set shortcutsOpen(v) { shortcutsOpen = v; },

    get commandPaletteOpen() { return commandPaletteOpen; },
    set commandPaletteOpen(v) { commandPaletteOpen = v; },

    get activeMode() { return activeMode; },
    set activeMode(v) { 
      activeMode = v; 
      if (v === 'chat') {
        rightPanelOpen = false;
      } else if (v === 'collab') {
        rightPanelOpen = true;
      }
    },

    get theme() { return theme; },
    set theme(v: Theme) {
      theme = v;
      applyTheme(v);
    },

    toggleLeftSidebar() { leftSidebarOpen = !leftSidebarOpen; },
    toggleRightPanel() { rightPanelOpen = !rightPanelOpen; },
    toggleTheme() {
      const next: Theme = theme === "dark" ? "light" : "dark";
      theme = next;
      applyTheme(next);
    },
  };
}

export const uiStore = createUIStore();
