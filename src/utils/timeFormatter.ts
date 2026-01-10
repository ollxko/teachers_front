export const formatTime = (rawDate: string | undefined): string => {
  if (rawDate === undefined) {
    return 'время не найдено';
  }

  const date = new Date(rawDate);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
