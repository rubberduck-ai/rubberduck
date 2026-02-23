<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";

  interface Props {
    class?: string;
    children?: Snippet;
    text: string;
    side?: "top" | "bottom" | "left" | "right";
  }

  let { class: className, children, text, side = "top" }: Props = $props();
</script>

<div class={cn("group relative inline-flex", className)}>
  {#if children}
    {@render children()}
  {/if}
  <div
    role="tooltip"
    class={cn(
      "pointer-events-none absolute z-50 opacity-0 transition-opacity group-hover:opacity-100",
      "rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md",
      side === "top" && "bottom-full left-1/2 mb-2 -translate-x-1/2",
      side === "bottom" && "top-full left-1/2 mt-2 -translate-x-1/2",
      side === "left" && "right-full top-1/2 mr-2 -translate-y-1/2",
      side === "right" && "left-full top-1/2 ml-2 -translate-y-1/2"
    )}
  >
    {text}
  </div>
</div>
