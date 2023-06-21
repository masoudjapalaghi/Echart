import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
// Utils
import { reduceFileSize } from "src/utils";
import useToggle from "@hooks/useToggle";
import { Modal, UseImagePreview } from "@components/modals";
import { Img } from "@components/Img";
import GalleryModalProperty from "./GalleryModalProperty";
import { useDispatch, useSelector } from "react-redux";
import { setFileId } from "@slices/GalleryImage";
import { useMutate } from "@services/axiosHelper";
import { goodProxy } from "@services/api/Product";
import { useMemo } from "react";

export const ImageUploaderProperty = ({
  handleDataTransfer = () => {},
  initalizeValue,
  update,
  uplodedLength = 0,
  counterDelete = 0,
  self = "self-start",
  title = "افزودن تصویر",
  defaultImage = [],
  data,
  setOtherStatus,
  ...res
}) => {
  const [preview, setPreview] = useState([]);
  const [jsxModal, setOpenImageModal, setUrl] = UseImagePreview();
  const [state, toggle] = useToggle();

  const addImageGood = useMutate("addImageGood", goodProxy.addImageGood);

  const StatusAddImageGood = addImageGood.res.status;

  useMemo(() => {
    if (StatusAddImageGood) {
      setOtherStatus(true);
      // handleToggleSubModal();
    }
  }, [StatusAddImageGood]);

  const { imageURL, baseGoodId, id, code } = data;

  const ImagePrev = (url) => {
    setOpenImageModal(true);
    setUrl(url);
  };

  const handleOpenModal = () => {
    toggle();
    setPreview([]);
  };

  const handleDelete = () => {
    const body = {
      id: id,
      fileId: null,
    };
    addImageGood.mutate(body);
  };

  return (
    <>
      <Modal width="w-[60%]" height="h-[50%]" toggleState={state} onClickClose={toggle}>
        <GalleryModalProperty
          handleMutate={addImageGood.mutate}
          goodId={id}
          onClickClose={toggle}
          setPreview={setPreview}
          baseGoodId={baseGoodId}
        />
      </Modal>
      {jsxModal}
      <div className={` rounded flex flex-col justify-center items-center w-20 h-20 bg-white`}>
        {imageURL ? (
          <div className="flex flex-row relative w-14 h-14 ">
            <i onClick={handleDelete} className="fi fi-rr-trash cursor-pointer absolute -top-2 -right-[12px] z-10"></i>
            <Image
              className={`${defaultImage ? (defaultImage[0] ? "cursor-zoom-in" : "cursor-pointer") : ""}`}
              layout="fill"
              objectFit="contain"
              onClick={() => ImagePrev(preview)}
              src={imageURL}
              alt="upload"
            />
          </div>
        ) : (
          <label className="w-full h-full flex flex-col justify-center" onClick={handleOpenModal}>
            <div className="flex flex-col justify-center items-center cursor-pointer">
              <i className="i-link  text-center h-12 opacity-40"></i>
            </div>
          </label>
        )}
      </div>
    </>
  );
};
