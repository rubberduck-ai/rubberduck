<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";

  interface Props {
    open?: boolean;
    class?: string;
    trigger?: Snippet;
    children?: Snippet;
  }

  let { open = $bindable(false), class: className, trigger, children }: Props = $props();

  function handleBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      open = false;
    }
  }

  function close() {
    open = false;
  }
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "Escape" && open) {
      open = false;
    }
  }}
/>

<div class={cn("relative inline-block", className)}>
  {#if trigger}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onclick={() => (open = !open)}>
      {@render trigger()}
    </div>
  {/if}

  {#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="fixed inset-0 z-40" onclick={handleBackdrop}></div>
    <div class="absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}
</div>
