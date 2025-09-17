import React, { useState } from "react";

import "easymde/dist/easymde.min.css";
import { ArticleModal } from "./ArticleModal";
import type { ArticleType } from "../pages/ListPost";
import axios from "axios";
import Swal from "sweetalert2";
type Prop = {
  articles : ArticleType[]
  setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>;
}
export const AddArticle = ({articles,setArticles}:Prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const addArticle = async(article: Omit<ArticleType, "id">)=>{
    try {
      const res = await axios.post("http://localhost:8080/articles", article)
      if(res.status === 201){
        Swal.fire("✅Thêm thành công");
        setArticles([
          ...articles,
          res.data
        ])
      }
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <div>
      <button
        onClick={showModal}
        className="text-white bg-blue-600 py-1 px-3 rounded cursor-pointer">
        Thêm mới bài viết
      </button>
   <ArticleModal open={isModalOpen} onClose={()=>setIsModalOpen(false)} interaction="add" onSubmit={addArticle} />
    </div>
  );
};
