import { useState } from 'react';
import { Task, User } from '../../types';
import { updateTaskStatus } from '../../services/tasks';
import { TaskStatusBadge } from './TaskStatusBadge';

interface TaskListProps {
  tasks: Task[];
  employees: User[];
  isAdmin: boolean;
  showCompanyName?: boolean;
}

export function TaskList({ tasks, employees, isAdmin, showCompanyName }: TaskListProps) {
  const [updating, setUpdating] = useState<string | null>(null);

  const handleStatusUpdate = async (taskId: string, status: Task['status']) => {
    setUpdating(taskId);
    try {
      await updateTaskStatus(taskId, status);
    } finally {
      setUpdating(null);
    }
  };

  const getEmployeeName = (userId: string | null) => {
    if (!userId) return 'Unassigned';
    const employee = employees.find(emp => emp.id === userId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
  };

  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {tasks.map(task => (
          <li key={task.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex justify-between items-start gap-x-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-x-3">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    {task.title}
                  </h3>
                  <TaskStatusBadge status={task.status} />
                </div>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {task.description}
                </p>
                {task.photoUrl && (
                  <div className="mt-2">
                    <img 
                      src={task.photoUrl} 
                      alt={task.title}
                      className="h-32 w-auto rounded-lg object-cover"
                    />
                  </div>
                )}
                <div className="mt-2 flex items-center gap-x-4 text-xs leading-5 text-gray-500">
                  <p>Assigned to: {getEmployeeName(task.assignedTo)}</p>
                  <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  {showCompanyName && (
                    <p>Company ID: {task.companyId}</p>
                  )}
                </div>
              </div>
              {isAdmin && (
                <div className="flex-none">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusUpdate(task.id, e.target.value as Task['status'])}
                    disabled={updating === task.id}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}