//Components
import { GroupLabel } from "@components/Badge";
import { Button } from "@components/Button";
import { Input, RadioBoxButton, TextArea } from "@components/Form";
import ImageUploader from "@components/Form/ImageUploader";
import { InputSelect } from "@components/Form/InputSelect";
import { Logo } from "@components/Logo";
import Modal from "@components/Modal/MainModal";
import Typography from "@components/Typography";
import useToggle from "@hooks/useToggle";
import Link from "next/link";
import { useState } from "react";
import AddNewAddressPage from "../AddNewAddressPage";

const CompleteProfilePage = () => {
  const [openModal, setOpenModal] = useToggle();
  const [org, setOrg] = useState("شرکت");

  const options = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target)
  };

  const onChangeHandler = (type) => {
    setOrg(type);
  };
  return (
    <div className="h-full flex flex-col justify-start items-start pt-6 w-full px-6 md:w-[22.5rem]">
      <Modal label="افزودن آدرس جدید" statusModal={openModal} closeModal={setOpenModal} size="h3">
        <AddNewAddressPage org={org} />
      </Modal>
      <div className="column w-full gap-8 md:w-[22.625rem] rounded md:max-w-[25rem] md:border md:px-8 pt-8">
        <Logo />
        <form onSubmit={onSubmit} className="column gap-4 w-full">
          <Typography bold size="h1" responsive>
            اطلاعات تکمیلی پروفایل
          </Typography>
          <GroupLabel icon={"fi fi-rr-shop text-bgBackDrop"} label={`اطلاعات ${org}`} theme={"themeS"} />
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
          <GroupLabel icon={"fi fi-rr-user text-bgBackDrop"} label={"اطلاعات شخصی"} />
          <Input name={"نام"}  width="w-full" placeholder="نام"  max={5} required/>
          <Input width="w-full" placeholder="نام خانوادگی" required/>
          <Input type="number" width="w-full" placeholder="کد ملی" />
          <GroupLabel icon={"fi fi-rr-venus-mars text-bgBackDrop"} label={"جنسیت"} />
          <div className="center justify-between gap-2 w-full">
            <RadioBoxButton width="w-full" id={3} name="gender" label={"زن"} defaultChecked />
            <RadioBoxButton width="w-full" id={4} name="gender" label={"مرد"} />
          </div>
          <GroupLabel icon={"fi fi-rr-user text-bgBackDrop"} label={"اطلاعات شخصی"} />
          <Input width="w-full" placeholder={`نام ${org}`} />
          <InputSelect outline width="w-full" options={options} />
          <InputSelect outline width="w-full" options={options} />
          <TextArea width="w-full" placeholder={`آدرس اصلی ${org}`} />
          <Input type="number" width="w-full" placeholder="کد پستی" />
          {org === "شرکت" ? <Input width="w-full" placeholder="کد اقتصادی (اختیاری)" /> : null}
          {org === "شرکت" ? <Input width="w-full" placeholder="شناسه ملی" /> : null}
          <Input type="tel" width="w-full" placeholder={`تلفن ${org}`} />
          <Button onClick={setOpenModal} type="button" width="w-full" varient="bgTransparent">
            افزودن آدرس جدید
          </Button>
          <GroupLabel icon={"fi fi-rr-upload text-bgBackDrop"} label={"آپلود مدارک"} />
          <div className="flex justify-between w-full">
            <ImageUploader width="w-[48%]" id={5} label="روزنامه رسمی" />
            <ImageUploader width="w-[48%]" id={6} label="فرم درخواست نمایندگی" />
          </div>
          <div className="flex justify-between w-full">
            <ImageUploader width="w-[48%]" id={7} label="عکس 3*4 از مدیر عامل" />
            <ImageUploader width="w-[48%]" id={8} label="آپلود مدارک بیشتر" />
          </div>
          <Button type="submit" width="w-full mb-4 mt-10">
            تایید
          </Button>
        </form>
      </div>
    </div>
  );
};
export default CompleteProfilePage;
