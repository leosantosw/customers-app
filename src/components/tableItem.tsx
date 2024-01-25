import { formatDistance } from '../utils/format-distance'

interface CustumerProps {
  name: string
  email: string
  telephone: string
  coordinate_x: number | string
  coordinate_y: number | string
  distance?: number | string
}
export const TableItem = ({
  name,
  email,
  telephone,
  coordinate_x,
  coordinate_y,
  distance,
}: CustumerProps) => {
  return (
    <>
      <tr className="odd:bg-gray-600 even:bg-gray-50 even:dark:bg-gray-400 border-b dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name}
        </th>
        <td className="px-6 py-4">{email}</td>
        <td className="px-6 py-4">{telephone}</td>
        <td className="px-6 py-4">{coordinate_x}</td>
        <td className="px-6 py-4">{coordinate_y}</td>
        {distance && (
          <td className="px-6 py-4">{formatDistance(Number(distance))}</td>
        )}
      </tr>
    </>
  )
}
