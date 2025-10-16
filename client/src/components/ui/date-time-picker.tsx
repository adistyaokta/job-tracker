/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface DateTimeValue {
  date?: any;
  time?: any;
}

interface DateTimePickerProps {
  value?: DateTimeValue;
  onChange?: (value: DateTimeValue) => void;
  dateLabel?: string;
  timeLabel?: string;
  dateId?: string;
  timeId?: string;
  showLabel?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  dateLabel = 'Date',
  timeLabel = 'Time',
  dateId = 'date-picker',
  timeId = 'time-picker',
  showLabel = true,
}: DateTimePickerProps) {
  console.log('🚀 ~ DateTimePicker ~ value:', value);
  const [open, setOpen] = React.useState(false);
  const internalDate = value?.date;
  const internalTime = value?.time;

  return (
    <div className='flex gap-4'>
      <div className='flex flex-col gap-2 grow'>
        {showLabel && (
          <Label htmlFor={dateId} className='px-1'>
            {dateLabel}
          </Label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              id={dateId}
              className='w-full justify-between font-normal'
            >
              {internalDate ? internalDate.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
            <Calendar
              mode='single'
              selected={internalDate}
              captionLayout='dropdown'
              onSelect={(date) => {
                onChange?.({ time: internalTime, date });
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex flex-col gap-2 grow'>
        {showLabel && (
          <Label htmlFor={timeId} className='px-1'>
            {timeLabel}
          </Label>
        )}
        <Input
          type='time'
          id={timeId}
          step='1'
          value={internalTime}
          onChange={(e) => {
            console.log(e.target.value);

            onChange?.({ date: internalDate, time: e.target.value });
          }}
          className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
        />
      </div>
    </div>
  );
}
