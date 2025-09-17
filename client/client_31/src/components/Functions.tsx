import React from 'react'

export const Functions = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
    <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-1 rounded">
      Chặn
    </button>
    <button className="bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium px-4 py-1 rounded border border-orange-200">
      Sửa
    </button>
    <button className="bg-red-100 hover:bg-red-200 text-red-600 font-medium px-4 py-1 rounded border border-red-200">
      Xóa
    </button>
  </div>
  )
}
