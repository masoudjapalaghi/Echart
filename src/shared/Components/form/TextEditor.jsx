import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// Styles
import "react-quill/dist/quill.snow.css";
import Styles from "./form.module.css";
// import react-quill
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
});
export const TextEditor = ({
  name = "textEditor",
  defaultValue,
  title = "توضیحات",
  width = "w-full lg:w-[500px]",
  className,
}) => {
  const [textEditoreValue, setTextEditoreValue] = useState("");
  useEffect(() => {
    setTextEditoreValue(defaultValue);
  }, [defaultValue]);
  const modules = {
    toolbar: [
      [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",

        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        ,
        "",
        { size: [] },
        "",
        "link",
        "clean",
      ],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const handleChange = (value) => {
    setTextEditoreValue(value);
  };
  return (
    <div className={`${Styles.text_editor} flex flex-col gap-2 ${width}`}>
      <label className="text-xs w-full px-1 ">{title}</label>
      <QuillNoSSRWrapper
        className={`${className}`}
        theme="snow"
        modules={modules}
        formats={formats}
        value={textEditoreValue}
        onChange={handleChange}
      />
      <input
        className="hidden"
        required
        readOnly
        value={textEditoreValue}
        name={name}
        onInvalid={(e) => {
          e.target.setCustomValidity(" ");
          if (!e.target.validity.valid) {
            e.target.setCustomValidity(" ");
          }
        }}
      />
      <p class="invisible peer-invalid:visible text-red-700 text-xs">لطفا فیلد بالا را پر کنید</p>
    </div>
  );
};
