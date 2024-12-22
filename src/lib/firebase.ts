// Mock Firebase implementation
class MockFirebase {
  private static instance: MockFirebase;
  
  private constructor() {}

  static getInstance() {
    if (!MockFirebase.instance) {
      MockFirebase.instance = new MockFirebase();
    }
    return MockFirebase.instance;
  }
}

export const app = MockFirebase.getInstance();
export const auth = MockFirebase.getInstance();
export const firestore = MockFirebase.getInstance();