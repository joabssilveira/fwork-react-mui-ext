import { AutocompleteClientComponentExample } from "./autoCompleteClient"

interface IPost {
  "userId": number,
  "id": number,
  "title": string,
  "body": string,
}

export const AppExample = () => {
  return <div style={{ padding: 20, fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"' }}>
    <AutocompleteClientComponentExample />
  </div>
}
