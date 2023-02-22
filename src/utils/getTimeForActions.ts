export const getMinutesFromString = (time: string): number => {
  const [hours, minutes] = time.split(':').map((i) => i.replace(/^0/, ''));
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

export const getTwoDigit = (digit: number): string => {
  const raw = digit.toString();
  return raw.length === 1 ? `0${raw}` : raw;
};

export const getStringFromMinutes = (minutes: number): string => {
  const hours = Math.floor((minutes % (24 * 60)) / 60);
  const _minutes = minutes % 60;
  return `${getTwoDigit(hours)}:${getTwoDigit(_minutes)}`;
};

export const getTimeForActions = (sizes: number[], timeStart: string, minutesInterval: number): string[] => {
  const result: string[] = [timeStart];
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    result.push(getStringFromMinutes(getMinutesFromString(result[i]) + size * minutesInterval));
  }
  return result;
};
