import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import type { ArticleType } from "../pages/ListPost";
import Swal from "sweetalert2";
interface ArticleModalProps {
  open: boolean;
  onClose: () => void;
  interaction: string;
  onSubmit: (article: Omit<ArticleType, "id">, id?:number) => Promise<void>;
  article?: ArticleType;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  open,
  onClose,
  interaction,
  onSubmit,
  article,
}) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const editorRef = useRef<Editor>(null);

  const handleGetContent = (): string => {
    if (editorRef.current) {
      const markdown = editorRef.current.getInstance().getMarkdown();
      return markdown;
    }
    return "";
  };
  const handleOk = () => {
    if (title === "" || image === "" || handleGetContent() === "") {
      Swal.fire("⚠️Dữ liệu không được để trống!");
      return;
    }
    const newArticle: Omit<ArticleType, "id"> = {
      title: title,
      image: image,
      status: "Published",
      date: new Date().toISOString().split("T")[0],
      content: handleGetContent(),
    };
    onSubmit(newArticle);
    setTitle("");
    setImage("");
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(""); // reset nội dung editor
    }
    onClose();
  };

  const handleRefresh = () => {
    setTitle("");
    setImage("");
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(""); // reset nội dung editor
    }
  };
  const handleCancel = () => {
    setTitle("");
    setImage("");
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(""); // reset nội dung editor
    }
    onClose();
  };
  useEffect(() => {
    if (open) {
      if (article) {
        setTitle(article.title);
        setImage(article.image);
        if (editorRef.current) {
          editorRef.current.getInstance().setMarkdown(article.content || "");
        }
      } else {
        setTitle("");
        setImage("");
        if (editorRef.current) {
          editorRef.current.getInstance().setMarkdown("");
        }
      }
    }
  }, [open, article]);
  return (
    <Modal
      title={interaction === "add" ? "Thêm mới bài viết" : "Cập nhật bài viết"}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="refresh" onClick={handleRefresh}>
          Làm mới
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          {interaction === "add" ? "Xuất bản" : "Cập nhật"}
        </Button>,
      ]}
      className="flex flex-col">
      <div className="flex flex-col gap-3">
        <label htmlFor="title">Tên bài viết</label>
        <input
          id="title"
          type="text"
          className="border border-gray-300 rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tên bài viết"
        />

        <label htmlFor="image">Hình ảnh</label>
        <input
          id="image"
          type="text"
          className="border border-gray-300 rounded p-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Nhập Link Ảnh"
        />

        <label htmlFor="content">Nội dung</label>
        <Editor
          initialValue={article ? article.content : ""}
          ref={editorRef}
          placeholder="Nhập nội dung"
          previewStyle="vertical"
          height="300px"
          useCommandShortcut={true}
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task"],
            ["indent", "outdent"],
            ["table", "image", "link"],
            ["code", "codeblock"],
          ]}
        />
      </div>
    </Modal>
  );
};
