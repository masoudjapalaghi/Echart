import { useState } from "react";
// Hooks
import useToggle from "@hooks/useToggle";
// Utils
import { reduceFileSize, uuid } from "src/utils";
// Components
import { Img } from "@components/Img";
// import Img from "@components/Img";
// Styles
import styles from "./form.module.css";

export const ImageUploaderDashed = ({ label = "", width = "w-[146px]", id }) => {
  const [preview, setPreview] = useState([]);
  const [updateStatus, setUpdateStatus, updateStatusFalse, updateStatusTrue] = useToggle();
  const saveFileHandler = (event) => {
    const files = event?.target.files;
    var list = new DataTransfer();
    list.items.add(files[0]);
    let listToArray = Array.from(list.files);
    listToArray.forEach((file) => {
      reduceFileSize(file, 1000, 150, 150, 0.7, (blob) => {
        const img = {
          src: blob,
          id: uuid("img"),
        };
        setPreview((prev) => [...prev, img]);
      });
    });
  };
  const onClick = (e) => {
    e.target.value = "";
  };
  const handleDelete = (id) => {
    const filterPreview = preview.filter((item) => item.id !== id);
    setPreview(filterPreview);
    updateStatusFalse();
  };
  return (
    <div className={`flex flex-wrap gap-4`}>
      <input type="file" id={id} onChange={saveFileHandler} className="hidden" onClick={onClick} readOnly />
      <div
        className={`relative  h-[146px] rounded  text-whiteSecondary flex flex-col justify-center items-center ${styles.dashedBorder} ${width}`}
      >
        <label htmlFor={id} className="w-full h-full flex justify-center items-center cursor-pointer">
          <div className="center flex-col  gap-4">
            <i className="fi fi-rr-plus text-[32px] text-gray-400"></i>
            <span className="w-18 text-center text-xs">{label}</span>
          </div>
        </label>
      </div>
      {!updateStatus
        ? preview.map((item, index) => (
            <div
              key={index}
              className="relative bg-white h-[146px] w-[146px] rounded flex justify-center items-center p-3"
            >
              <i
                onClick={() => handleDelete(item.id)}
                className="fi fi-rr-trash cursor-pointer absolute top-0.5 right-6 bg-gray-400 text-white rounded p-0.5  z-10"
              ></i>
              <Img
                layout="fill"
                objectFit="contain"
                pw="w-32"
                ph="h-24"
                src={URL.createObjectURL(item.src)}
                alt="upload"
              />
            </div>
          ))
        : defaultImages.map((item, index) => (
            <div key={index} className="relative bg-white rounded flex justify-center items-center">
              <i
                onClick={handleDelete}
                className="fi fi-rr-trash cursor-pointer absolute top-0.5 right-6 bg-gray-400 text-white rounded p-0.5  z-10"
              ></i>
              <Img layout="fill" objectFit="contain" pw="w-32" ph="h-24" src={item} alt="upload" />
            </div>
          ))}
    </div>
  );
};
