import { useState } from "react";
import Image from "next/image";
// Module
import { Modal } from "../components/modals";
import { Img } from "@components/Img";

export const UseImagePreview = () => {
  const [openImageModal, setOpenImageModal] = useState(false);
  const [treeReset, setTreeReset] = useState(false)
  const [url, setUrl] = useState(null);
  const jsxModal = openImageModal ? (
    <Modal width="w-[30%]" toggleState={() => setOpenImageModal(false)} onClickClose={() => setOpenImageModal(false)}>
      <Img layout="fill" objectFit="contain" pw="w-full" ph="h-80" src={url ? url : ""} alt="preview" />
    </Modal>
  ) : null;
  return [jsxModal, setOpenImageModal, setUrl];
};
