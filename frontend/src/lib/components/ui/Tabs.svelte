<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Snippet, Component } from "svelte";

  interface Tab {
    id: string;
    label: string;
    icon?: any;
  }

  interface Props {
    tabs: Tab[];
    activeTab?: string;
    onchange?: (tabId: string) => void;
    class?: string;
    children?: Snippet;
    rightSlot?: Snippet;
  }

  let { tabs, activeTab = $bindable(""), onchange, class: className, children, rightSlot }: Props = $props();

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
  <div class="flex items-center border-b bg-transparent w-full px-2 shrink-0">
    <div class="flex items-center h-12 flex-1">
      {#each tabs as tab}
        <button
          class={cn(
            "inline-flex items-center justify-center gap-1.5 whitespace-nowrap flex-1 py-1 text-xs font-medium transition-all relative rounded-none border-b-2 border-transparent bg-transparent cursor-pointer h-full",
            activeTab === tab.id && "border-b-primary text-foreground",
            activeTab !== tab.id && "text-muted-foreground hover:text-foreground"
          )}
          onclick={() => selectTab(tab.id)}
        >
          {#if tab.icon}
            <tab.icon class="h-3.5 w-3.5" />
          {/if}
          {tab.label}
        </button>
      {/each}
    </div>
    {#if rightSlot}
      <div class="flex items-center shrink-0">
        {@render rightSlot()}
      </div>
    {/if}
  </div>
  <div class="flex-1 overflow-auto">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
