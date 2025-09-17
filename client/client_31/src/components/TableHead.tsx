import React from 'react'

export const TableHead = () => {
  return (
     <thead className="bg-gray-100">
    <tr>
      <th className="border border-gray-300 px-4 py-2">STT</th>
      <th className="border border-gray-300 px-4 py-2">Tiêu đề</th>
      <th className="border border-gray-300 px-2 py-2 text-center align-middle">Hình ảnh</th>
      <th className="border border-gray-300 px-7 py-2 text-center">Ngày viết</th>
      <th className="border border-gray-300 px-6 py-2 text-center">Trạng thái</th>
      <th className="border border-gray-300 px-4 py-2 text-center">Chức năng</th>
    </tr>
  </thead>
  )
}
