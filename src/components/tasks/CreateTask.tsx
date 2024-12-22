import { useState } from 'react';
import { User } from '../../types';
import { createTask } from '../../services/tasks';
import { AuthButton } from '../auth/AuthButton';
import { AuthInput } from '../auth/AuthInput';
import { toast } from 'react-hot-toast';

interface CreateTaskProps {
  companyId: string;
  employees: User[];
}

export function CreateTask({ companyId, employees }: CreateTaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createTask({
        title: formData.title,
        description: formData.description,
        assignedTo: formData.assignedTo || null,
        status: 'pending',
        companyId,
        dueDate: formData.dueDate
      });

      setIsOpen(false);
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: ''
      });
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AuthButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cancel' : 'Create Task'}
      </AuthButton>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Create New Task</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Assign To</label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select Employee</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <AuthInput
                type="date"
                label="Due Date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />

              <div className="flex justify-end space-x-3">
                <AuthButton
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </AuthButton>
                <AuthButton type="submit" isLoading={isLoading}>
                  Create Task
                </AuthButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}