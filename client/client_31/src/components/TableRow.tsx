import React, { useState } from "react";
import type { ArticleType } from "../pages/ListPost";
import { ArticleModal } from "./ArticleModal";
import axios from "axios";
import Swal from "sweetalert2";
type Prop = {
  id: number;
  article: ArticleType;
  stt: number;
  blockArticle: (id: number, status: string) => void;
  deleteArticle: (id: number) => void;
  setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>;
  articles: ArticleType[]
};
export const TableRow = ({
  article,
  stt,
  blockArticle,
  deleteArticle,
  id,
  setArticles,
  articles
}: Prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const badgeBase: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "120px", 
    height: "32px", 
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: 500,
  };

  const publishedStyle: React.CSSProperties = {
    ...badgeBase,
    border: "1px solid #4cb050",
    backgroundColor: "rgb(246, 255, 240)",
    color: "#4cb050",
  };

  const UnpublishedStyle: React.CSSProperties = {
    ...badgeBase,
    border: "1px solid rgb(232, 76, 61)",
    backgroundColor: "rgb(254, 230, 230)",
    color: "rgb(232, 76, 61)",
  };
  const fixArticle = async (article: Omit<ArticleType, "id">) => {
    if (articles.some((a) => a.title === article.title && a.id !== id) ) {
          Swal.fire("⚠️Ten bai viet khong duoc trung!");
    
          return;
        }
    try {
      const res = await axios.put(
        `http://localhost:8080/articles/${id}`,
        article
      );
      if (res.status === 200) {
        setArticles((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ...article } : a))
        );
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
          {article.status === "Published" ? "Đã xuất bản" : "Ngừng xuất bản"}
        </span>
      </td>
      <td className="border border-gray-300 px-4 py-2 flex justify-around border-b-0 h-[100%]">
        <div className="flex justify-center items-center space-x-2 border-0">
          <button
            onClick={() => blockArticle(article.id, article.status)}
            className="w-18 h-10 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded border-0">
            {article.status === "Published" ? "Chặn" : "Bỏ chặn"}
          </button>

          <button
            onClick={showModal}
            className="w-18 h-10 bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium rounded border-0">
            Sửa
          </button>

          <button
            onClick={() => deleteArticle(article.id)}
            className="w-18 h-10 bg-red-100 hover:bg-red-200 text-red-600 font-medium rounded border-0">
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
