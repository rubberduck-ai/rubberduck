<script lang="ts">
  import { uiStore } from "$lib/stores/ui-store.svelte";
  import { chatStore } from "$lib/stores/chat-store.svelte";
  import Input from "$lib/components/ui/Input.svelte";
  import Separator from "$lib/components/ui/Separator.svelte";
  import {
    Plus,
    Settings,
    Sun,
    Moon,
    PanelLeft,
    PanelRight,
    Trash2,
    Keyboard,
    Search,
    MessageSquare,
  } from "lucide-svelte";

  let searchQuery = $state("");
  let inputEl: HTMLInputElement | undefined = $state();

  interface CommandItem {
    id: string;
    label: string;
    icon: typeof Plus;
    shortcut?: string;
    action: () => void;
    category: string;
  }

  const commands: CommandItem[] = [
    { id: "new-session", label: "新建对话", icon: Plus, shortcut: "Ctrl+N", action: () => { chatStore.createSession(); close(); }, category: "对话" },
    { id: "clear-chat", label: "清空当前对话", icon: Trash2, shortcut: "Ctrl+L", action: () => { chatStore.clearActiveSession(); close(); }, category: "对话" },
    { id: "toggle-sidebar", label: "切换侧边栏", icon: PanelLeft, shortcut: "Ctrl+B", action: () => { uiStore.toggleLeftSidebar(); close(); }, category: "面板" },
    { id: "toggle-right-panel", label: "切换右侧面板", icon: PanelRight, shortcut: "Ctrl+Shift+B", action: () => { uiStore.toggleRightPanel(); close(); }, category: "面板" },
    { id: "toggle-theme", label: "切换主题", icon: Sun, shortcut: "Ctrl+Shift+D", action: () => { uiStore.toggleTheme(); close(); }, category: "外观" },
    { id: "open-settings", label: "打开设置", icon: Settings, shortcut: "Ctrl+,", action: () => { uiStore.settingsOpen = true; close(); }, category: "设置" },
    { id: "show-shortcuts", label: "显示快捷键", icon: Keyboard, shortcut: "Ctrl+/", action: () => { uiStore.shortcutsOpen = true; close(); }, category: "帮助" },
  ];

  let filteredCommands = $derived(
    searchQuery.trim()
      ? commands.filter((c) => c.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : commands
  );

  // Group by category
  let groupedCommands = $derived(() => {
    const groups: Record<string, CommandItem[]> = {};
    for (const cmd of filteredCommands) {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    }
    return groups;
  });

  function close() {
    uiStore.commandPaletteOpen = false;
    searchQuery = "";
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      close();
    }
  }

  // Also add session switching commands
  let sessionCommands = $derived(
    chatStore.sessions
      .filter((s) => s.id !== chatStore.activeSessionId)
      .filter((s) => !searchQuery.trim() || s.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((s) => ({
        id: `session-${s.id}`,
        label: s.title,
        icon: MessageSquare,
        action: () => { chatStore.activeSessionId = s.id; close(); },
        category: "切换对话",
      }))
  );

  $effect(() => {
    if (uiStore.commandPaletteOpen && inputEl) {
      // Focus input when opened
      setTimeout(() => inputEl?.focus(), 50);
    }
  });
</script>

{#if uiStore.commandPaletteOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 z-50" onkeydown={handleKeydown}>
    <!-- Backdrop -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="fixed inset-0 bg-black/50" onclick={close}></div>

    <!-- Command palette -->
    <div class="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg">
      <div class="rounded-xl border bg-popover text-popover-foreground shadow-2xl overflow-hidden">
        <!-- Search -->
        <div class="flex items-center border-b px-3">
          <Search class="h-4 w-4 shrink-0 opacity-50" />
          <input
            bind:this={inputEl}
            bind:value={searchQuery}
            placeholder="输入命令或搜索..."
            class="flex h-11 w-full rounded-md bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <!-- Results -->
        <div class="max-h-[300px] overflow-auto p-1">
          {#if filteredCommands.length === 0 && sessionCommands.length === 0}
            <div class="py-6 text-center text-sm text-muted-foreground">未找到匹配的命令</div>
          {:else}
            {#each Object.entries(groupedCommands()) as [category, items]}
              <div class="px-2 py-1.5">
                <p class="text-xs font-medium text-muted-foreground">{category}</p>
              </div>
              {#each items as cmd}
                {@const Icon = cmd.icon}
                <button
                  class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground w-full gap-2"
                  onclick={cmd.action}
                >
                  <Icon class="h-4 w-4 opacity-60" />
                  <span class="flex-1 text-left">{cmd.label}</span>
                  {#if cmd.shortcut}
                    <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                      {cmd.shortcut}
                    </kbd>
                  {/if}
                </button>
              {/each}
            {/each}

            {#if sessionCommands.length > 0}
              <div class="px-2 py-1.5">
                <p class="text-xs font-medium text-muted-foreground">切换对话</p>
              </div>
              {#each sessionCommands as cmd}
                <button
                  class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground w-full gap-2"
                  onclick={cmd.action}
                >
                  <MessageSquare class="h-4 w-4 opacity-60" />
                  <span class="flex-1 text-left truncate">{cmd.label}</span>
                </button>
              {/each}
            {/if}
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
