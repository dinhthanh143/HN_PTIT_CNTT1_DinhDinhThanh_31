import { Input } from 'antd'
import React from 'react'
type Prop = {
  SearchArticle: (title:string) => void
}
export const Search = ({SearchArticle}:Prop) => {
  return (
    <Input type="text" className='w-[70%]  rounded' placeholder='Tìm kiếm bài viết'
    onChange={(e) =>SearchArticle(e.target.value)}
    />
  )
}
