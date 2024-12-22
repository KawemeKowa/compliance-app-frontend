import { User } from '../../types';

interface EmployeeListProps {
  employees: User[];
}

export function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <ul className="divide-y divide-gray-200">
        {employees.map(employee => (
          <li key={employee.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-600">
                    {employee.firstName[0]}{employee.lastName[0]}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {employee.firstName} {employee.lastName}
                </p>
                <p className="text-sm text-gray-500 truncate">{employee.email}</p>
              </div>
              <div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  employee.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {employee.role}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}