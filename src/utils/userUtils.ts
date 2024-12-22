/**
 * Generates a unique user ID with a specific format: USR-XXXXX
 * where X is an alphanumeric character
 */
export function generateUserId(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const idLength = 5;
  let result = 'USR-';
  
  for (let i = 0; i < idLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}