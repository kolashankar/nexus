import * from "react"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus,
  {
    variants,
        secondary,
        destructive,
        outline,
        green,
        orange,
        yellow,
      },
    },
    defaultVariants,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes,
    VariantProps {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    
  )
}

export { Badge, badgeVariants }
