export function getAge(yearIncorporated: number) {
  const currentYear = new Date().getFullYear();
  return currentYear - yearIncorporated;
}