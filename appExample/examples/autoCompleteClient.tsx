import React, { useState } from "react"
import { AutocompleteClientComponent } from '@lib/autocompleteClient'

interface IPost {
  "userId": number,
  "id": number,
  "title": string,
  "body": string,
}

export const AutocompleteClientComponentExample = () => {
  const [post, setPost] = useState<IPost | null | undefined>(null)

  async function fetchPosts(): Promise<IPost[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) {
      throw new Error('Erro ao buscar posts')
    }
    const data: IPost[] = await response.json()
    return data
  }

  return <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <h2>AutocompleteClientComponent</h2>
    {post != null && <label>{`selected post: ${post?.title}`}</label>}
    <AutocompleteClientComponent
      getOnInit
      fitDropDownWidth
      getOptionLabel={(post: IPost) => {
        return `${post.title} (${post.id})`
      }}
      style={{ width: 200 }}

      inputValueKeyName="title"
      // initKeyValue={undefined}
      onChangeItem={(item?: IPost | null) => {
        setPost(item)
      }}
      onGetData={async (filter: string, key: boolean) => {
        return await fetchPosts()
      }}
      textFieldProps={{
        label: 'Posts',
        placeholder: 'Digite para consultar ou pressione enter para exibir tudo'
      }}
    />
  </div>
}
