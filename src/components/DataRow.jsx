
export default function DataRow({item}) {
  const date = new Date(item.startDate);
  return (
 <tr>
          <td>{date.toDateString()}</td>
          <td>{item.name.filter(name => name.language === "EN").map(it => it.text)}</td>
        </tr>
  )       
}