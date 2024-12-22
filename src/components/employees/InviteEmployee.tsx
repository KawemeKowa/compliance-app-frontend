import { useState } from 'react';
import { inviteEmployee } from '../../services/company';
import { AuthButton } from '../auth/AuthButton';
import { AuthInput } from '../auth/AuthInput';
import { toast } from 'react-hot-toast';

interface InviteEmployeeProps {
  companyId: string;
}

export function InviteEmployee({ companyId }: InviteEmployeeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await inviteEmployee(companyId, email);
      setIsOpen(false);
      setEmail('');
      toast.success('Invitation sent successfully');
    } catch (error) {
      toast.error('Failed to send invitation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AuthButton onClick={() => setIsOpen(!isOpen)}>
        Invite Employee
      </AuthButton>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Invite Employee</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  Send Invitation
                </AuthButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}