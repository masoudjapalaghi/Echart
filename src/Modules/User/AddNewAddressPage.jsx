
// component
import { Button } from "@components/Button";
import { Input, TextArea } from "@components/Form";
import { InputSelect } from "@components/Form/InputSelect";

const AddNewAddressPage = ({org}) => {
  return (
    <form className="column center gap-4 w-full">
      <Input width="w-full" placeholder={`نام ${org}`}/>
      <InputSelect width="w-full" outline placeholder="استان" />
      <InputSelect width="w-full" outline placeholder="شهر" />
      <TextArea width="w-full" placeholder={`آدرس اصلی ${org}`} />
      <Input type="number" width="w-full" placeholder="کد پستی" />
      <Input type="number" width="w-full" placeholder="تلفن" />
      <Button width="w-full">ثبت</Button>
    </form>
  );
};

export default AddNewAddressPage;
