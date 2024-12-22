import { Task } from '../../types';

interface TaskProgressProps {
  tasks: Task[];
}

export function TaskProgress({ tasks }: TaskProgressProps) {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'completed').length;
  const inProgress = tasks.filter(task => task.status === 'in_progress').length;
  const pending = tasks.filter(task => task.status === 'pending').length;

  const calculatePercentage = (count: number) => {
    return total === 0 ? 0 : Math.round((count / total) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="rounded-md bg-blue-100 p-3">
              <div className="w-6 h-6 border-2 border-blue-600 rounded-full"></div>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">In Progress</h3>
            <div className="mt-1">
              <p className="text-2xl font-semibold text-blue-600">
                {calculatePercentage(inProgress)}%
              </p>
              <p className="text-sm text-gray-500">{inProgress} tasks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="rounded-md bg-green-100 p-3">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Completed</h3>
            <div className="mt-1">
              <p className="text-2xl font-semibold text-green-600">
                {calculatePercentage(completed)}%
              </p>
              <p className="text-sm text-gray-500">{completed} tasks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="rounded-md bg-yellow-100 p-3">
              <div className="w-6 h-6 border-2 border-yellow-600 rounded-full border-dashed"></div>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Pending</h3>
            <div className="mt-1">
              <p className="text-2xl font-semibold text-yellow-600">
                {calculatePercentage(pending)}%
              </p>
              <p className="text-sm text-gray-500">{pending} tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}