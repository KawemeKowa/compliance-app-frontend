import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getCompanyById } from '../services/company';
import { getCompanyTasks } from '../services/tasks';
import { Company, Task } from '../types';
import { CreateCompany } from '../components/company/CreateCompany';
import { CompanyDashboard } from '../components/company/CompanyDashboard';
import { TaskList } from '../components/tasks/TaskList';
import { UserMenu } from '../components/layout/UserMenu';
import { toast } from 'react-hot-toast';

export function Dashboard() {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        let companyData = null;
        let tasksData: Task[] = [];

        if (user?.company) {
          try {
            companyData = await getCompanyById(user.company);
          } catch (error) {
            console.error('Error loading company:', error);
            // Don't throw here, just continue with null company
          }
        }

        // Load tasks regardless of company status
        try {
          tasksData = await getCompanyTasks(user?.company || 'all');
        } catch (error) {
          console.error('Error loading tasks:', error);
          toast.error('Failed to load tasks');
          throw error;
        }

        setCompany(companyData);
        setTasks(tasksData);
        setLoadingError(null);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadingError('Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (loadingError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{loadingError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!company && user?.role === 'admin') {
    return <CreateCompany />;
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
              <UserMenu />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Available Tasks</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Here are all available tasks in the system.
                  </p>
                </div>
              </div>
            </div>
            <TaskList 
              tasks={tasks} 
              employees={[]} 
              isAdmin={false}
              showCompanyName={true}
            />
          </div>
        </main>
      </div>
    );
  }

  return <CompanyDashboard company={company} />;
}