import { mockDb } from '../lib/mockDb';
import type { User } from '../types';

export async function signInWithEmail(email: string, password: string): Promise<User> {
  try {
    const user = await mockDb.signIn(email, password);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
}

export async function signUpWithEmail(
  email: string, 
  password: string, 
  userData: Omit<User, 'id' | 'role'>
): Promise<User> {
  try {
    const user = await mockDb.signUp(email, password, { 
      ...userData, 
      role: 'admin' // New users are admins by default since they'll create a company
    });
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error('Failed to create account');
  }
}

export async function signInWithGoogle(): Promise<User> {
  try {
    const user = await mockDb.signUp('google-user@example.com', 'google-password', {
      firstName: 'Google',
      lastName: 'User',
      email: 'google-user@example.com',
      company: '',
      role: 'admin'
    });
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error('Failed to sign in with Google');
  }
}

export async function signOut(): Promise<void> {
  try {
    await mockDb.signOut();
    localStorage.removeItem('currentUser');
  } catch (error) {
    throw new Error('Failed to sign out');
  }
}