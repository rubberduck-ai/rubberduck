<script lang="ts">
  import { chatStore } from "$lib/stores/chat-store.svelte";
  import Separator from "$lib/components/ui/Separator.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import { Info } from "lucide-svelte";

  let session = $derived(chatStore.activeSession);
</script>

<div class="p-4 space-y-4">
  <div class="flex items-center gap-2 text-sm font-medium">
    <Info class="h-4 w-4" />
    <span>会话信息</span>
  </div>

  <Separator />

  {#if session}
    <div class="space-y-3">
      <div class="space-y-1">
        <p class="text-xs text-muted-foreground">会话标题</p>
        <p class="text-sm">{session.title}</p>
      </div>

      <div class="space-y-1">
        <p class="text-xs text-muted-foreground">消息数量</p>
        <div class="flex gap-2">
          <Badge variant="secondary">
            {#snippet children()}
              {session.messages.filter((m) => m.role === "user").length} 条用户消息
            {/snippet}
          </Badge>
          <Badge variant="secondary">
            {#snippet children()}
              {session.messages.filter((m) => m.role === "assistant").length} 条回复
            {/snippet}
          </Badge>
        </div>
      </div>

      <div class="space-y-1">
        <p class="text-xs text-muted-foreground">创建时间</p>
        <p class="text-sm">{new Date(session.createdAt).toLocaleString("zh-CN")}</p>
      </div>

      <div class="space-y-1">
        <p class="text-xs text-muted-foreground">最后更新</p>
        <p class="text-sm">{new Date(session.updatedAt).toLocaleString("zh-CN")}</p>
      </div>

      <Separator />

      <div class="space-y-1">
        <p class="text-xs text-muted-foreground">模型</p>
        <Badge variant="outline">
          {#snippet children()}
            Rubber Duck (Stub)
          {/snippet}
        </Badge>
      </div>

      <div class="space-y-1">
        <p class="text-xs text-muted-foreground">后端状态</p>
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-green-500"></span>
          <span class="text-sm">已连接</span>
        </div>
      </div>
    </div>
  {:else}
    <p class="text-sm text-muted-foreground">暂无活动会话</p>
  {/if}
</div>
