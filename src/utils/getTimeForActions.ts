import moment, { Moment } from 'moment';
import { DateArray } from 'ics';

export type DateTime = {
  day: number;
  hour: number;
  minute: number;
};

export type DateType = {
  day: number;
  month: number;
  year: number;
};

export const getMomentByStartDate = (date: string): Moment => moment(date.split('.').reverse().join('-'));

export const getDateArrayByStartAndShift = (start: string, shift: DateTime): DateArray => {
  const raw = getMomentByStartDate(start);
  raw.add(shift.day, 'day').add(shift.hour, 'hour').add(shift.minute, 'minute');
  return [raw.year(), raw.month(), raw.date(), raw.hour(), raw.minute()];
};

export type Time = Omit<DateTime, 'day'>;

export type DateTimeRange = [Time, Time];

export const getMinutesFromString = (time: string): number => {
  const [hours, minutes] = time.split(':').map((i) => i.replace(/^0/, ''));
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

export const getDateTimeFromString = (time: string): DateTime => {
  const [hours, minutes] = time.split(':').map((i) => i.replace(/^0/, ''));
  return {
    day: 0,
    hour: parseInt(hours, 10),
    minute: parseInt(minutes, 10),
  };
};

export const getDateFromString = (date: string): DateType => {
  const [day, month, year] = date.split('.').map((i) => i.replace(/^0/, ''));
  return {
    day: parseInt(day, 10),
    month: parseInt(month, 10),
    year: parseInt(year, 10),
  };
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

export const getStringFromDateTime = (time: DateTime): string =>
  `${getTwoDigit(time.hour)}:${getTwoDigit(time.minute)}`;

export const getDays = (minutes: number): number => Math.floor(minutes / (24 * 60));

export const numberToDateTime = (minutes: number): DateTime => {
  const day = getDays(minutes);
  const hour = Math.floor((minutes % (24 * 60)) / 60);
  const minute = minutes % 60;
  return { day, hour, minute };
};

export const dateTimeToNumber = (value: Partial<DateTime>): number =>
  (value.day || 0) * 24 * 60 + (value.hour || 0) * 60 + (value.minute || 0);

export const daysToMinutes = (days: number): number => days * 60 * 24;

export const createGetDateTimeBySleepTime =
  (sleepTime?: DateTimeRange) =>
  (value: number): number => {
    if (!sleepTime) return value;
    const gte = dateTimeToNumber(sleepTime[0]);
    const lte = dateTimeToNumber(sleepTime[1]);
    const _gte = gte > lte ? gte - 24 * 60 : gte;
    const days = getDays(value);
    const { hour, minute } = numberToDateTime(value);
    const number = dateTimeToNumber({ hour, minute });
    if (_gte <= number && number < lte) return lte + number - _gte + daysToMinutes(days);
    return value;
  };

export const getTimeForActions =
  (start: DateTime) =>
  (sizes: number[], interval: DateTime, sleepTime?: DateTimeRange): DateTime[] => {
    const getDateTimeBySleepTime = createGetDateTimeBySleepTime(sleepTime);
    const result: number[] = [getDateTimeBySleepTime(dateTimeToNumber(start))];
    const intervalValue = dateTimeToNumber(interval);
    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];
      result.push(getDateTimeBySleepTime(size * intervalValue + result[i]));
    }
    return result.map(numberToDateTime);
  };
