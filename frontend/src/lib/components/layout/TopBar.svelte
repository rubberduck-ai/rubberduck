<script lang="ts">
  import { uiStore } from "$lib/stores/ui-store.svelte";
  import { chatStore } from "$lib/stores/chat-store.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Tooltip from "$lib/components/ui/Tooltip.svelte";
  import {
    PanelLeft,
    PanelRight,
    Plus,
    Settings,
    Sun,
    Moon,
    Command,
    Keyboard,
  } from "lucide-svelte";

  let activeTitle = $derived(chatStore.activeSession?.title ?? "Rubber Duck");
</script>

<header class="flex items-center h-12 px-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
  <!-- Left: Sidebar toggle + Title -->
  <div class="flex items-center gap-2 flex-1 min-w-0">
    <Tooltip text="切换侧边栏 (Ctrl+B)" side="bottom">
      <Button variant="ghost" size="icon" onclick={() => uiStore.toggleLeftSidebar()}>
        <PanelLeft class="h-4 w-4" />
      </Button>
    </Tooltip>

    <h1 class="text-sm font-semibold truncate">
      {activeTitle}
    </h1>
  </div>

  <!-- Center: App name -->
  <div class="flex items-center gap-1.5 px-4">
    <span class="text-lg">🦆</span>
    <span class="text-sm font-bold tracking-tight">Rubber Duck</span>
  </div>

  <!-- Right: Actions -->
  <div class="flex items-center gap-1 flex-1 justify-end">
    <Tooltip text="新建对话 (Ctrl+N)" side="bottom">
      <Button variant="ghost" size="icon" onclick={() => chatStore.createSession()}>
        <Plus class="h-4 w-4" />
      </Button>
    </Tooltip>

    <Tooltip text="命令面板 (Ctrl+K)" side="bottom">
      <Button variant="ghost" size="icon" onclick={() => (uiStore.commandPaletteOpen = true)}>
        <Command class="h-4 w-4" />
      </Button>
    </Tooltip>

    <Tooltip text="切换主题 (Ctrl+Shift+D)" side="bottom">
      <Button variant="ghost" size="icon" onclick={() => uiStore.toggleTheme()}>
        {#if uiStore.theme === "dark"}
          <Sun class="h-4 w-4" />
        {:else}
          <Moon class="h-4 w-4" />
        {/if}
      </Button>
    </Tooltip>

    <Tooltip text="快捷键 (Ctrl+/)" side="bottom">
      <Button variant="ghost" size="icon" onclick={() => (uiStore.shortcutsOpen = true)}>
        <Keyboard class="h-4 w-4" />
      </Button>
    </Tooltip>

    <Tooltip text="设置 (Ctrl+,)" side="bottom">
      <Button variant="ghost" size="icon" onclick={() => (uiStore.settingsOpen = true)}>
        <Settings class="h-4 w-4" />
      </Button>
    </Tooltip>

    <Tooltip text="切换右侧面板 (Ctrl+Shift+B)" side="bottom">
      <Button variant="ghost" size="icon" onclick={() => uiStore.toggleRightPanel()}>
        <PanelRight class="h-4 w-4" />
      </Button>
    </Tooltip>
  </div>
</header>
