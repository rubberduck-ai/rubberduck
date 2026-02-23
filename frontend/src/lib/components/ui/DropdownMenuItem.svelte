<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";

  interface Props {
    class?: string;
    children?: Snippet;
    onclick?: () => void;
    disabled?: boolean;
  }

  let { class: className, children, onclick, disabled = false }: Props = $props();
</script>

<button
  class={cn(
    "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full",
    className
  )}
  {disabled}
  onclick={onclick}
>
  {#if children}
    {@render children()}
  {/if}
</button>
