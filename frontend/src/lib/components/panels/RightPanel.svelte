<script lang="ts">
  import { uiStore, type RightPanelTab } from "$lib/stores/ui-store.svelte";
  import Tabs from "$lib/components/ui/Tabs.svelte";
  import Separator from "$lib/components/ui/Separator.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import PlaceholderPanel from "./PlaceholderPanel.svelte";
  import ContextPanel from "./ContextPanel.svelte";
  import { X } from "lucide-svelte";

  const tabs = [
    { id: "steps", label: "步骤" },
    { id: "plan", label: "计划" },
    { id: "files", label: "文件" },
    { id: "context", label: "上下文" },
    { id: "skills", label: "技能" },
  ];

  function handleTabChange(tabId: string) {
    uiStore.rightPanelTab = tabId as RightPanelTab;
  }
</script>

<aside class="flex flex-col h-full w-72 border-l bg-background">
  <!-- Header -->
  <div class="flex items-center justify-between px-3 h-12 shrink-0">
    <span class="text-sm font-semibold">面板</span>
    <Button variant="ghost" size="icon" onclick={() => (uiStore.rightPanelOpen = false)}>
      <X class="h-4 w-4" />
    </Button>
  </div>

  <Separator />

  <!-- Tabs -->
  <Tabs {tabs} activeTab={uiStore.rightPanelTab} onchange={handleTabChange}>
    {#if uiStore.rightPanelTab === "steps"}
      <PlaceholderPanel title="执行步骤" description="Agent 工具调用的历史记录将在此显示" />
    {:else if uiStore.rightPanelTab === "plan"}
      <PlaceholderPanel title="任务计划" description="任务规划和执行跟踪将在此显示" />
    {:else if uiStore.rightPanelTab === "files"}
      <PlaceholderPanel title="文件浏览" description="项目文件树将在此显示" />
    {:else if uiStore.rightPanelTab === "context"}
      <ContextPanel />
    {:else if uiStore.rightPanelTab === "skills"}
      <PlaceholderPanel title="可用技能" description="Agent 可用技能列表将在此显示" />
    {/if}
  </Tabs>
</aside>
