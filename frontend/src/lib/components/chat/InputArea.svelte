<script lang="ts">
  import { chatStore } from "$lib/stores/chat-store.svelte";
  import { uiStore } from "$lib/stores/ui-store.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Tooltip from "$lib/components/ui/Tooltip.svelte";
  import { Send, Square, Paperclip, TriangleAlert, ChevronDown, Bot, FolderOpen, Plus, FileText, Image, Folder } from "lucide-svelte";
  import { cn } from "$lib/utils";

  let inputValue = $state("");
  let textareaEl: HTMLTextAreaElement | undefined = $state();

  function autoResize() {
    if (!textareaEl) return;
    textareaEl.style.height = "auto";
    textareaEl.style.height = Math.min(textareaEl.scrollHeight, 200) + "px";
  }

  async function handleSend() {
    const text = inputValue.trim();
    if (!text || chatStore.streaming) return;
    inputValue = "";
    if (textareaEl) {
      textareaEl.style.height = "auto";
    }
    await chatStore.sendMessage(text);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  let canSend = $derived(inputValue.trim().length > 0 && !chatStore.streaming);
</script>

<div class="bg-background p-4 shrink-0">
  <div class="max-w-4xl mx-auto flex flex-col gap-3">
    <!-- API Key Warning -->
    <button 
      class="flex items-center gap-2 w-full rounded-lg border border-warning/50 bg-warning/10 px-4 py-2 text-sm text-warning-foreground hover:bg-warning/20 transition-colors text-left cursor-pointer"
      onclick={() => (uiStore.settingsOpen = true)}
    >
      <TriangleAlert class="h-4 w-4 text-warning" />
      <span class="text-warning">未配置 API Key，点击此处打开设置。</span>
    </button>

    {#if uiStore.activeMode === 'collab'}
      <!-- Workspace Warning -->
      <button 
        class="flex items-center gap-2 w-full rounded-lg border border-warning/50 bg-warning/10 px-4 py-2 text-sm text-warning-foreground hover:bg-warning/20 transition-colors text-left cursor-pointer"
      >
        <FolderOpen class="h-4 w-4 text-warning" />
        <span class="text-warning">使用 cowork 模式前请先选择工作目录，点击此处选择。</span>
      </button>
    {/if}

    <!-- Input Box -->
    <div class="flex flex-col rounded-2xl border bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring transition-shadow">
      <textarea
        bind:this={textareaEl}
        bind:value={inputValue}
        oninput={autoResize}
        onkeydown={handleKeydown}
        placeholder={uiStore.activeMode === 'collab' ? "让助手帮你处理项目..." : "输入消息..."}
        rows="1"
        disabled={chatStore.streaming}
        class={cn(
          "flex w-full bg-transparent px-4 py-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          "min-h-[60px] max-h-[200px]"
        )}
      ></textarea>

      <div class="flex items-center justify-between px-3 pb-3">
        <div class="flex items-center gap-1">
          <Button variant="ghost" size="sm" class="h-8 gap-1.5 text-muted-foreground hover:text-foreground rounded-full px-3">
            <Bot class="h-4 w-4" />
            <span class="text-xs">gpt-4o</span>
            <ChevronDown class="h-3 w-3 opacity-50" />
          </Button>
          
          <div class="w-px h-4 bg-border mx-1"></div>
          
          <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
            <Plus class="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
            <FileText class="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
            <Image class="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
            <Folder class="h-4 w-4" />
          </Button>
        </div>

        {#if chatStore.streaming}
          <Button
            variant="destructive"
            size="sm"
            class="h-8 rounded-full gap-1.5 px-4"
            onclick={() => {/* TODO: stop streaming */}}
          >
            <Square class="h-3.5 w-3.5" />
            停止
          </Button>
        {:else}
          <Button
            variant={canSend ? "default" : "secondary"}
            size="sm"
            class="h-8 rounded-full gap-1.5 px-4"
            disabled={!canSend}
            onclick={handleSend}
          >
            开始
            <Send class="h-3.5 w-3.5" />
          </Button>
        {/if}
      </div>
    </div>
  </div>
</div>
