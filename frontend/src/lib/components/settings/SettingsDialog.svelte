<script lang="ts">
  import { uiStore, type Theme } from "$lib/stores/ui-store.svelte";
  import Dialog from "$lib/components/ui/Dialog.svelte";
  import Label from "$lib/components/ui/Label.svelte";
  import Select from "$lib/components/ui/Select.svelte";
  import Separator from "$lib/components/ui/Separator.svelte";
  import Input from "$lib/components/ui/Input.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import ScrollArea from "$lib/components/ui/ScrollArea.svelte";
  import { Settings } from "lucide-svelte";

  const themeOptions = [
    { value: "light", label: "浅色" },
    { value: "dark", label: "深色" },
    { value: "system", label: "System" },
  ];

  const providerOptions = [
    { value: "routin", label: "Routin AI" },
  ];

  const modelOptions = [
    { value: "gpt-4o", label: "GPT-4o" },
  ];

  let temperature = $state(0.7);
  let maxTokens = $state(128000);

  function handleThemeChange(value: string) {
    uiStore.theme = value as Theme;
  }
</script>

<Dialog bind:open={uiStore.settingsOpen} title="快速设置" description="快速切换模型和调整参数">
  <ScrollArea class="max-h-[60vh]">
    <div class="space-y-6 py-4 pr-3">
      <!-- AI Provider -->
      <div class="space-y-2">
        <Label>AI 服务商</Label>
        <Select
          options={providerOptions}
          value="routin"
          onchange={() => {}}
        />
      </div>

      <!-- Model -->
      <div class="space-y-2">
        <Label>模型</Label>
        <Select
          options={modelOptions}
          value="gpt-4o"
          onchange={() => {}}
        />
      </div>

      <!-- Fast Model -->
      <div class="space-y-2">
        <Label>快速模型</Label>
        <p class="text-xs text-muted-foreground">用于标题生成和子代理任务</p>
        <Select
          options={modelOptions}
          value="gpt-4o"
          onchange={() => {}}
        />
      </div>

      <Separator />

      <!-- Temperature -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <Label>Temperature</Label>
          <span class="text-sm text-muted-foreground">{temperature}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="2" 
          step="0.1" 
          bind:value={temperature}
          class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary mb-3"
        />
      </div>

      <!-- Max Tokens -->
      <div class="space-y-2">
        <Label>最大 Token 数</Label>
        <Input type="number" bind:value={maxTokens} />
        <div class="flex gap-2 mt-2">
          {#each [8000, 16000, 31000, 63000, 125000] as tokens}
            <button 
              class="px-2 py-1 text-xs rounded-md transition-colors {maxTokens === tokens ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}"
              onclick={() => maxTokens = tokens}
            >
              {tokens >= 1000 ? `${Math.round(tokens/1000)}K` : tokens}
            </button>
          {/each}
        </div>
      </div>

      <Separator />

      <!-- Theme -->
      <div class="space-y-2">
        <Label>主题</Label>
        <Select
          options={themeOptions}
          value={uiStore.theme}
          onchange={handleThemeChange}
        />
      </div>

      <Separator />

      <!-- Open Full Settings -->
      <div class="flex justify-center">
        <Button variant="ghost" size="sm" class="text-muted-foreground hover:text-foreground">
          <Settings class="h-4 w-4 mr-2" />
          打开完整设置
        </Button>
      </div>
    </div>
  </ScrollArea>
</Dialog>
