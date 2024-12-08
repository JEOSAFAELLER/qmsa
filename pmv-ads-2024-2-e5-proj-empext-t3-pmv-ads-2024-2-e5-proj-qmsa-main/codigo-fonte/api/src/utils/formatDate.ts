export default function formatDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-'); // Divide a data em partes
  const formattedDateString = `${year}-${month}-${day}`; // Reformata para YYYY-MM-DD
  return new Date(formattedDateString); // Retorna o novo objeto Date
}
