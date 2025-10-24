import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months,
        month,
        caption,
        caption_label,
        nav,
        nav_button
          buttonVariants({ variant),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover
        ),
        nav_button_previous,
        nav_button_next,
        table,
        head_row,
        head_cell,
        row,
        cell
          'relative p-0 text-center text-sm focus-within)])])],
          props.mode === 'range'
            ? '[&)])])])]
            )]
        ),
        day
          buttonVariants({ variant),
          'h-8 w-8 p-0 font-normal aria-selected
        ),
        day_range_start,
        day_range_end,
        day_selected
          'bg-primary text-primary-foreground hover,
        day_today,
        day_outside
          'day-outside text-muted-foreground aria-selected,
        day_disabled,
        day_range_middle,
        day_hidden,
        ...classNames,
      }}
      components={{
        IconLeft, ...props }) => (
          <ChevronLeft className={cn('h-4 w-4', className)} {...props} />
        ),
        IconRight, ...props }) => (
          <ChevronRight className={cn('h-4 w-4', className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
