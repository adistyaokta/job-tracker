import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { JobStatus, statusLabels } from 'shared';
import { useJobStore } from '@/lib/store';

export const FilterStatus = () => {
  const { getJobParams: param, setGetJobParams } = useJobStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='border border-input rounded-md px-2 min-w-20 h-full bg-primary text-primary-foreground'>
        <p className='text-sm'>
          {param.status ? statusLabels[param.status as JobStatus] : 'Status'}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(statusLabels).map(([value, label]) => (
          <DropdownMenuItem
            key={value}
            onClick={() => {
              setGetJobParams({ ...param, status: value });
            }}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
