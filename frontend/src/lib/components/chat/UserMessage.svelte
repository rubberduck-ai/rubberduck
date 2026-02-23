<script lang="ts">
  import type { Message } from "$lib/stores/chat-store.svelte";
  import Avatar from "$lib/components/ui/Avatar.svelte";
  import { cn } from "$lib/utils";

  interface Props {
    message: Message;
  }

  let { message }: Props = $props();
</script>

<div class="flex gap-3 justify-end">
  <div class="flex flex-col items-end gap-1 max-w-[70%]">
    <div
      class={cn(
        "rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm",
        "bg-primary text-primary-foreground"
      )}
    >
      <p class="whitespace-pre-wrap break-words">{message.content}</p>
    </div>
    <span class="text-xs text-muted-foreground px-1">
      {new Date(message.timestamp).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
    </span>
  </div>
  <Avatar size="sm" fallback="我" class="bg-primary/20 text-primary shrink-0" />
</div>
