// import React from 'react';

// function App() {
//   return (
//     <div className="App">
//       Hello World!
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { fetchHolidays } from './api';

function App() {
  const handleFetchHolidays = async () => {
    try {
      const holidays = await fetchHolidays();
      console.log('Holidays:', holidays);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <button onClick={handleFetchHolidays}>Fetch Holidays</button>
    </div>
  );
}

export default App;