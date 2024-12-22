/**
 * Generates a unique company ID with a specific format: CMP-XXXXX
 * where X is an alphanumeric character
 */
export function generateCompanyId(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const idLength = 5;
  let result = 'CMP-';
  
  for (let i = 0; i < idLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}