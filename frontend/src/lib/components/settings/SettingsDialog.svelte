<script lang="ts">
  import { uiStore, type Theme } from "$lib/stores/ui-store.svelte";
  import Dialog from "$lib/components/ui/Dialog.svelte";
  import Label from "$lib/components/ui/Label.svelte";
  import Select from "$lib/components/ui/Select.svelte";
  import Separator from "$lib/components/ui/Separator.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";

  const themeOptions = [
    { value: "light", label: "浅色" },
    { value: "dark", label: "深色" },
    { value: "system", label: "跟随系统" },
  ];

  function handleThemeChange(value: string) {
    uiStore.theme = value as Theme;
  }
</script>

<Dialog bind:open={uiStore.settingsOpen} title="设置" description="自定义你的 Rubber Duck 体验">
  <div class="space-y-6 py-4">
    <!-- Theme -->
    <div class="space-y-2">
      <Label>主题</Label>
      <Select
        options={themeOptions}
        value={uiStore.theme}
        onchange={handleThemeChange}
      />
      <p class="text-xs text-muted-foreground">选择应用的外观主题</p>
    </div>

    <Separator />

    <!-- Language -->
    <div class="space-y-2">
      <Label>语言</Label>
      <Select
        options={[{ value: "zh-CN", label: "简体中文" }, { value: "en", label: "English" }]}
        value="zh-CN"
        onchange={() => {}}
      />
      <p class="text-xs text-muted-foreground">界面显示语言（暂未实现）</p>
    </div>

    <Separator />

    <!-- Model -->
    <div class="space-y-2">
      <Label>AI 模型</Label>
      <div class="flex items-center gap-2">
        <Badge variant="outline">
          {#snippet children()}
            Rubber Duck (Stub)
          {/snippet}
        </Badge>
      </div>
      <p class="text-xs text-muted-foreground">当前使用的是本地回声服务，后续将接入 AI 模型</p>
    </div>

    <Separator />

    <!-- About -->
    <div class="space-y-2">
      <Label>关于</Label>
      <div class="text-sm text-muted-foreground space-y-1">
        <p>Rubber Duck v0.1.0</p>
        <p>基于 Wails v3 + Svelte 5 构建</p>
        <p>橡皮鸭调试法 — 把问题说出来，答案自然浮现</p>
      </div>
    </div>
  </div>
</Dialog>
