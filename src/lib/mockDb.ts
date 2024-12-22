import { User, Company, Task, CompanyInvite } from '../types';
import { generateUserId } from '../utils/userUtils';
import { generateCompanyId } from '../utils/companyUtils';

class MockDatabase {
  private users: Map<string, User>;
  private companies: Map<string, Company>;
  private tasks: Map<string, Task>;
  private invites: Map<string, CompanyInvite>;
  private static instance: MockDatabase;

  private constructor() {
    this.users = new Map();
    this.companies = new Map();
    this.tasks = new Map();
    this.invites = new Map();
    this.loadFromStorage();
  }

  static getInstance(): MockDatabase {
    if (!MockDatabase.instance) {
      MockDatabase.instance = new MockDatabase();
    }
    return MockDatabase.instance;
  }

  private loadFromStorage(): void {
    try {
      const storedData = localStorage.getItem('mockDb');
      if (storedData) {
        const data = JSON.parse(storedData);
        this.users = new Map(Object.entries(data.users || {}));
        this.companies = new Map(Object.entries(data.companies || {}));
        this.tasks = new Map(Object.entries(data.tasks || {}));
        this.invites = new Map(Object.entries(data.invites || {}));
      } else {
        // Initialize with seed data if no stored data exists
        this.initializeSeedData();
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
      this.initializeSeedData();
    }
  }

  private saveToStorage(): void {
    try {
      const data = {
        users: Object.fromEntries(this.users),
        companies: Object.fromEntries(this.companies),
        tasks: Object.fromEntries(this.tasks),
        invites: Object.fromEntries(this.invites)
      };
      localStorage.setItem('mockDb', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  private async initializeSeedData(): Promise<void> {
    // Create a test company
    const companyId = generateCompanyId();
    const adminId = generateUserId();

    const company: Company = {
      id: companyId,
      name: 'Test Company',
      adminId,
      createdAt: new Date().toISOString()
    };

    // Create an admin user
    const adminUser: User = {
      id: adminId,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      company: companyId,
      role: 'admin'
    };

    // Create an employee
    const employeeId = generateUserId();
    const employee: User = {
      id: employeeId,
      firstName: 'John',
      lastName: 'Doe',
      email: 'employee@example.com',
      company: companyId,
      role: 'employee'
    };

    // Save users and company
    this.users.set(adminId, adminUser);
    this.users.set(employeeId, employee);
    this.companies.set(companyId, company);

    // Create sample tasks
    const tasks: Task[] = [
      {
        id: 'TSK-1',
        title: 'Website Redesign',
        description: 'Update the company website with new branding guidelines and modern design principles',
        status: 'in_progress',
        assignedTo: employeeId,
        companyId,
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        photoUrl: 'https://placehold.co/600x400/png?text=Website+Mockup'
      },
      {
        id: 'TSK-2',
        title: 'Mobile App Development',
        description: 'Create a new mobile app for customer engagement and loyalty program',
        status: 'pending',
        assignedTo: employeeId,
        companyId,
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        photoUrl: 'https://placehold.co/600x400/png?text=App+Design'
      },
      {
        id: 'TSK-3',
        title: 'Marketing Campaign',
        description: 'Plan and execute Q4 marketing campaign focusing on new product launch',
        status: 'completed',
        assignedTo: employeeId,
        companyId,
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        photoUrl: 'https://placehold.co/600x400/png?text=Campaign+Assets'
      }
    ];

    tasks.forEach(task => this.tasks.set(task.id, task));
    this.saveToStorage();

    console.log('Test data initialized with credentials:', {
      admin: { email: 'admin@example.com', password: 'password' },
      employee: { email: 'employee@example.com', password: 'password' }
    });
  }

  async signIn(email: string, password: string): Promise<User> {
    const user = Array.from(this.users.values()).find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user };
  }

  async signUp(email: string, password: string, userData: Omit<User, 'id'>): Promise<User> {
    const existingUser = Array.from(this.users.values()).find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user: User = {
      id: generateUserId(),
      ...userData
    };

    this.users.set(user.id, user);
    this.saveToStorage();
    return { ...user };
  }

  async createCompany(name: string, adminId: string): Promise<Company> {
    const company: Company = {
      id: generateCompanyId(),
      name,
      adminId,
      createdAt: new Date().toISOString()
    };

    this.companies.set(company.id, company);

    // Update admin user with company ID
    const admin = this.users.get(adminId);
    if (admin) {
      const updatedAdmin = { ...admin, company: company.id };
      this.users.set(adminId, updatedAdmin);
    }

    this.saveToStorage();
    return { ...company };
  }

  async getCompanyById(companyId: string): Promise<Company | null> {
    const company = this.companies.get(companyId);
    return company ? { ...company } : null;
  }

  async getCompanyEmployees(companyId: string): Promise<User[]> {
    return Array.from(this.users.values())
      .filter(user => user.company === companyId)
      .map(user => ({ ...user }));
  }

  async createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const task: Task = {
      id: `TSK-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...taskData
    };

    this.tasks.set(task.id, task);
    this.saveToStorage();
    return { ...task };
  }

  async getCompanyTasks(companyId: string): Promise<Task[]> {
    return Array.from(this.tasks.values())
      .filter(task => task.companyId === companyId)
      .map(task => ({ ...task }));
  }

  async updateTaskStatus(taskId: string, status: Task['status']): Promise<void> {
    const task = this.tasks.get(taskId);
    if (task) {
      const updatedTask = { ...task, status };
      this.tasks.set(taskId, updatedTask);
      this.saveToStorage();
    }
  }

  async signOut(): Promise<void> {
    localStorage.removeItem('currentUser');
  }

  async inviteEmployee(invite: CompanyInvite): Promise<void> {
    this.invites.set(invite.id, invite);
    this.saveToStorage();
  }
}

export const mockDb = MockDatabase.getInstance();