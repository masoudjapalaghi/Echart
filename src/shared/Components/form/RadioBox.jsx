export const RadioBox = ({ title, parentClassName="", ...rest }) => {
  return (
    <div className={`flex items-center gap-2 ${parentClassName}`}>
      <input
        type="radio"
        className="relative appearance-none bg-transparent border border-gray-500  rounded-full h-4 w-4 min-w-[16px]  checked:border  bg-white checked:bg-transparent checked:border-primary  focus:outline-none transition duration-200  align-top bg-no-repeat bg-center bg-contain float-left  cursor-pointer checked:after:content-[''] checked:after:absolute checked:after:inset-0 checked:after:m-auto checked:after:w-2 checked:after:h-2 checked:after:rounded-full  checked:after:bg-primary "
        {...rest}
      />

      <label className="ml-2 text-xs font-medium  whitespace-nowrap  text-color">
        {title}
      </label>
    </div>
  );
};
