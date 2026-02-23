<script lang="ts">
  import { Construction } from "lucide-svelte";

  interface Props {
    title: string;
    description?: string;
  }

  let { title, description = "功能开发中，敬请期待..." }: Props = $props();
</script>

<div class="flex flex-col items-center justify-center h-full text-muted-foreground gap-3 p-6">
  <Construction class="h-10 w-10 opacity-40" />
  <div class="text-center space-y-1">
    <h4 class="text-sm font-medium text-foreground">{title}</h4>
    <p class="text-xs">{description}</p>
  </div>
</div>
