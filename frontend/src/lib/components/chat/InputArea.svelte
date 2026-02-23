<script lang="ts">
  import { chatStore } from "$lib/stores/chat-store.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Tooltip from "$lib/components/ui/Tooltip.svelte";
  import { SendHorizontal, Square, Paperclip } from "lucide-svelte";
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

<div class="border-t bg-background p-4 shrink-0">
  <div class="flex items-end gap-2 max-w-4xl mx-auto">
    <div class="flex-1 relative">
      <textarea
        bind:this={textareaEl}
        bind:value={inputValue}
        oninput={autoResize}
        onkeydown={handleKeydown}
        placeholder="描述你遇到的问题..."
        rows="1"
        disabled={chatStore.streaming}
        class={cn(
          "flex w-full rounded-xl border border-input bg-muted/50 px-4 py-3 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          "min-h-[44px] max-h-[200px]"
        )}
      ></textarea>
    </div>

    {#if chatStore.streaming}
      <Tooltip text="停止生成 (Escape)">
        <Button
          variant="destructive"
          size="icon"
          class="rounded-xl h-[44px] w-[44px] shrink-0"
          onclick={() => {/* TODO: stop streaming */}}
        >
          <Square class="h-4 w-4" />
        </Button>
      </Tooltip>
    {:else}
      <Tooltip text="发送 (Enter)">
        <Button
          variant={canSend ? "default" : "secondary"}
          size="icon"
          class="rounded-xl h-[44px] w-[44px] shrink-0"
          disabled={!canSend}
          onclick={handleSend}
        >
          <SendHorizontal class="h-4 w-4" />
        </Button>
      </Tooltip>
    {/if}
  </div>
  <div class="text-center mt-2">
    <span class="text-xs text-muted-foreground">
      Shift+Enter 换行 · Enter 发送 · Rubber Duck 可能会犯错，请注意核实
    </span>
  </div>
</div>
