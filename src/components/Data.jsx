import DataRow from './DataRow';



export default function Data({data}) {

  return (
    <div className='container'>
      {(
        data.length === 0) && 
      <p>Please select a country.</p>}
      
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Holiday</th>
          </tr>
        </thead>
        <tbody>
        {data.filter(item => item.nationwide).map((item, index) =>
          <DataRow key={index} item={item}/>)
        }
        </tbody>
      </table>
    </div>
  )
}