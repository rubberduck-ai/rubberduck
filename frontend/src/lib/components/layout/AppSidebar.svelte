<script lang="ts">
  import { chatStore } from "$lib/stores/chat-store.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import ScrollArea from "$lib/components/ui/ScrollArea.svelte";
  import Separator from "$lib/components/ui/Separator.svelte";
  import { Plus, MessageSquare, Trash2 } from "lucide-svelte";
  import { cn } from "$lib/utils";
</script>

<aside class="flex flex-col h-full w-64 bg-sidebar text-sidebar-foreground border-r">
  <!-- Header -->
  <div class="flex items-center justify-between p-3 h-12 shrink-0">
    <div class="flex items-center gap-2">
      <span class="text-lg">🦆</span>
      <span class="text-sm font-bold">对话列表</span>
    </div>
    <Button variant="ghost" size="icon" onclick={() => chatStore.createSession()}>
      <Plus class="h-4 w-4" />
    </Button>
  </div>

  <Separator />

  <!-- Session List -->
  <ScrollArea class="flex-1">
    <div class="p-2 space-y-1">
      {#each chatStore.sessions as session (session.id)}
        <button
          class={cn(
            "flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm transition-colors text-left group cursor-pointer",
            session.id === chatStore.activeSessionId
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70"
          )}
          onclick={() => (chatStore.activeSessionId = session.id)}
        >
          <MessageSquare class="h-4 w-4 shrink-0 opacity-60" />
          <span class="truncate flex-1">{session.title}</span>
          <span class="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 shrink-0">
            {new Date(session.updatedAt).toLocaleDateString("zh-CN", { month: "short", day: "numeric" })}
          </span>
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <span
            class="opacity-0 group-hover:opacity-100 shrink-0 hover:text-destructive transition-colors"
            onclick={(e) => { e.stopPropagation(); chatStore.deleteSession(session.id); }}
          >
            <Trash2 class="h-3.5 w-3.5" />
          </span>
        </button>
      {/each}
    </div>
  </ScrollArea>

  <!-- Footer -->
  <Separator />
  <div class="p-3 text-xs text-muted-foreground text-center">
    {chatStore.sessions.length} 个对话
  </div>
</aside>
