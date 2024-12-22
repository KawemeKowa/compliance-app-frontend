import { mockDb } from '../lib/mockDb';
import { Task } from '../types';

export async function createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  return mockDb.createTask(task);
}

export async function getCompanyTasks(companyId: string): Promise<Task[]> {
  return mockDb.getCompanyTasks(companyId);
}

export async function assignTask(taskId: string, userId: string): Promise<void> {
  return mockDb.updateTaskStatus(taskId, 'in_progress');
}

export async function updateTaskStatus(taskId: string, status: Task['status']): Promise<void> {
  return mockDb.updateTaskStatus(taskId, status);
}