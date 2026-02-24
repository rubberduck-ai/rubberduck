<script lang="ts">
  import { uiStore, type RightPanelTab } from "$lib/stores/ui-store.svelte";
  import Tabs from "$lib/components/ui/Tabs.svelte";
  import PlaceholderPanel from "./PlaceholderPanel.svelte";

  const tabs = [
    { id: "steps", label: "步骤" },
    { id: "files", label: "文件" },
    { id: "artifacts", label: "产物" },
    { id: "context", label: "上下文" },
    { id: "skills", label: "技能" },
    { id: "timer", label: "定时" },
  ];

  function handleTabChange(tabId: string) {
    uiStore.rightPanelTab = tabId as RightPanelTab;
  }
</script>

<aside class="flex flex-col h-full w-80 border-l bg-background">
  <Tabs {tabs} activeTab={uiStore.rightPanelTab} onchange={handleTabChange}>
    {#if uiStore.rightPanelTab === "steps"}
      <PlaceholderPanel title="执行步骤" description="Agent 工具调用的历史记录将在此显示" />
    {:else if uiStore.rightPanelTab === "files"}
      <PlaceholderPanel title="文件浏览" description="项目文件树将在此显示" />
    {:else if uiStore.rightPanelTab === "artifacts"}
      <PlaceholderPanel title="产物" description="生成的产物将在此显示" />
    {:else if uiStore.rightPanelTab === "context"}
      <PlaceholderPanel title="上下文" description="会话上下文信息将在此显示" />
    {:else if uiStore.rightPanelTab === "skills"}
      <PlaceholderPanel title="可用技能" description="Agent 可用技能列表将在此显示" />
    {:else if uiStore.rightPanelTab === "timer"}
      <PlaceholderPanel title="定时任务" description="定时执行的任务将在此显示" />
    {/if}
  </Tabs>
</aside>
