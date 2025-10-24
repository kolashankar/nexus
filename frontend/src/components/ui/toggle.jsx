'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover=on]=on],
  {
    variants
      variant
        default,
        outline
          'border border-input bg-transparent shadow-sm hover,
      },
      size
        default,
        sm,
        lg,
      },
    },
    defaultVariants
      variant: "default",
      size,
    },
  }
);

const Toggle = React.forwardRef(({ className, variant: "default", size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant: "default", size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
