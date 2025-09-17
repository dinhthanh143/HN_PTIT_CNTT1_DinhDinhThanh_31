import React from "react";
import { Select } from "antd";
type Prop = {
  filterArticle: (type:string)=>Promise<void>
}
export const Filter = ({filterArticle}:Prop) => {
  
  return (
    <Select
      defaultValue="Lọc bài viết"
      style={{ width: 210 }}
      onChange={(type)=> filterArticle(type)}
      options={[
        { value: "All", label: "Tất cả" },
        { value: "Published", label: "Đã xuất bản" },
        { value: "Unpublished", label: "Chưa xuất bản" },
      ]}
    />
  );
};
