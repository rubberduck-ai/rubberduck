<script lang="ts">
  import { chatStore } from "$lib/stores/chat-store.svelte";
  import { uiStore } from "$lib/stores/ui-store.svelte";
  import ScrollArea from "$lib/components/ui/ScrollArea.svelte";
  import UserMessage from "./UserMessage.svelte";
  import AssistantMessage from "./AssistantMessage.svelte";
  import { MessageSquare, Briefcase } from "lucide-svelte";
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
    <div class="flex flex-col items-center justify-center h-full text-muted-foreground gap-6">
      {#if uiStore.activeMode === 'collab'}
        <div class="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
          <Briefcase class="h-8 w-8 text-muted-foreground" />
        </div>
        <div class="text-center space-y-2">
          <h3 class="text-xl font-semibold text-foreground">开始协作会话</h3>
          <p class="text-sm">
            选择工作目录，然后让助手帮你处理项目。
          </p>
          <p class="text-xs text-muted-foreground/70 mt-2">
            提示：将文件拖入输入框以引用其路径
          </p>
        </div>
        
        <div class="flex flex-wrap justify-center gap-3 mt-4 max-w-2xl w-full">
          <button
            class="rounded-full border bg-background px-4 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
            onclick={() => chatStore.sendMessage("审查代码库并提出改进建议")}
          >
            审查代码库并提出改进建议
          </button>
          <button
            class="rounded-full border bg-background px-4 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
            onclick={() => chatStore.sendMessage("给主模块添加测试")}
          >
            给主模块添加测试
          </button>
          <button
            class="rounded-full border bg-background px-4 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
            onclick={() => chatStore.sendMessage("重构以改善错误处理")}
          >
            重构以改善错误处理
          </button>
        </div>
      {:else}
        <div class="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
          <MessageSquare class="h-8 w-8 text-muted-foreground" />
        </div>
        <div class="text-center space-y-2">
          <h3 class="text-xl font-semibold text-foreground">开始对话</h3>
          <p class="text-sm">
            随意提问 —— 纯对话，无工具。
          </p>
        </div>
        
        <div class="flex flex-wrap justify-center gap-3 mt-4 max-w-2xl w-full">
          <button
            class="rounded-full border bg-background px-4 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
            onclick={() => chatStore.sendMessage("解释 async/await 的工作原理")}
          >
            解释 async/await 的工作原理
          </button>
          <button
            class="rounded-full border bg-background px-4 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
            onclick={() => chatStore.sendMessage("比较 REST 和 GraphQL")}
          >
            比较 REST 和 GraphQL
          </button>
          <button
            class="rounded-full border bg-background px-4 py-2 text-sm hover:bg-accent transition-colors cursor-pointer"
            onclick={() => chatStore.sendMessage("写一个邮箱验证正则表达式")}
          >
            写一个邮箱验证正则表达式
          </button>
        </div>
      {/if}

      <div class="mt-8 rounded-xl border bg-muted/30 p-4 text-xs text-muted-foreground">
        <div class="grid grid-cols-2 gap-x-8 gap-y-3">
          <div class="flex items-center justify-between gap-4">
            <span>Ctrl+N</span>
            <span>新建对话</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span>Ctrl+K</span>
            <span>命令</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span>Ctrl+B</span>
            <span>侧边栏</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span>Ctrl+/</span>
            <span>快捷键</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span>Ctrl+,</span>
            <span>设置</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span>Ctrl+D</span>
            <span>复制</span>
          </div>
        </div>
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
