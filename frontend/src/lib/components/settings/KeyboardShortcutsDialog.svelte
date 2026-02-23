<script lang="ts">
  import { uiStore } from "$lib/stores/ui-store.svelte";
  import Dialog from "$lib/components/ui/Dialog.svelte";
  import Separator from "$lib/components/ui/Separator.svelte";

  interface ShortcutGroup {
    title: string;
    shortcuts: { keys: string; description: string }[];
  }

  const groups: ShortcutGroup[] = [
    {
      title: "通用",
      shortcuts: [
        { keys: "Ctrl+N", description: "新建对话" },
        { keys: "Ctrl+L", description: "清空当前对话" },
        { keys: "Ctrl+K", description: "打开命令面板" },
        { keys: "Ctrl+,", description: "打开设置" },
        { keys: "Ctrl+/", description: "显示快捷键" },
      ],
    },
    {
      title: "面板",
      shortcuts: [
        { keys: "Ctrl+B", description: "切换左侧边栏" },
        { keys: "Ctrl+Shift+B", description: "切换右侧面板" },
      ],
    },
    {
      title: "外观",
      shortcuts: [
        { keys: "Ctrl+Shift+D", description: "切换深/浅主题" },
      ],
    },
    {
      title: "聊天",
      shortcuts: [
        { keys: "Enter", description: "发送消息" },
        { keys: "Shift+Enter", description: "换行" },
        { keys: "Escape", description: "停止生成" },
      ],
    },
  ];
</script>

<Dialog bind:open={uiStore.shortcutsOpen} title="键盘快捷键" description="使用快捷键提高效率">
  <div class="space-y-4 py-2 max-h-[60vh] overflow-auto">
    {#each groups as group, i}
      {#if i > 0}
        <Separator />
      {/if}
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-muted-foreground">{group.title}</h4>
        <div class="space-y-1">
          {#each group.shortcuts as shortcut}
            <div class="flex items-center justify-between py-1">
              <span class="text-sm">{shortcut.description}</span>
              <kbd class="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium text-muted-foreground">
                {shortcut.keys}
              </kbd>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Dialog>
