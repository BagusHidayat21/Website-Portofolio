import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ink-accent-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink-bg",
  {
    variants: {
      variant: {
        default: "bg-ink-fg text-ink-bg hover:bg-ink-fg/90 active:bg-ink-fg/80 shadow-sm",
        destructive:
          "bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 active:bg-red-800 dark:active:bg-red-700 shadow-sm",
        outline:
          "border border-ink-line bg-ink-bg text-ink-fg hover:bg-ink-bg-2 hover:border-ink-fg/30 active:bg-ink-bg-2",
        secondary:
          "bg-ink-bg-2 text-ink-fg hover:bg-ink-fg/10 active:bg-ink-fg/15",
        ghost:
          "text-ink-muted hover:bg-ink-bg-2 hover:text-ink-fg active:bg-ink-bg-2",
        link: "text-ink-fg underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md gap-1.5 px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "size-10",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
