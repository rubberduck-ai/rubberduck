<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";

  interface Props {
    class?: string;
    children?: Snippet;
    for?: string;
  }

  let { class: className, children, for: htmlFor }: Props = $props();
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<label
  class={cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className
  )}
  for={htmlFor}
>
  {#if children}
    {@render children()}
  {/if}
</label>
