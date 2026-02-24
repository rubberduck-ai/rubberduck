<script lang="ts">
  import { cn } from "$lib/utils";
  import { ChevronDown, Check } from "lucide-svelte";

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

  let open = $state(false);
  let containerEl: HTMLDivElement;

  const selectedLabel = $derived(options.find(o => o.value === value)?.label ?? placeholder);

  function select(optionValue: string) {
    value = optionValue;
    onchange?.(value);
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") open = false;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open = !open; }
  }

  function handleBlur(e: FocusEvent) {
    if (!containerEl.contains(e.relatedTarget as Node)) open = false;
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={containerEl}
  class={cn("relative", className)}
  onblur={handleBlur}
>
  <button
    type="button"
    class="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors hover:bg-accent/40 focus:outline-none focus:border-ring data-[open=true]:border-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
    data-open={open}
    onclick={() => open = !open}
    onkeydown={handleKeydown}
  >
    <span class={value ? "text-foreground" : "text-muted-foreground"}>{selectedLabel}</span>
    <ChevronDown class="ml-2 h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 {open ? 'rotate-180' : ''}" />
  </button>

  {#if open}
    <div
      class="absolute z-50 mt-1.5 w-full rounded-lg border border-border/60 bg-background/95 backdrop-blur-sm shadow-lg overflow-hidden py-1"
      style="animation: selectFadeIn 0.12s ease-out;"
    >
      {#each options as option}
        <button
          type="button"
          class="flex w-full items-center justify-between px-3 py-1.5 text-sm cursor-pointer rounded-sm mx-auto transition-colors hover:bg-accent hover:text-accent-foreground {option.value === value ? 'text-foreground font-medium' : 'text-foreground/80'}"
          style="width: calc(100% - 8px); margin: 0 4px;"
          onclick={() => select(option.value)}
        >
          <span>{option.label}</span>
          {#if option.value === value}
            <Check class="h-3.5 w-3.5 text-muted-foreground" />
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  @keyframes selectFadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
