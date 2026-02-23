<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";

  type Size = "default" | "sm" | "lg";

  interface Props {
    size?: Size;
    class?: string;
    children?: Snippet;
    fallback?: string;
    src?: string;
    alt?: string;
  }

  let { size = "default", class: className, children, fallback = "", src, alt = "" }: Props = $props();

  const sizeClasses: Record<Size, string> = {
    default: "h-10 w-10",
    sm: "h-8 w-8",
    lg: "h-12 w-12",
  };

  let imgError = $state(false);
</script>

<span
  class={cn(
    "relative flex shrink-0 overflow-hidden rounded-full",
    sizeClasses[size],
    className
  )}
>
  {#if src && !imgError}
    <img {src} {alt} class="aspect-square h-full w-full" onerror={() => (imgError = true)} />
  {:else if children}
    {@render children()}
  {:else}
    <span class="flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-medium">
      {fallback}
    </span>
  {/if}
</span>
