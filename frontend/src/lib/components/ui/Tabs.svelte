<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";

  interface Tab {
    id: string;
    label: string;
  }

  interface Props {
    tabs: Tab[];
    activeTab?: string;
    onchange?: (tabId: string) => void;
    class?: string;
    children?: Snippet;
  }

  let { tabs, activeTab = $bindable(""), onchange, class: className, children }: Props = $props();

  $effect(() => {
    if (!activeTab && tabs.length > 0) {
      activeTab = tabs[0].id;
    }
  });

  function selectTab(id: string) {
    activeTab = id;
    onchange?.(id);
  }
</script>

<div class={cn("flex flex-col h-full", className)}>
  <div class="inline-flex h-9 items-center justify-start rounded-none border-b bg-transparent p-0 w-full">
    {#each tabs as tab}
      <button
        class={cn(
          "inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative rounded-none border-b-2 border-transparent bg-transparent cursor-pointer",
          activeTab === tab.id && "border-b-primary text-foreground",
          activeTab !== tab.id && "text-muted-foreground hover:text-foreground"
        )}
        onclick={() => selectTab(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>
  <div class="flex-1 overflow-auto">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
