<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  type Size = "default" | "sm" | "lg" | "icon";

  interface Props extends HTMLButtonAttributes {
    variant?: Variant;
    size?: Size;
    children?: Snippet;
    class?: string;
  }

  let { variant = "default", size = "default", children, class: className, ...restProps }: Props = $props();

  const variantClasses: Record<Variant, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
    destructive: "bg-destructive text-white hover:bg-destructive/90 shadow-xs",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-xs",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizeClasses: Record<Size, string> = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-6",
    icon: "h-9 w-9",
  };
</script>

<button
  class={cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    className
  )}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</button>
