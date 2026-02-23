<script lang="ts">
  import { uiStore } from "$lib/stores/ui-store.svelte";
  import { chatStore } from "$lib/stores/chat-store.svelte";
  import TopBar from "./TopBar.svelte";
  import AppSidebar from "./AppSidebar.svelte";
  import MessageList from "$lib/components/chat/MessageList.svelte";
  import InputArea from "$lib/components/chat/InputArea.svelte";
  import RightPanel from "$lib/components/panels/RightPanel.svelte";
  import SettingsDialog from "$lib/components/settings/SettingsDialog.svelte";
  import KeyboardShortcutsDialog from "$lib/components/settings/KeyboardShortcutsDialog.svelte";
  import CommandPalette from "$lib/components/CommandPalette.svelte";
  import { cn } from "$lib/utils";

  // Global keyboard shortcuts
  function handleKeydown(e: KeyboardEvent) {
    const isCtrl = e.ctrlKey || e.metaKey;

    if (isCtrl && e.key === "n") {
      e.preventDefault();
      chatStore.createSession();
    } else if (isCtrl && e.key === "b" && !e.shiftKey) {
      e.preventDefault();
      uiStore.toggleLeftSidebar();
    } else if (isCtrl && e.shiftKey && e.key === "B") {
      e.preventDefault();
      uiStore.toggleRightPanel();
    } else if (isCtrl && e.key === "l") {
      e.preventDefault();
      chatStore.clearActiveSession();
    } else if (isCtrl && e.key === ",") {
      e.preventDefault();
      uiStore.settingsOpen = true;
    } else if (isCtrl && e.key === "/") {
      e.preventDefault();
      uiStore.shortcutsOpen = true;
    } else if (isCtrl && e.key === "k") {
      e.preventDefault();
      uiStore.commandPaletteOpen = !uiStore.commandPaletteOpen;
    } else if (isCtrl && e.shiftKey && (e.key === "D" || e.key === "d")) {
      e.preventDefault();
      uiStore.toggleTheme();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="flex flex-col h-screen w-screen overflow-hidden bg-background text-foreground">
  <!-- TopBar -->
  <TopBar />

  <!-- Main content row -->
  <div class="flex flex-1 overflow-hidden">
    <!-- Left Sidebar -->
    {#if uiStore.leftSidebarOpen}
      <div class="shrink-0 transition-all duration-200">
        <AppSidebar />
      </div>
    {/if}

    <!-- Chat Area (flex-1) -->
    <main class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <MessageList />
      <InputArea />
    </main>

    <!-- Right Panel -->
    {#if uiStore.rightPanelOpen}
      <div class="shrink-0 transition-all duration-200">
        <RightPanel />
      </div>
    {/if}
  </div>

  <!-- Dialogs (rendered outside the layout flow) -->
  <SettingsDialog />
  <KeyboardShortcutsDialog />
  <CommandPalette />
</div>
