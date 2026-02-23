<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";
  import { X } from "lucide-svelte";

  interface Props {
    open?: boolean;
    onclose?: () => void;
    class?: string;
    children?: Snippet;
    title?: string;
    description?: string;
  }

  let { open = $bindable(false), onclose, class: className, children, title, description }: Props = $props();

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      open = false;
      onclose?.();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      open = false;
      onclose?.();
    }
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center"
    onkeydown={handleKeydown}
  >
    <!-- Backdrop -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="fixed inset-0 bg-black/80" onclick={handleBackdropClick}></div>

    <!-- Content -->
    <div
      class={cn(
        "relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg",
        className
      )}
    >
      {#if title}
        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 class="text-lg font-semibold leading-none tracking-tight">{title}</h2>
          {#if description}
            <p class="text-sm text-muted-foreground">{description}</p>
          {/if}
        </div>
      {/if}
      {#if children}
        {@render children()}
      {/if}
      <button
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
        onclick={() => { open = false; onclose?.(); }}
      >
        <X class="h-4 w-4" />
        <span class="sr-only">Close</span>
      </button>
    </div>
  </div>
{/if}
