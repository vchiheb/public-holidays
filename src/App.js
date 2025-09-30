import './App.css';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Select from './components/Select';
import Data from './components/Data';


const API_URL = 'https://openholidaysapi.org';

function App() {

  const [items, setItems] = useState([]);
  const [publicHolidays, setPublicHolidays] = useState([]);

  async function fetchData() {
    const url = API_URL + '/Countries';
    const response = await fetch(url);
    const data = await response.json();

    setItems((prevItems) => [...data]);
  }

  async function getPublicHolidays(countryCode) {

    const url = API_URL + '/PublicHolidays?countryIsoCode=' + countryCode + '&validFrom=2025-01-01&validTo=2025-12-31';
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      setPublicHolidays((prevItems) => [...data]);
    } else {
      setPublicHolidays([]);
    }

  }

  function onSelectChange(event) {

    getPublicHolidays(event.target.value);

  }


  useEffect(() => {
    fetchData(); // Load initial data
  }, []);

  

  return (
    <>
      <Header />
      <div id="form">
        <Select data={items} onSelectChange={onSelectChange}/>
        {publicHolidays.length > 0 &&
          <Data data={publicHolidays} />
        }
      </div>
    </>
  );
}

export default App;
