import { clsx } from 'clsx';
import { Task } from '../../types';

interface TaskStatusBadgeProps {
  status: Task['status'];
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  return (
    <span
      className={clsx(
        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
        {
          'bg-yellow-100 text-yellow-800': status === 'pending',
          'bg-blue-100 text-blue-800': status === 'in_progress',
          'bg-green-100 text-green-800': status === 'completed',
        }
      )}
    >
      {status.replace('_', ' ')}
    </span>
  );
}