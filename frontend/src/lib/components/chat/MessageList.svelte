<script lang="ts">
  import { chatStore } from "$lib/stores/chat-store.svelte";
  import ScrollArea from "$lib/components/ui/ScrollArea.svelte";
  import UserMessage from "./UserMessage.svelte";
  import AssistantMessage from "./AssistantMessage.svelte";
  import { MessageSquareDashed } from "lucide-svelte";
  import { tick } from "svelte";

  let scrollContainer: HTMLDivElement | undefined = $state();

  // Auto-scroll to bottom when messages change
  let messageCount = $derived(chatStore.activeMessages.length);

  $effect(() => {
    // Track messageCount to trigger scroll
    void messageCount;
    tick().then(() => {
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    });
  });
</script>

<div class="flex-1 overflow-auto" bind:this={scrollContainer}>
  {#if chatStore.activeMessages.length === 0}
    <!-- Empty state -->
    <div class="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
      <div class="text-6xl">🦆</div>
      <div class="text-center space-y-2">
        <h3 class="text-lg font-semibold text-foreground">你好！我是 Rubber Duck</h3>
        <p class="text-sm max-w-md">
          把你遇到的问题告诉我，有时候光是描述问题就能帮你找到答案。<br />
          这就是橡皮鸭调试法的魔力！
        </p>
      </div>
      <div class="grid grid-cols-2 gap-2 mt-4 max-w-sm w-full">
        <button
          class="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-accent transition-colors text-left cursor-pointer"
          onclick={() => chatStore.sendMessage("帮我解释一下什么是橡皮鸭调试法？")}
        >
          <MessageSquareDashed class="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>什么是橡皮鸭调试法？</span>
        </button>
        <button
          class="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-accent transition-colors text-left cursor-pointer"
          onclick={() => chatStore.sendMessage("我有一个 bug 需要讨论")}
        >
          <MessageSquareDashed class="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>我有一个 bug</span>
        </button>
        <button
          class="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-accent transition-colors text-left cursor-pointer"
          onclick={() => chatStore.sendMessage("帮我审查一下我的代码思路")}
        >
          <MessageSquareDashed class="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>审查代码思路</span>
        </button>
        <button
          class="flex items-center gap-2 rounded-lg border p-3 text-sm hover:bg-accent transition-colors text-left cursor-pointer"
          onclick={() => chatStore.sendMessage("帮我理清一下系统架构设计")}
        >
          <MessageSquareDashed class="h-4 w-4 shrink-0 text-muted-foreground" />
          <span>系统架构设计</span>
        </button>
      </div>
    </div>
  {:else}
    <!-- Message list -->
    <div class="flex flex-col gap-4 p-4 pb-2">
      {#each chatStore.activeMessages as message (message.id)}
        {#if message.role === "user"}
          <UserMessage {message} />
        {:else}
          <AssistantMessage {message} />
        {/if}
      {/each}

      {#if chatStore.streaming}
        <div class="flex gap-3">
          <div class="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-base shrink-0">
            🦆
          </div>
          <div class="rounded-2xl rounded-tl-sm px-4 py-3 bg-muted">
            <div class="flex gap-1.5">
              <span class="h-2 w-2 bg-foreground/30 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="h-2 w-2 bg-foreground/30 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="h-2 w-2 bg-foreground/30 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>
