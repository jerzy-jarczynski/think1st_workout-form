import { Holiday } from './types';

export const fetchHolidays = async (): Promise<Holiday[]> => {
  const apiKey = '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx';
  const country = 'PL';
  const year = '2023'; // Rok jako string

  const url = `https://api-ninjas.com/v1/holidays?country=${country}&year=${year}`;

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
    return data.holidays;
  } catch (error) {
    console.error('Error fetching holidays:', error);
    throw new Error('Error fetching holidays');
  }
};