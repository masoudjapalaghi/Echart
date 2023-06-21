import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
// Component
import { Button } from "@components/Button";
import { ImageUploader } from "@components/form";
import { BlurModalLoading } from "@components/Loading";
import { productGalleryProxy } from "@services/api/Product";
import { useFetching, useMutate } from "@services/axiosHelper";
import { Img } from "@components/Img";
import { UseImagePreview } from "@components/modals";
import * as styles from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFileId } from "@slices/GalleryImage";
import useToggle from "@hooks/useToggle";
import { toast } from "react-toastify";

const GalleryModalProperty = ({
  data,
  handleGetStatus,
  handleMutate,
  baseGoodId,
  goodId,
  setPreview,
  onClickClose = () => {},
}) => {
  const [content, setContent] = useState({
    previewLocal: null,
    select: null,
    fileIdLocal: null,
  });
  //redux
  const dispatch = useDispatch();
  const fileIdRedux = useSelector((state) => state.fileId.fileId);
  //apicall
  const { ProductGallery, isLoading, refetch } = useFetching(["ProductGallery"], () =>
    productGalleryProxy.get(baseGoodId)
  );
  const entity = ProductGallery.entity ? ProductGallery.entity : {};
  let filesLength = entity.images?.length;

  const onSubmitDataHandler = (e) => {
    e.preventDefault();
  };

  const handleSelected = (index, fileId, item) => {
    setContent({
      previewLocal: item.imageUrl,
      select: index,
      fileIdLocal: fileId,
    });
  };

  const handleClick = () => {
    if (content.previewLocal !== null) {
      dispatch(setFileId([...fileIdRedux, { fileId: content.fileIdLocal, goodId }]));
      setPreview(content.previewLocal);
      onClickClose();
      const body = {
        id: goodId,
        fileId: content.fileIdLocal,
      };
      handleMutate(body);
    } else {
      toast.warn("عکسی وجود ندارد", {
        toastId: "noImage",
      });
    }
  };

  return (
    <>
      {isLoading ? <BlurModalLoading /> : null}
      <form onSubmit={onSubmitDataHandler} className="flex flex-col justify-end gap-2 min-h-[400px]">
        {/* <ImageUploader multiple handleDataTransfer={handleDataTransfer} defaultImage={entity.id} uplodedLength={uplodedLength} counterDelete={counterDelete} /> */}
        {filesLength ? (
          <fieldset className="w-full border-2 relative border-green-100 shadow-2xl  pr-8 py-8 flex flex-wrap gap-8">
            <legend className="backdrop-blur-md px-2 ">عکس های آپلود شده</legend>
            {entity.images.map((item, index) => (
              <div
                key={item.fileId}
                className={`${
                  content.select == index ? styles.selectedImage : null
                } rounded relative p-2 w-40 h-40 flex items-center justify-center`}
                onClick={() => handleSelected(index, item.fileId, item)}
              >
                <Img
                  src={item.imageUrl ? item.imageUrl : ""}
                  cursor={"cursor-pointer"}
                  layout="fill"
                  pw="w-32"
                  ph="h-36"
                  alt="product"
                />
              </div>
            ))}
          </fieldset>
        ) : null}
        <Button onClick={handleClick} self="self-end">
          ثبت
        </Button>
      </form>
    </>
  );
};

export default GalleryModalProperty;

const DTO = {
  fileId: "fileId",
  imageUrl: "imageUrl",
};
