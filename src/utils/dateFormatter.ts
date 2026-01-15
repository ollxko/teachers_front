export const formatDate = (dateString: string | undefined): string => {
  if (dateString === undefined) {
    return ' дата не найдена';
  }
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
