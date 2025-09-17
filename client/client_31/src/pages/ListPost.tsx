import React, { useEffect, useState } from "react";
import { Search } from "../components/Search";
import { Filter } from "../components/Filter";
import { AddArticle } from "../components/AddArticle";
import { TableHead } from "../components/TableHead";
import { TableRow } from "../components/TableRow";
import axios from "axios";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { useCallback } from "react";
export type ArticleType = {
  id: number;
  title: string;
  image: string;
  date: string;
  status: string;
  content: string;
};

export const ListPost = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  //fetch data
  const getAllArticles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/articles");
      if (res.status === 200) {
        setArticles(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //search
  const SearchArticle = async (title: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/articles?title_like=${title}`
      );
      if (res.status === 200) {
        setArticles(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      SearchArticle(value);
    }, 500), // 500ms sau khi ngừng gõ mới gọi API
    []
  );

  //filter
  const filterArticle = async (type: string) => {
    try {
      if (type === "Published") {
        const res = await axios.get(
          "http://localhost:8080/articles?status=Published"
        );
        if (res.status === 200) {
          setArticles(res.data);
        }
      } else if (type === "Unpublished") {
        const res = await axios.get(
          "http://localhost:8080/articles?status=Unpublished"
        );
        if (res.status === 200) {
          setArticles(res.data);
        }
      } else {
        const res = await axios.get("http://localhost:8080/articles");
        if (res.status === 200) {
          setArticles(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  //block
  const blockArticle = (id: number, status: string) => {
    Swal.fire({
      title: "Bạn có chắc muốn chặn/huỷ chặn bài viết này?",
      showDenyButton: true,
      confirmButtonText: "Xác nhận",
      denyButtonText: `Huỷ`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:8080/articles/${id}`, {
            status: status === "Published" ? "Unpublished" : "Published",
          })
          .then(() => {
            setArticles((prev) =>
              prev.map((a) =>
                a.id === id
                  ? {
                      ...a,
                      status:
                        status === "Published" ? "Unpublished" : "Published",
                    }
                  : a
              )
            );
            Swal.fire("Chặn thành công!", "", "success");
          })
          .catch((err) => console.log(err));
      }
    });
  };
  //delete
  const deleteArticle = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc muốn xoas bài viết này?",
      showDenyButton: true,
      confirmButtonText: "Xác nhận",
      denyButtonText: `Huỷ`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/articles/${id}`)
          .then(() => {
            setArticles((prev) => prev.filter((a) => a.id !== id));
            Swal.fire("Xoá thành công!", "", "success");
          })
          .catch((err) => console.log(err));
      }
    });
  };
  //goi data khi khoi tao
  useEffect(() => {
    getAllArticles();
  }, []);
  return (
    <div className="flex flex-col m-4  w-[60%] ">
      <div className="flex  justify-between">
        <div className="flex gap-3">
          <Search SearchArticle={debouncedSearch} />
          <Filter filterArticle={filterArticle} />
        </div>
        <AddArticle articles={articles} setArticles={setArticles} />
      </div>
      <table className="table-auto border border-gray-300 border-collapse w-full text-left mt-3">
        <TableHead />
        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                Không có kết quả tìm kiếm
              </td>
            </tr>
          ) : (
            articles.map((a, index) => (
              <TableRow
                key={a.id}
                article={a}
                stt={index + 1}
                blockArticle={blockArticle}
                deleteArticle={deleteArticle}
                setArticles={setArticles}
                id={a.id}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
