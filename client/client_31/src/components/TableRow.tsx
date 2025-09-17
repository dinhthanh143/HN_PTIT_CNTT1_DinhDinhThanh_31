import React, { useState } from "react";
import type { ArticleType } from "../pages/ListPost";
import { ArticleModal } from "./ArticleModal";
import axios from "axios";
import Swal from "sweetalert2";
type Prop = {
  id: number;
  article: ArticleType;
  stt: number;
  blockArticle: (id: number) => void;
  deleteArticle: (id: number) => void;
  setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>;
};
export const TableRow = ({
  article,
  stt,
  blockArticle,
  deleteArticle,
  id,
  setArticles
}: Prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const publishedStyle: React.CSSProperties = {
    border: "1px solid #4cb050",
    borderRadius: "5px",
    backgroundColor: "rgb(246, 255, 240)",
    color: "#4cb050",
    padding: "2px 13px",
  };
  const UnpublishedStyle: React.CSSProperties = {
    border: "1px solid rgb(232, 76, 61)",
    borderRadius: "5px",
    backgroundColor: "rgb(254, 230, 230)",
    color: "rgb(232, 76, 61)",
    padding: "2px 5px",
  };
  const fixArticle = async (article: Omit<ArticleType, "id">) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/articles/${id}`,
        article
      );
      if (res.status === 200) {
        setArticles(prev =>
          prev.map(a  => a.id === id? {...a,... article } : a)
        )
        Swal.fire("Sửa thành công!", "", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr>
      <td className="border border-gray-300 px-4 py-2">{stt}</td>
      <td className="border border-gray-300 px-4 py-2">{article.title}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <img
          src={article.image}
          className="text-center w-10 rounded-full"
          alt="image"
        />
      </td>
      <td className="border border-gray-300 px-4 py-2">{article.date}</td>
      <td className="border border-gray-300 px-4 py-2">
        <span
          style={
            article.status === "Published" ? publishedStyle : UnpublishedStyle
          }>
          {article.status === "Published" ? "Đã xuất bản" : "Chưa xuất bản"}
        </span>
      </td>
      <td className="border border-gray-300 px-4 py-2 flex justify-around border-b-0 h-[100%]">
        <div className="flex justify-center items-center space-x-2 border-0">
          <button
            onClick={() => blockArticle(article.id)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-1 rounded border-0">
            Chặn
          </button>
          <button
            onClick={showModal}
            className="bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium px-4 py-1 rounded  border-orange-200 border-0">
            Sửa
          </button>
          <button
            onClick={() => deleteArticle(article.id)}
            className="bg-red-100 hover:bg-red-200 text-red-600 font-medium px-4 py-1 rounded  border-red-200 border-0">
            Xóa
          </button>
        </div>
      </td>
      <ArticleModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        interaction="fix"
        onSubmit={fixArticle}
        article={article}
      />
    </tr>
  );
};
