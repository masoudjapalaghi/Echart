import { Button } from "@components/Button";
import React, { useRef } from "react";
import { useState } from "react";

export const Inputuploaderfile = () => {
  const inputRef = useRef();
  const [file, setFile] = useState(false);
  const [isFilePcked, setIsFilePcked] = useState(false)

  const handleClick = () => {
    inputRef.current.click();
  };

  const handlefileupload = (e) => {
    setFile(e.target.files[0]);
    setIsFilePcked(true);
  };

  return (
    <>
      <input
        className="hidden"
        type="file"
        ref={inputRef}
        onChange={handlefileupload}
      />
      <Button type="submit" onClick={handleClick} self varient="outline">
        افزودن فایل
      </Button>
    </>
  );
};
