import { useState, useEffect } from 'react';
import { Company, Task, User } from '../../types';
import { getCompanyEmployees } from '../../services/company';
import { getCompanyTasks } from '../../services/tasks';
import { TaskList } from '../tasks/TaskList';
import { EmployeeList } from '../employees/EmployeeList';
import { InviteEmployee } from '../employees/InviteEmployee';
import { CreateTask } from '../tasks/CreateTask';
import { useAuth } from '../../contexts/AuthContext';
import { TaskProgress } from '../tasks/TaskProgress';
import { UserMenu } from '../layout/UserMenu';

interface CompanyDashboardProps {
  company: Company;
}

export function CompanyDashboard({ company }: CompanyDashboardProps) {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.id === company.adminId;

  useEffect(() => {
    async function loadDashboardData() {
      const [employeesData, tasksData] = await Promise.all([
        getCompanyEmployees(company.id),
        getCompanyTasks(company.id)
      ]);
      setEmployees(employeesData);
      setTasks(tasksData);
      setLoading(false);
    }

    loadDashboardData();
  }, [company.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
              {isAdmin && <InviteEmployee companyId={company.id} />}
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Team Members */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Team Members</h2>
              </div>
              <EmployeeList employees={employees} />
            </div>
          </div>

          {/* Main Content - Tasks */}
          <div className="col-span-12 lg:col-span-9">
            {/* Task Progress */}
            <div className="mb-6">
              <TaskProgress tasks={tasks} />
            </div>

            {/* Tasks List */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Tasks</h2>
                {isAdmin && <CreateTask companyId={company.id} employees={employees} />}
              </div>
              <TaskList 
                tasks={tasks} 
                employees={employees}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}