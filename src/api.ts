import { Holiday } from './types';

export const fetchHolidays = async (): Promise<Holiday[]> => {
  const apiKey = '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx';
  const country = 'PL';
  const year = '2023';
  const type = 'major_holiday';

  const url = `https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}&type=${type}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': apiKey
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching holidays:', error);
    throw new Error('Error fetching holidays');
  }
};