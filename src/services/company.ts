import { mockDb } from '../lib/mockDb';
import type { Company, CompanyInvite, User } from '../types';

export async function createCompany(name: string, adminId: string): Promise<Company> {
  try {
    const company = await mockDb.createCompany(name, adminId);
    return company;
  } catch (error) {
    console.error('Error creating company:', error);
    throw new Error('Failed to create company');
  }
}

export async function getCompanyById(companyId: string): Promise<Company | null> {
  try {
    return await mockDb.getCompanyById(companyId);
  } catch (error) {
    console.error('Error loading company:', error);
    throw new Error('Failed to load company');
  }
}

export async function getCompanyEmployees(companyId: string): Promise<User[]> {
  try {
    return await mockDb.getCompanyEmployees(companyId);
  } catch (error) {
    console.error('Error loading employees:', error);
    throw new Error('Failed to load employees');
  }
}

export async function inviteEmployee(companyId: string, email: string): Promise<void> {
  const invite: CompanyInvite = {
    id: `INV-${Date.now()}`,
    companyId,
    email,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  try {
    await mockDb.inviteEmployee(invite);
  } catch (error) {
    console.error('Error inviting employee:', error);
    throw new Error('Failed to send invitation');
  }
}