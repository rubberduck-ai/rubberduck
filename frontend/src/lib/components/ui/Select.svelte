<script lang="ts">
  import { cn } from "$lib/utils";
  import { ChevronDown } from "lucide-svelte";

  interface Option {
    value: string;
    label: string;
  }

  interface Props {
    options: Option[];
    value?: string;
    onchange?: (value: string) => void;
    placeholder?: string;
    class?: string;
  }

  let { options, value = $bindable(""), onchange, placeholder = "选择...", class: className }: Props = $props();

  function handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    value = target.value;
    onchange?.(value);
  }
</script>

<div class={cn("relative", className)}>
  <select
    class={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8",
      className
    )}
    {value}
    onchange={handleChange}
  >
    {#if placeholder}
      <option value="" disabled selected class="text-muted-foreground">{placeholder}</option>
    {/if}
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
</div>
