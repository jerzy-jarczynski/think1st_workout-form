import { Holiday } from './types';

export const fetchHolidays = async (): Promise<Holiday[]> => {
  const apiKey = '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx';
  const country = 'PL';
  const year = '2023';
  const types = ['national_holiday', 'observance'];
  const holidays: Holiday[] = [];

  for (const type of types) {
    const url = `https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}&type=${type}`;

    try {
      const response = await fetch(url, {
        headers: {
          'X-Api-Key': apiKey,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const holidaysWithType = data.map((holiday: Holiday) => ({
        ...holiday,
        type,
      }));
      holidays.push(...holidaysWithType);
    } catch (error) {
      console.error(`Error fetching ${type} holidays:`, error);
    }
  }

  return holidays;
};
