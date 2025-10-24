import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus,
  {
    variants
      variant
        default,
        secondary
          'border-transparent bg-secondary text-secondary-foreground hover,
        destructive
          'border-transparent bg-destructive text-destructive-foreground hover,
        outline,
        green,
        orange,
        yellow,
      },
    },
    defaultVariants
      variant,
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
