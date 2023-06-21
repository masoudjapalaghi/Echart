import useToggle from "@hooks/useToggle";
import { useState } from "react";
//Components
import { GroupLabel } from "@components/Badge";
import { Button } from "@components/Button";
import { Input, RadioBoxButton, TextArea } from "@components/Form";
import ImageUploader from "@components/Form/ImageUploader";
import { InputSelect } from "@components/Form/InputSelect";
import Modal from "@components/Modal/MainModal";
import { ProfilHeader } from "@modules/Headers/profileHeader";
import AddNewAddressPage from "./AddNewAddressPage";
const UserInformation = () => {
  const [openModal, setOpenModal] = useToggle();
  const [org, setOrg] = useState("شرکت");
  const options = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChangeHandler = (type) => {
    setOrg(type);
  };
  return (
    <div className="w-full center mt-5 md:mt-0">
      <Modal label="افزودن آدرس جدید" statusModal={openModal} closeModal={setOpenModal} size="h3">
        <AddNewAddressPage />
      </Modal>
      <div className="column gap-8 min-h-min rounded w-full md:max-w-[600px] md:p-8 ">
        <form onSubmit={onSubmit} className="column gap-4 w-full min-h-min ">
          <ProfilHeader title={"ویرایش حساب کاربری"} />
          <GroupLabel icon={"fi fi-rr-shop text-bgBackDrop"} label={"نوع مشتری"} theme={"themeS"} />
          <div className="center justify-between gap-2">
            <RadioBoxButton
              onChange={(e) => onChangeHandler("شرکت")}
              width="w-full"
              id={1}
              name="customer"
              label={"شرکتی"}
              defaultChecked
            />
            <RadioBoxButton
              onChange={(e) => onChangeHandler("فروشگاه")}
              width="w-full"
              id={2}
              name="customer"
              label={"فروشگاهی"}
            />
          </div>
          <GroupLabel icon={"fi fi-rr-user text-bgBackDrop"} label={"اطلاعات شخصی"} theme={"themeS"} />
          <div className="flex w-full gap-2 column">
            <div className="flex gap-2">
              <Input width="w-full" placeholder="نام" />
              <Input oninvalid={"errorHandler"} required width="w-full" placeholder="نام خانوادگی" />
            </div>
            <div className="w-full pl-2">
              <Input width="w-6/12" placeholder="کد ملی" />
            </div>
          </div>
          <GroupLabel icon={"fi fi-rr-venus-mars text-bgBackDrop"} label={"جنسیت"} theme={"themeS"} />
          <div className="center justify-between gap-2 w-full">
            <RadioBoxButton width="w-full" id={3} name="customer" label={"زن"} />
            <RadioBoxButton width="w-full" id={4} name="customer" label={"مرد"} />
          </div>
          <GroupLabel icon={"fi fi-rr-user text-bgBackDrop"} label={`اطلاعات ${org}`} theme={"themeS"} />
          <Input width="w-full" placeholder={`نام ${org}`} />
          <div className="flex gap-2">
            <InputSelect outline width="w-full" options={options} />
            <InputSelect outline width="w-full" options={options} />
          </div>
          <TextArea width="w-full" placeholder={`نام ${org}`} />
          <div className="flex gap-2">
            <Input width="w-full" placeholder="کد پستی" />
            <Input width="w-full" placeholder={`نام ${org}`} />
          </div>
          <Button onClick={setOpenModal} type="button" width="w-full" varient="bgTransparent">
            افزودن آدرس جدید
          </Button>
          <GroupLabel icon={"fi fi-rr-upload text-bgBackDrop"} label={"آپلود مدارک"} theme={"themeS"} />
          <div className="column gap-2 md:flex-row">
            <div className="column justify-between w-full gap-2 flex-row">
              <ImageUploader width="w-full md:w-5.5/12" id={5} label="روزنامه رسمی" />
              <ImageUploader width="w-full md:w-5.5/12" id={6} label="فرم درخواست نمایندگی" />
            </div>
            <div className="column justify-between w-full gap-2 flex-row">
              <ImageUploader width="w-full md:w-5.5/12" id={7} label="عکس 3*4 از مدیر عامل" />
              <ImageUploader width="w-full md:w-5.5/12" id={8} label="آپلود مدارک بیشتر" />
            </div>
          </div>
          <Button type="submit" width="w-full">
            تایید
          </Button>
        </form>
      </div>
    </div>
  );
};
export default UserInformation;
