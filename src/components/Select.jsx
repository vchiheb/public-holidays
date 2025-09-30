import './Select.css';

export default function Select({data, onSelectChange}) {

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


function CountryOption({item}) {

  return (
      <option value={item.isoCode} className="text-slate-500">{item.name[0].text}</option>
  )

}