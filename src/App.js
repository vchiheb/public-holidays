import './App.css';
import { useState, useEffect } from 'react';

const API_URL = 'https://openholidaysapi.org';

function Header() {
  return (
    <header className="justify-left container py-5 text-left">
      <h1 className="text-slate-500 w-100 text-left justify-left text-3xl">Public Holidays</h1>
    </header>
  )
}

function CountryOption({item}) {

  return (
      <option value={item.isoCode} className="text-slate-500">{item.name[0].text}</option>
  )

}

function CountriesSelect({data, onSelectChange}) {

  if (data.length > 0) {
    return (
      <div className="container">
        <select id="select-country" onChange={onSelectChange} className="focus:outline-none border focus:border text-slate-500 py-5 w-64 my-5">
          <option value="0" className="text-slate-500" >Select a country...</option>
        {data.map((item, index) => (<CountryOption key={index} item={item} ></CountryOption>))}
        </select>
      </div>
    )
  } else {
    return (
      <p>Loading...</p>

    )
  }
}

function PublicHoliday({item}) {
  const date = new Date(item.startDate);
  return (
 <tr>
          <td className="border border-slate-300 p-3">{date.toDateString()}</td>
          <td className="border border-slate-300 p-3">{item.name.filter(name => name.language === "EN").map(it => it.text)}</td>
        </tr>
  )       
}

function PublicHolidays({data}) {

  return (
    <div className='container'>
      {(
        data.length === 0) && 
      <p className="text-slate-500">Please select a country.</p>}
      
      <table className="border-spacing-2 border table-auto w-128 rounded">
        <thead>
          <tr>
            <th className="border border-white-300 p-3 w-64 bg-slate-300">Date</th>
            <th className="border border-white-300 p-3 w-64 bg-slate-300">Holiday</th>
          </tr>
        </thead>
        <tbody>
        {data.filter(item => item.nationwide).map((item, index) =>
          <PublicHoliday key={index} item={item}/>)
        }
        </tbody>
      </table>
    </div>
  )
}


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
      <CountriesSelect data={items} onSelectChange={onSelectChange}/>
      {publicHolidays.length > 0 &&
        <PublicHolidays data={publicHolidays} />
      }
    </>
  );
}

export default App;
