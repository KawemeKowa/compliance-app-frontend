import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createCompany } from '../../services/company';
import { AuthInput } from '../auth/AuthInput';
import { AuthButton } from '../auth/AuthButton';
import { UserMenu } from '../layout/UserMenu';
import { toast } from 'react-hot-toast';

export function CreateCompany() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const company = await createCompany(companyName, user.id);
      
      // Update user context with new company and role
      const updatedUser = {
        ...user,
        company: company.id,
        role: 'admin' as const
      };
      setUser(updatedUser);
      
      toast.success('Company created successfully!');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error creating company:', error);
      toast.error('Failed to create company');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Create Company</h1>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              placeholder="Enter your company name"
            />
            <AuthButton type="submit" isLoading={isLoading}>
              Create Company
            </AuthButton>
          </form>
        </div>
      </main>
    </div>
  );
}