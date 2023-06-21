import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
// Utils
import { reduceFileSize } from "src/utils";
import useToggle from "@hooks/useToggle";
import { UseImagePreview } from "@components/modals";
import { Img } from "@components/Img";

export const ImageUploader = ({
  handleDataTransfer = () => {},
  multiple,
  initalizeValue,
  isFetched,
  update,
  statusFetch,
  initializeDependence,
  uplodedLength = 0,
  counterDelete = 0,
  self = "self-start",
  title = "افزودن تصویر",
  withoutlable = false,
  defaultImage = [],
  StatusAdd,
  haveImagePreview = true,
  ...res
}) => {
  const [preview, setPreview] = useState([]);
  const [updateStatus, setUpdateStatus, updateStatusFalse, updateStatusTrue] = useToggle();
  const [first, setfirst] = useState();
  const [jsxModal, setOpenImageModal, setUrl] = UseImagePreview();
  const ImagePrev = (url) => {
    setOpenImageModal(true);
    setUrl(url);
  };
  useEffect(() => {
    setfirst(defaultImage[0]);
  }, [defaultImage]);

  useMemo(() => {
    if (StatusAdd) {
      setPreview([]);
    }
  }, [StatusAdd]);

  const saveFileHandler = (event) => {
    const files = event?.target.files;
    let filesLength = files.length;
    let previewLength = preview.length;
    let sumLength = filesLength + previewLength + uplodedLength - counterDelete;
    // if (sumLength > 6) {
    //   toast.warning("  محدودیت تعداد عکس !تعداد 6 عکس قابل انتخاب است");
    //   return null;
    // }

    var list = new DataTransfer();
  
      for (let i = 0; i < files.length; i++) list.items.add(files[i]);

    let listToArray = Array.from(list.files);
    listToArray.forEach((file) => {
      reduceFileSize(file, 1000, 1200, 1200, 1, (blob) => {
        setPreview((prev) => [...prev, blob]);
      });
    });
  };
  useEffect(() => {
    if (defaultImage.length > 0) {
      updateStatusTrue();
    }
  }, [initializeDependence]);

  useEffect(() => {
    handleDataTransfer(preview);
  }, [preview]);
  const handleDelete = (itemIndex) => {
    updateStatusFalse();
    if (multiple) {
      let filter = preview.filter((item, index) => index !== itemIndex);
      setPreview(filter);
    } else {
      setPreview([]);
    }
  };

  const onClick = (e) => {
    e.target.value = "";
  };
  return (
    <>
      {haveImagePreview ? jsxModal : null}
      <input
        className="hidden"
        id="imageUploader"
        onClick={onClick}
        onChange={saveFileHandler}
        {...res}
        multiple={multiple}
        type="file"
        accept="image/*"
      />
      {multiple ? (
        <div className="flex flex-col justify-start  gap-8">
          <label className="flex flex-col" htmlFor="imageUploader">
            <span className="bg-primary w-full lg:w-52 text-sm py-2.5 text-white rounded text-center">
              انتخاب تصاویر
            </span>
          </label>
          <div className="w-full flex flex-wrap gap-8 pr-5 ">
            {preview.map((item, index) => (
              <div key={index} className="flex flex-row relative">
                <i
                  onClick={() => handleDelete(index)}
                  className="fi fi-rr-trash cursor-pointer absolute top-[-10px] z-[1] right-[-25px]"
                ></i>
                <Img
                  layout="fill"
                  objectFit="contain"
                  pw="w-40"
                  ph="h-40"
                  onClick={() => ImagePrev(URL.createObjectURL(item))}
                  src={URL.createObjectURL(item)}
                  alt="upload"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {!withoutlable&&<p className="font-[IranYekan] text-xs text-[#404040]">تصویر اصلی :</p>}
          <div className={`border rounded h-52 mt-2  flex flex-col justify-center items-center w-60 ${self} bg-white`}>
            {updateStatus || preview.length > 0 ? (
              <>
                <div className="flex flex-row relative  ">
                  <i
                    onClick={handleDelete}
                    className="fi fi-rr-trash cursor-pointer absolute top-[-10px] z-[1] right-[-25px]"
                  ></i>
                  <Img
                    className={`${defaultImage[0] && haveImagePreview ? "cursor-zoom-in" : "cursor-pointer"}`}
                    layout="fill"
                    objectFit="contain"
                    ph="h-40"
                    pw="w-40"
                    onClick={() =>
                      ImagePrev(
                        updateStatus ? (defaultImage[0] ? defaultImage[0] : "") : URL.createObjectURL(preview[0])
                      )
                    }
                    src={updateStatus ? (defaultImage[0] ? defaultImage[0] : "") : URL.createObjectURL(preview[0])}
                    alt="upload"
                  />
                </div>
              </>
            ) : (
              <label
                className="w-full h-full flex flex-col justify-center"
                htmlFor="imageUploader"
                onClick={handleDelete}
              >
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <i className="fi fi-rr-plus w-20 text-center h-12 opacity-40"></i>
                  <p className=" text-md text-[#404040] opacity-40">{title}</p>
                </div>
              </label>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ImageUploader;
