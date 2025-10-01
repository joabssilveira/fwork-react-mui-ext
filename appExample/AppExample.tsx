import { TableBaseComponentExample } from "./examples/tableBase"
import { AutocompleteClientComponentExample } from "./examples/autoCompleteClient"
import { DateTimeRangeComponentExample } from "./examples/dateTimeRange"

interface IPost {
  "userId": number,
  "id": number,
  "title": string,
  "body": string,
}

export const AppExample = () => {
  return <div style={{ padding: 20, fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"' }}>
    <AutocompleteClientComponentExample />
    <DateTimeRangeComponentExample />
    <TableBaseComponentExample />
  </div>
}
