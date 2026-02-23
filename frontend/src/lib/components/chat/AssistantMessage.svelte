<script lang="ts">
  import type { Message } from "$lib/stores/chat-store.svelte";
  import Avatar from "$lib/components/ui/Avatar.svelte";
  import { cn } from "$lib/utils";
  import { marked } from "marked";

  interface Props {
    message: Message;
  }

  let { message }: Props = $props();

  // Configure marked for safe rendering
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  let htmlContent = $derived(marked.parse(message.content) as string);
</script>

<div class="flex gap-3">
  <Avatar size="sm" fallback="🦆" class="bg-accent shrink-0 text-base" />
  <div class="flex flex-col gap-1 max-w-[70%]">
    <div
      class={cn(
        "rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm",
        "bg-muted text-foreground"
      )}
    >
      <div class="prose prose-sm dark:prose-invert max-w-none break-words [&_p]:my-1 [&_pre]:my-2 [&_pre]:rounded-lg [&_pre]:bg-background/50 [&_pre]:p-3 [&_code]:rounded [&_code]:bg-background/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_blockquote]:border-l-primary/50 [&_a]:text-primary">
        {@html htmlContent}
      </div>
    </div>
    <span class="text-xs text-muted-foreground px-1">
      {new Date(message.timestamp).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
    </span>
  </div>
</div>
