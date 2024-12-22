export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: 'admin' | 'employee';
}

export interface Company {
  id: string;
  name: string;
  adminId: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string | null;
  companyId: string;
  createdAt: string;
  dueDate: string;
  photoUrl?: string;
}

export interface CompanyInvite {
  id: string;
  companyId: string;
  email: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}