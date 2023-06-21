export const SwitchButton = ({
  name="switchButton",
  priamryLabel = "درصدی",
  secondaryLabel = "ثابت",
  primaryId,
  secondaryId,
  primaryDefaultCheck = true,
  seccondaryDefaultCheck = false,
  ...rest
}) => {
  return (
    <div className={`flex p-0.5 bg-white rounded text-sm max-w-max h-10 `}>
      <label htmlFor={primaryId} className={`flex`}>
        <input
          type="radio"
          name={name}
          className={`peer hidden`}
          id={primaryId}
          {...rest}
          defaultChecked={primaryDefaultCheck}
        />
        <span className="flex justify-center items-center  text-slate-700  py-2.5 w-[101px]  rounded transition-all peer-checked:bg-active peer-checked:text-white">
          {priamryLabel}
        </span>
      </label>
      <label htmlFor={secondaryId} className={`flex`}>
        <input
          type="radio"
          name={name}
          className={`peer hidden`}
          id={secondaryId}
          {...rest}
          defaultChecked={seccondaryDefaultCheck}
        />
        <span className="flex justify-center items-center text-slate-700  py-2.5 w-[101px] rounded transition-all peer-checked:bg-active peer-checked:text-white">
          {secondaryLabel}
        </span>
      </label>
    </div>
  );
};
