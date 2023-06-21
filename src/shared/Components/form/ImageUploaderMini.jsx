import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
// Utils
import { reduceFileSize } from "src/utils";
import useToggle from "@hooks/useToggle";
import { UseImagePreview } from "@components/modals";
import { Img } from "@components/Img";

export const ImageUploaderMini = ({
  handleDataTransfer = () => {},
  multiple,
  id="imageUploader",
  initalizeValue,
  update,
  statusFetch,
  initializeDependence,
  uplodedLength = 0,
  counterDelete = 0,
  self = "self-start",
  title = "افزودن تصویر",
  defaultImage = [],
  ...res
}) => {
  const [preview, setPreview] = useState([]);
  const [updateStatus, setUpdateStatus, updateStatusFalse, updateStatusTrue] = useToggle();
  const [jsxModal, setOpenImageModal, setUrl] = UseImagePreview();
  const ImagePrev = (url) => {
    setOpenImageModal(true);
    setUrl(url);
  };
  const saveFileHandler = (event) => {
    const files = event?.target.files;
    let filesLength = files.length;
    let previewLength = preview.length;
    let sumLength = filesLength + previewLength + uplodedLength - counterDelete;
    if (sumLength > 6) {
      toast.warning("  محدودیت تعداد عکس !تعداد 6 عکس قابل انتخاب است");
      return null;
    }

    var list = new DataTransfer();
    if (files.length > 6) {
      for (let i = 0; i < 6; i++) list.items.add(files[i]);
    } else if (files.length === 1) {
      list.items.add(files[0]);
    } else {
      for (let i = 0; i < files.length; i++) list.items.add(files[i]);
    }

    let listToArray = Array.from(list.files);
    listToArray.forEach((file) => {
      reduceFileSize(file, 1000, 150, 150, 0.7, (blob) => {
        setPreview((prev) => [...prev, blob]);
      });
    });
  };
  useEffect(() => {
    // setPreview(defaultImage);
    if (defaultImage.length > 0) {
      updateStatusTrue();
    }
  }, [initializeDependence]);

  useEffect(() => {
    handleDataTransfer(preview);
  }, [preview]);

  const handleDelete = (itemIndex) => {
    updateStatusFalse();
    setPreview([]);
  };

  const onClick = (e) => {
    e.target.value = "";
  };
  return (
    <>
      {jsxModal}
      <input className="hidden" id={id} onClick={onClick} onChange={saveFileHandler} {...res} type="file" />

      <div className={` rounded flex flex-col justify-center items-center w-20 h-20 bg-white`}>
        {updateStatus || preview.length > 0 ? (
          <div className="flex flex-row relative w-14 h-14 ">
            <i onClick={handleDelete} className="fi fi-rr-trash cursor-pointer absolute -top-2 -right-[12px] z-10"></i>
            <Image
              className={`${defaultImage[0] ? "cursor-zoom-in" : "cursor-pointer"}`}
              layout="fill"
              objectFit="contain"
              onClick={() =>
                ImagePrev(updateStatus ? (defaultImage[0] ? defaultImage[0] : "") : URL.createObjectURL(preview[0]))
              }
              src={updateStatus ? (defaultImage[0] ? defaultImage[0] : "") : URL.createObjectURL(preview[0])}
              alt="upload"
            />
          </div>
        ) : (
          <label className="w-full h-full flex flex-col justify-center" htmlFor={id} onClick={handleDelete}>
            <div className="flex flex-col justify-center items-center cursor-pointer">
              <i className="i-link  text-center h-12 opacity-40"></i>
            </div>
          </label>
        )}
      </div>
    </>
  );
};
