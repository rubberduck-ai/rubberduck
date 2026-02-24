<script lang="ts">
  import { uiStore } from "$lib/stores/ui-store.svelte";
  import { chatStore } from "$lib/stores/chat-store.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Tooltip from "$lib/components/ui/Tooltip.svelte";
  import { Window } from "@wailsio/runtime";
  import {
    PanelLeft,
    PanelRight,
    Settings,
    Sun,
    Moon,
    Keyboard,
    HelpCircle,
    Minus,
    Square,
    X,
    MessageSquare,
    Users
  } from "lucide-svelte";
</script>

<header class="flex items-center h-12 px-3 bg-background shrink-0 border-b" style="--wails-draggable: drag">
  <!-- Left: Sidebar toggle and Tabs -->
  <div class="flex items-center gap-2 flex-1 min-w-0" style="--wails-draggable: no-drag">
    <Tooltip text="切换侧边栏 (Ctrl+B)" side="bottom">
      <Button variant="ghost" size="icon" onclick={() => uiStore.toggleLeftSidebar()}>
        <PanelLeft class="h-4 w-4" />
      </Button>
    </Tooltip>

    <div class="w-px h-4 bg-border mx-1"></div>

    <div class="flex items-center gap-1">
      <button 
        class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors {uiStore.activeMode === 'chat' ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'}"
        onclick={() => uiStore.activeMode = 'chat'}
      >
        <MessageSquare class="h-4 w-4" />
        对话
        <kbd class="ml-1 inline-flex h-5 items-center rounded border bg-muted px-1 font-mono text-[10px] text-muted-foreground">1</kbd>
      </button>
      <button 
        class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors {uiStore.activeMode === 'collab' ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'}"
        onclick={() => uiStore.activeMode = 'collab'}
      >
        <Users class="h-4 w-4" />
        协作
        <kbd class="ml-1 inline-flex h-5 items-center rounded border bg-muted px-1 font-mono text-[10px] text-muted-foreground">2</kbd>
      </button>
    </div>
  </div>

  <!-- Right: Actions -->
  <div class="flex items-center gap-1 flex-1 justify-end" style="--wails-draggable: no-drag">
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

    <Tooltip text="帮助" side="bottom">
      <Button variant="ghost" size="icon">
        <HelpCircle class="h-4 w-4" />
      </Button>
    </Tooltip>

    <Tooltip text="设置 (Ctrl+,)" side="bottom">
      <Button variant="ghost" size="icon" onclick={() => (uiStore.settingsOpen = true)}>
        <Settings class="h-4 w-4" />
      </Button>
    </Tooltip>

    {#if uiStore.activeMode === 'collab'}
      <Tooltip text="切换右侧面板 (Ctrl+Shift+B)" side="bottom">
        <Button variant="ghost" size="icon" onclick={() => uiStore.toggleRightPanel()}>
          <PanelRight class="h-4 w-4" />
        </Button>
      </Tooltip>
    {/if}

    <div class="w-px h-4 bg-border mx-1"></div>

    <!-- Window Controls -->
    <Button variant="ghost" size="icon" class="h-8 w-8" style="--wails-draggable: no-drag" onclick={() => Window.Minimise()}>
      <Minus class="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon" class="h-8 w-8" style="--wails-draggable: no-drag" onclick={() => Window.ToggleMaximise()}>
      <Square class="h-3.5 w-3.5" />
    </Button>
    <Button variant="ghost" size="icon" class="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground" style="--wails-draggable: no-drag" onclick={() => Window.Close()}>
      <X class="h-4 w-4" />
    </Button>
  </div>
</header>
